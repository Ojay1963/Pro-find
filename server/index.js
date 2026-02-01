import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

const app = express()
const port = process.env.PORT || 3001
const jwtSecret = process.env.JWT_SECRET || 'change-me'
const adminPromoteToken = process.env.ADMIN_PROMOTE_TOKEN || ''
const systemPrompt =
  'You are Profind AI, a concise real-estate assistant. Ask for city, budget, beds/baths, timeline, and goals. Keep replies under 80 words.'
const MAX_HISTORY = 12
const aiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const geminiKey = (process.env.GEMINI_API_KEY || '').trim()
const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'dist')
const hasDist = fs.existsSync(distPath)
const isProd = process.env.NODE_ENV === 'production'
const corsOrigin = process.env.CORS_ORIGIN

app.use(express.json({ limit: '1mb' }))
if (corsOrigin) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOrigin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
  })
}

const idSchema = z.number().int().positive()

const createNumericId = () => Date.now() + Math.floor(Math.random() * 1000)

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) return
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI')
  await mongoose.connect(uri)
}

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: 'seeker' },
    licenseNumber: { type: String },
    companyName: { type: String },
    verified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const listingSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    ownerId: { type: Number, index: true },
    status: { type: String, default: 'pending' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
)

const inquirySchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    propertyId: Number,
    propertyTitle: String,
    agentId: Number,
    agentName: String,
    name: String,
    email: String,
    phone: String,
    preferredDate: String,
    preferredTime: String,
    message: String,
    preferredContact: String,
    type: { type: String, default: 'contact' },
    status: { type: String, default: 'new' },
    userId: Number
  },
  { timestamps: true }
)

const conversationSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    participantIds: [Number],
    propertyId: Number
  },
  { timestamps: true }
)

const messageSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    conversationId: { type: Number, index: true },
    senderId: Number,
    text: String,
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: Number, index: true },
    propertyId: Number
  },
  { timestamps: true }
)
favoriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true })

const recentlyViewedSchema = new mongoose.Schema(
  {
    userId: { type: Number, index: true },
    propertyId: Number
  },
  { timestamps: true }
)
recentlyViewedSchema.index({ userId: 1, propertyId: 1 }, { unique: true })

const savedSearchSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    criteria: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
)

const preferencesSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true, index: true },
    notifications: { type: Boolean, default: true },
    emailAlerts: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const analyticsSchema = new mongoose.Schema(
  {
    listingId: { type: Number, unique: true, index: true },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    lastViewed: { type: String }
  },
  { timestamps: true }
)

const priceAlertSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    propertyId: Number,
    targetPrice: Number,
    alertType: String,
    email: String,
    currentPrice: Number,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const verificationSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    credentials: mongoose.Schema.Types.Mixed,
    status: { type: String, default: 'pending' },
    reviewedAt: { type: String }
  },
  { timestamps: true }
)

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    agentId: { type: Number, index: true },
    userId: Number,
    rating: Number,
    comment: String,
    propertyId: Number
  },
  { timestamps: true }
)

const virtualTourSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    propertyId: Number,
    tourUrl: String,
    type: { type: String, default: 'virtual_tour' }
  },
  { timestamps: true }
)

const comparisonSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    propertyIds: [Number]
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
const Listing = mongoose.model('Listing', listingSchema)
const Inquiry = mongoose.model('Inquiry', inquirySchema)
const Conversation = mongoose.model('Conversation', conversationSchema)
const Message = mongoose.model('Message', messageSchema)
const Favorite = mongoose.model('Favorite', favoriteSchema)
const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema)
const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema)
const Preferences = mongoose.model('Preferences', preferencesSchema)
const Analytics = mongoose.model('ListingAnalytics', analyticsSchema)
const PriceAlert = mongoose.model('PriceAlert', priceAlertSchema)
const Verification = mongoose.model('AgentVerification', verificationSchema)
const Review = mongoose.model('AgentReview', reviewSchema)
const VirtualTour = mongoose.model('VirtualTour', virtualTourSchema)
const Comparison = mongoose.model('Comparison', comparisonSchema)

const toUserResponse = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  verified: user.verified,
  emailVerified: user.emailVerified,
  averageRating: user.averageRating,
  totalReviews: user.totalReviews,
  licenseNumber: user.licenseNumber,
  companyName: user.companyName
})

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, jwtSecret)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' }
})

const authRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.string().optional(),
  licenseNumber: z.string().optional(),
  companyName: z.string().optional()
})

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const inquirySchemaInput = z.object({
  propertyId: idSchema.optional(),
  propertyTitle: z.string().optional(),
  agentId: z.number().optional(),
  agentName: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().min(6).optional()
  ),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  preferredContact: z.string().optional(),
  type: z.string().optional()
})

const listingInputSchema = z.record(z.any())

const conversationInputSchema = z.object({
  participantId: z.number(),
  propertyId: z.number().optional()
})

const messageInputSchema = z.object({
  text: z.string().min(1)
})

const reviewInputSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(2),
  propertyId: z.number().optional()
})

const priceAlertInputSchema = z.object({
  propertyId: idSchema,
  targetPrice: z.number().positive(),
  alertType: z.string().optional(),
  email: z.string().email().optional(),
  currentPrice: z.number().optional()
})

const verificationInputSchema = z.object({
  credentials: z.record(z.any())
})

const savedSearchInputSchema = z.record(z.any())

const preferencesInputSchema = z.object({
  notifications: z.boolean().optional(),
  emailAlerts: z.boolean().optional()
})

const virtualTourInputSchema = z.object({
  propertyId: idSchema,
  tourUrl: z.string().url(),
  type: z.string().optional()
})

const comparisonInputSchema = z.object({
  propertyIds: z.array(idSchema).min(1)
})

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6)
})

const adminUserUpdateSchema = z.object({
  role: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  emailVerified: z.boolean().optional(),
  verified: z.boolean().optional(),
  licenseNumber: z.string().optional(),
  companyName: z.string().optional()
})

const adminPasswordSchema = z.object({
  newPassword: z.string().min(6)
})

app.use(async (req, res, next) => {
  try {
    await connectDb()
    next()
  } catch (error) {
    console.error('Mongo connection failed', error)
    res.status(500).json({ error: 'Database connection failed' })
  }
})

app.post('/api/auth/register', async (req, res) => {
  const parse = authRegisterSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const { name, email, password, phone, role, licenseNumber, companyName } = parse.data
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ error: 'Email already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    id: createNumericId(),
    name,
    email,
    passwordHash,
    phone,
    role: role || 'seeker',
    licenseNumber,
    companyName
  })
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, jwtSecret, {
    expiresIn: '7d'
  })
  res.json({ token, user: toUserResponse(user) })
})

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const parse = authLoginSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const { email, password } = parse.data
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, jwtSecret, {
    expiresIn: '7d'
  })
  res.json({ token, user: toUserResponse(user) })
})

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await User.findOne({ id: req.user.id })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user: toUserResponse(user) })
})

app.post('/api/auth/reset-password', async (req, res) => {
  const parse = resetPasswordSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const { email, newPassword } = parse.data
  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ error: 'User not found' })
  user.passwordHash = await bcrypt.hash(newPassword, 10)
  await user.save()
  res.json({ ok: true })
})

// One-time admin promotion (remove after use)
app.post('/api/admin/promote', async (req, res) => {
  const token = req.headers['x-admin-token']
  if (!adminPromoteToken || token !== adminPromoteToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const email = String(req.body?.email || '').trim()
  if (!email) return res.status(400).json({ error: 'Email required' })
  const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const user = await User.findOne({ email: new RegExp(`^${escaped}$`, 'i') })
  if (!user) return res.status(404).json({ error: 'User not found' })
  user.role = 'admin'
  await user.save()
  res.json({ ok: true })
})

app.get('/api/admin/users', requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json({ users: users.map(toUserResponse) })
})

app.patch('/api/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const userId = Number(req.params.id)
  if (!Number.isFinite(userId)) return res.status(400).json({ error: 'Invalid user id' })
  const parse = adminUserUpdateSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const user = await User.findOne({ id: userId })
  if (!user) return res.status(404).json({ error: 'User not found' })
  Object.assign(user, parse.data)
  await user.save()
  res.json({ user: toUserResponse(user) })
})

app.delete('/api/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const userId = Number(req.params.id)
  if (!Number.isFinite(userId)) return res.status(400).json({ error: 'Invalid user id' })
  await User.deleteOne({ id: userId })
  res.json({ ok: true })
})

app.post('/api/admin/users/:id/reset-password', requireAuth, requireAdmin, async (req, res) => {
  const userId = Number(req.params.id)
  if (!Number.isFinite(userId)) return res.status(400).json({ error: 'Invalid user id' })
  const parse = adminPasswordSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const user = await User.findOne({ id: userId })
  if (!user) return res.status(404).json({ error: 'User not found' })
  user.passwordHash = await bcrypt.hash(parse.data.newPassword, 10)
  await user.save()
  res.json({ ok: true })
})

app.get('/api/admin/conversations', requireAuth, requireAdmin, async (req, res) => {
  const conversations = await Conversation.find().sort({ updatedAt: -1 })
  res.json({ conversations })
})

app.get('/api/admin/conversations/:id/messages', requireAuth, requireAdmin, async (req, res) => {
  const conversationId = Number(req.params.id)
  if (!Number.isFinite(conversationId)) return res.status(400).json({ error: 'Invalid conversation id' })
  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 })
  res.json({ messages })
})

app.get('/api/users', requireAuth, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json({ users: users.map(toUserResponse) })
})

app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find().sort({ createdAt: -1 })
  const mapped = listings.map((listing) => ({
    id: listing.id,
    ownerId: listing.ownerId,
    status: listing.status,
    createdAt: listing.createdAt?.toISOString?.() || listing.createdAt,
    updatedAt: listing.updatedAt?.toISOString?.() || listing.updatedAt,
    ...(listing.data || {})
  }))
  res.json({ listings: mapped })
})

app.post('/api/listings', requireAuth, async (req, res) => {
  const parse = listingInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid listing data' })
  const listing = await Listing.create({
    id: createNumericId(),
    ownerId: req.user.id,
    status: 'pending',
    data: parse.data
  })
  res.json({ listing: { id: listing.id, ownerId: listing.ownerId, status: listing.status, ...listing.data } })
})

app.put('/api/listings/:id', requireAuth, async (req, res) => {
  const listingId = Number(req.params.id)
  if (!Number.isFinite(listingId)) return res.status(400).json({ error: 'Invalid listing id' })
  const listing = await Listing.findOne({ id: listingId })
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  if (req.user.role !== 'admin' && listing.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const parse = listingInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid listing data' })
  const { status, ...rest } = parse.data
  if (status) listing.status = status
  listing.data = { ...(listing.data || {}), ...rest }
  await listing.save()
  res.json({ listing: { id: listing.id, ownerId: listing.ownerId, status: listing.status, ...listing.data } })
})

app.delete('/api/listings/:id', requireAuth, async (req, res) => {
  const listingId = Number(req.params.id)
  if (!Number.isFinite(listingId)) return res.status(400).json({ error: 'Invalid listing id' })
  const listing = await Listing.findOne({ id: listingId })
  if (!listing) return res.status(404).json({ error: 'Listing not found' })
  if (req.user.role !== 'admin' && listing.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  await listing.deleteOne()
  res.json({ ok: true })
})

app.get('/api/listings/:id/analytics', async (req, res) => {
  const listingId = Number(req.params.id)
  const analytics = await Analytics.findOne({ listingId })
  res.json({ analytics: analytics || { listingId, views: 0, inquiries: 0, favorites: 0 } })
})

app.post('/api/listings/:id/track', async (req, res) => {
  const listingId = Number(req.params.id)
  const type = req.body?.type
  const update = { $setOnInsert: { listingId } }
  if (type === 'view') {
    update.$inc = { ...(update.$inc || {}), views: 1 }
    update.$set = { ...(update.$set || {}), lastViewed: new Date().toISOString() }
  }
  if (type === 'inquiry') {
    update.$inc = { ...(update.$inc || {}), inquiries: 1 }
  }
  if (type === 'favorite') {
    update.$inc = { ...(update.$inc || {}), favorites: 1 }
  }
  const analytics = await Analytics.findOneAndUpdate({ listingId }, update, { upsert: true, new: true })
  res.json({ analytics })
})

app.get('/api/inquiries', requireAuth, async (req, res) => {
  const filter = req.user.role === 'admin'
    ? {}
    : { $or: [{ userId: req.user.id }, { agentId: req.user.id }] }
  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 })
  res.json({ inquiries })
})

app.post('/api/inquiries', async (req, res) => {
  const parse = inquirySchemaInput.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const user = req.headers.authorization ? (() => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      return jwt.verify(token, jwtSecret)
    } catch {
      return null
    }
  })() : null
  const inquiry = await Inquiry.create({
    id: createNumericId(),
    ...parse.data,
    userId: user?.id
  })
  res.json({ inquiry })
})

app.patch('/api/inquiries/:id/status', requireAuth, async (req, res) => {
  const inquiryId = Number(req.params.id)
  const status = req.body?.status
  const inquiry = await Inquiry.findOne({ id: inquiryId })
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' })
  if (req.user.role !== 'admin' && inquiry.agentId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  inquiry.status = status
  await inquiry.save()
  res.json({ inquiry })
})

app.get('/api/favorites', requireAuth, async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user.id })
  res.json({ favorites: favorites.map((fav) => fav.propertyId) })
})

app.post('/api/favorites', requireAuth, async (req, res) => {
  const propertyId = Number(req.body?.propertyId)
  if (!Number.isFinite(propertyId)) return res.status(400).json({ error: 'Invalid property id' })
  await Favorite.updateOne({ userId: req.user.id, propertyId }, { $setOnInsert: { userId: req.user.id, propertyId } }, { upsert: true })
  res.json({ ok: true })
})

app.delete('/api/favorites/:propertyId', requireAuth, async (req, res) => {
  const propertyId = Number(req.params.propertyId)
  await Favorite.deleteOne({ userId: req.user.id, propertyId })
  res.json({ ok: true })
})

app.get('/api/recently-viewed', requireAuth, async (req, res) => {
  const items = await RecentlyViewed.find({ userId: req.user.id }).sort({ updatedAt: -1 }).limit(20)
  res.json({ recentlyViewed: items.map((item) => item.propertyId) })
})

app.post('/api/recently-viewed', requireAuth, async (req, res) => {
  const propertyId = Number(req.body?.propertyId)
  if (!Number.isFinite(propertyId)) return res.status(400).json({ error: 'Invalid property id' })
  await RecentlyViewed.updateOne(
    { userId: req.user.id, propertyId },
    { $set: { userId: req.user.id, propertyId } },
    { upsert: true }
  )
  res.json({ ok: true })
})

app.get('/api/saved-searches', requireAuth, async (req, res) => {
  const searches = await SavedSearch.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.json({ searches })
})

app.post('/api/saved-searches', requireAuth, async (req, res) => {
  const parse = savedSearchInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid search data' })
  const search = await SavedSearch.create({ id: createNumericId(), userId: req.user.id, criteria: parse.data })
  res.json({ search })
})

app.delete('/api/saved-searches/:id', requireAuth, async (req, res) => {
  const searchId = Number(req.params.id)
  await SavedSearch.deleteOne({ id: searchId, userId: req.user.id })
  res.json({ ok: true })
})

app.get('/api/preferences', requireAuth, async (req, res) => {
  const preferences = await Preferences.findOne({ userId: req.user.id })
  res.json({ preferences: preferences || { notifications: true, emailAlerts: true } })
})

app.put('/api/preferences', requireAuth, async (req, res) => {
  const parse = preferencesInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid preferences data' })
  const prefs = await Preferences.findOneAndUpdate(
    { userId: req.user.id },
    { $set: { userId: req.user.id, ...parse.data } },
    { upsert: true, new: true }
  )
  res.json({ preferences: prefs })
})

app.get('/api/price-alerts', requireAuth, async (req, res) => {
  const alerts = await PriceAlert.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.json({ alerts })
})

app.post('/api/price-alerts', requireAuth, async (req, res) => {
  const parse = priceAlertInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid alert data' })
  const alert = await PriceAlert.create({ id: createNumericId(), userId: req.user.id, ...parse.data })
  res.json({ alert })
})

app.delete('/api/price-alerts/:id', requireAuth, async (req, res) => {
  const alertId = Number(req.params.id)
  await PriceAlert.deleteOne({ id: alertId, userId: req.user.id })
  res.json({ ok: true })
})

app.get('/api/agent-verifications', requireAuth, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { userId: req.user.id }
  const verifications = await Verification.find(filter).sort({ createdAt: -1 })
  res.json({ verifications })
})

app.post('/api/agent-verifications', requireAuth, async (req, res) => {
  const parse = verificationInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid verification data' })
  const verification = await Verification.create({
    id: createNumericId(),
    userId: req.user.id,
    credentials: parse.data.credentials
  })
  res.json({ verification })
})

app.patch('/api/agent-verifications/:id', requireAuth, requireAdmin, async (req, res) => {
  const verificationId = Number(req.params.id)
  const approved = req.body?.approved
  const verification = await Verification.findOne({ id: verificationId })
  if (!verification) return res.status(404).json({ error: 'Verification not found' })
  verification.status = approved ? 'approved' : 'rejected'
  verification.reviewedAt = new Date().toISOString()
  await verification.save()
  if (approved) {
    await User.updateOne({ id: verification.userId }, { $set: { verified: true, verifiedAt: new Date().toISOString() } })
  }
  res.json({ verification })
})

app.get('/api/conversations', requireAuth, async (req, res) => {
  const conversations = await Conversation.find({ participantIds: req.user.id }).sort({ updatedAt: -1 })
  res.json({ conversations })
})

app.post('/api/conversations', requireAuth, async (req, res) => {
  const parse = conversationInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid conversation data' })
  const { participantId, propertyId } = parse.data
  const existing = await Conversation.findOne({
    participantIds: { $all: [req.user.id, participantId] },
    ...(propertyId ? { propertyId } : {})
  })
  if (existing) return res.json({ conversation: existing })
  const conversation = await Conversation.create({
    id: createNumericId(),
    participantIds: [req.user.id, participantId],
    propertyId
  })
  res.json({ conversation })
})

app.get('/api/conversations/:id/messages', requireAuth, async (req, res) => {
  const conversationId = Number(req.params.id)
  const conversation = await Conversation.findOne({ id: conversationId })
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' })
  if (!conversation.participantIds.includes(req.user.id)) return res.status(403).json({ error: 'Forbidden' })
  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 })
  res.json({ messages })
})

app.post('/api/conversations/:id/messages', requireAuth, async (req, res) => {
  const conversationId = Number(req.params.id)
  const conversation = await Conversation.findOne({ id: conversationId })
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' })
  if (!conversation.participantIds.includes(req.user.id)) return res.status(403).json({ error: 'Forbidden' })
  const parse = messageInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid message data' })
  const message = await Message.create({
    id: createNumericId(),
    conversationId,
    senderId: req.user.id,
    text: parse.data.text,
    read: false
  })
  conversation.updatedAt = new Date()
  await conversation.save()
  res.json({ message })
})

app.get('/api/agents/:id/reviews', async (req, res) => {
  const agentId = Number(req.params.id)
  const reviews = await Review.find({ agentId }).sort({ createdAt: -1 })
  res.json({ reviews })
})

app.post('/api/agents/:id/reviews', requireAuth, async (req, res) => {
  const agentId = Number(req.params.id)
  const parse = reviewInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid review data' })
  const review = await Review.create({
    id: createNumericId(),
    agentId,
    userId: req.user.id,
    rating: parse.data.rating,
    comment: parse.data.comment,
    propertyId: parse.data.propertyId
  })
  const reviews = await Review.find({ agentId })
  const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
  await User.updateOne({ id: agentId }, { $set: { averageRating: avgRating, totalReviews: reviews.length } })
  res.json({ review })
})

app.get('/api/virtual-tours/:propertyId', async (req, res) => {
  const propertyId = Number(req.params.propertyId)
  const tours = await VirtualTour.find({ propertyId }).sort({ createdAt: -1 })
  res.json({ tours })
})

app.post('/api/virtual-tours', requireAuth, async (req, res) => {
  const parse = virtualTourInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid tour data' })
  const tour = await VirtualTour.create({ id: createNumericId(), ...parse.data })
  res.json({ tour })
})

app.get('/api/comparisons', requireAuth, async (req, res) => {
  const comparisons = await Comparison.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.json({ comparisons })
})

app.post('/api/comparisons', requireAuth, async (req, res) => {
  const parse = comparisonInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid comparison data' })
  const comparison = await Comparison.create({
    id: createNumericId(),
    userId: req.user.id,
    propertyIds: parse.data.propertyIds
  })
  res.json({ comparison })
})

app.delete('/api/comparisons/:id', requireAuth, async (req, res) => {
  const comparisonId = Number(req.params.id)
  await Comparison.deleteOne({ id: comparisonId, userId: req.user.id })
  res.json({ ok: true })
})

const normalizeContent = (role, content) => {
  if (Array.isArray(content)) return content
  const text = String(content ?? '')
  const type = role === 'assistant' ? 'output_text' : 'input_text'
  return [
    {
      type,
      text
    }
  ]
}

const extractOutputText = (data) => {
  const output = Array.isArray(data?.output) ? data.output : []
  const chunks = []

  output.forEach((item) => {
    if (item.type !== 'message' || !Array.isArray(item.content)) return
    item.content.forEach((part) => {
      if (part.type === 'output_text' && part.text) {
        chunks.push(part.text)
      }
    })
  })

  return chunks.join('\n').trim()
}

const normalizeMessageText = (content) => {
  if (Array.isArray(content)) {
    return content
      .map((item) => item?.text || '')
      .join('\n')
      .trim()
  }
  return String(content ?? '').trim()
}

const callGemini = async (messages) => {
  if (!geminiKey) {
    throw new Error('GEMINI_API_KEY missing')
  }

  const contents = messages.map((message) => {
    const role = message.role === 'assistant' ? 'model' : 'user'
    const text = normalizeMessageText(message.content)
    return { role, parts: [{ text }] }
  })

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiKey
      },
      body: JSON.stringify({
        contents
      })
    }
  )

  const raw = await response.text()
  const data = raw ? JSON.parse(raw) : {}
  if (!response.ok) {
    console.error('Gemini generateContent error', response.status, data)
    throw new Error(data?.error?.message || 'Gemini request failed')
  }

  const parts = data?.candidates?.[0]?.content?.parts || []
  const text = parts.map((part) => part.text).join('\n').trim()
  return text || 'I am here to help. What details can you share?'
}

app.post('/api/chat', async (req, res) => {
  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
  if (incoming.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  const recent = incoming.slice(-MAX_HISTORY)
  try {
    const apiKey = (process.env.OPENAI_API_KEY || '').trim()
    if (apiKey) {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: aiModel,
          input: [
            { role: 'system', content: systemPrompt },
            ...recent.map((message) => ({
              role: message.role,
              content: normalizeContent(message.role, message.content)
            }))
          ],
          max_output_tokens: 200
        })
      })

      const raw = await response.text()
      const data = raw ? JSON.parse(raw) : {}
      if (!response.ok) {
        const errorMessage = data?.error?.message || 'OpenAI request failed'
        console.error('OpenAI /responses error', response.status, data)
        if (geminiKey) {
          const geminiReply = await callGemini([
            { role: 'system', content: systemPrompt },
            ...recent
          ])
          return res.json({ reply: geminiReply, fallback: 'gemini' })
        }
        return res.status(502).json({ error: errorMessage, detail: data })
      }

      const reply = extractOutputText(data) || 'I am here to help. What details can you share?'
      return res.json({ reply })
    }

    if (geminiKey) {
      const geminiReply = await callGemini([
        { role: 'system', content: systemPrompt },
        ...recent
      ])
      return res.json({ reply: geminiReply, fallback: 'gemini' })
    }

    return res.status(503).json({
      error: 'AI_DISABLED'
    })
  } catch (error) {
    console.error('OpenAI request failed', error)
    if (geminiKey) {
      try {
        const geminiReply = await callGemini([
          { role: 'system', content: systemPrompt },
          ...recent
        ])
        return res.json({ reply: geminiReply, fallback: 'gemini' })
      } catch (geminiError) {
        return res.status(502).json({ error: geminiError.message || 'Gemini request failed' })
      }
    }
    return res.status(502).json({ error: 'OpenAI request failed' })
  }
})

app.post('/api/chat/stream', async (req, res) => {
  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
  if (incoming.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  const recent = incoming.slice(-MAX_HISTORY)
  const controller = new AbortController()
  req.on('close', () => controller.abort())

  try {
    const apiKey = (process.env.OPENAI_API_KEY || '').trim()
    if (!apiKey && geminiKey) {
      const geminiReply = await callGemini([
        { role: 'system', content: systemPrompt },
        ...recent
      ])
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
      res.write(`data: ${JSON.stringify({ type: 'response.output_text.done', text: geminiReply })}\n\n`)
      res.write('data: [DONE]\n\n')
      return res.end()
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'AI_DISABLED',
        message: 'Missing OPENAI_API_KEY on server.'
      })
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: aiModel,
        input: [
          { role: 'system', content: systemPrompt },
          ...recent.map((message) => ({
            role: message.role,
            content: normalizeContent(message.role, message.content)
          }))
        ],
        max_output_tokens: 200,
        stream: true
      })
    })

    if (!response.ok) {
      const raw = await response.text()
      const data = raw ? JSON.parse(raw) : {}
      console.error('OpenAI /responses stream error', response.status, data)
      if (geminiKey) {
        const geminiReply = await callGemini([
          { role: 'system', content: systemPrompt },
          ...recent
        ])
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
        res.write(`data: ${JSON.stringify({ type: 'response.output_text.done', text: geminiReply })}\n\n`)
        res.write('data: [DONE]\n\n')
        return res.end()
      }
      return res.status(502).json({
        error: data?.error?.message || 'OpenAI request failed.',
        detail: data
      })
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()

    const reader = response.body.getReader()
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      res.write(Buffer.from(value))
    }

    res.end()
  } catch (error) {
    if (controller.signal.aborted) return
    console.error('OpenAI streaming request failed', error)
    if (geminiKey) {
      try {
        const geminiReply = await callGemini([
          { role: 'system', content: systemPrompt },
          ...recent
        ])
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
        res.write(`data: ${JSON.stringify({ type: 'response.output_text.done', text: geminiReply })}\n\n`)
        res.write('data: [DONE]\n\n')
        return res.end()
      } catch (geminiError) {
        return res.status(502).json({ error: geminiError.message || 'Gemini request failed' })
      }
    }
    res.status(502).json({ error: 'Server error while contacting OpenAI.' })
  }
})

app.get('/api/ai/status', async (req, res) => {
  const apiKey = (process.env.OPENAI_API_KEY || '').trim()
  const status = {}

  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: aiModel,
          input: [{ role: 'system', content: 'Reply with: ok' }],
          max_output_tokens: 10
        })
      })
      const raw = await response.text()
      const data = raw ? JSON.parse(raw) : {}
      status.openai = response.ok ? { ok: true } : { ok: false, error: data?.error?.message }
    } catch {
      status.openai = { ok: false, error: 'OpenAI request failed' }
    }
  } else {
    status.openai = { ok: false, error: 'OPENAI_API_KEY missing' }
  }

  if (geminiKey) {
    try {
      await callGemini([{ role: 'system', content: 'Reply with: ok' }])
      status.gemini = { ok: true }
    } catch (error) {
      status.gemini = { ok: false, error: error.message }
    }
  } else {
    status.gemini = { ok: false, error: 'GEMINI_API_KEY missing' }
  }

  const ok = Boolean(status.openai?.ok || status.gemini?.ok)
  res.status(ok ? 200 : 503).json({ ok, status })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

if (isProd && hasDist) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`)
})
