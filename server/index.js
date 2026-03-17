import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const app = express()
const port = process.env.PORT || 3001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'client', 'dist')
const hasDist = fs.existsSync(distPath)
const isProd = process.env.NODE_ENV === 'production'
const normalizeOrigin = (value) => String(value || '').trim().replace(/\/$/, '')
const parseOrigins = (value) =>
  String(value || '')
    .split(',')
    .map((item) => normalizeOrigin(item))
    .filter(Boolean)
const isLocalDevOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
const corsOrigins = [
  ...parseOrigins(process.env.CORS_ORIGINS),
  ...parseOrigins(process.env.CORS_ORIGIN)
]
const allowedCorsOrigins = new Set(corsOrigins)
const primaryCorsOrigin = corsOrigins[0] || ''
const jwtSecret = process.env.JWT_SECRET || ''
const jwtPreviousSecret = process.env.JWT_PREVIOUS_SECRET || ''
const tokenTtlMs = 30 * 60 * 1000
const authCookieName = 'profind_token'
const csrfCookieName = 'profind_csrf'
const appOrigin = normalizeOrigin(process.env.APP_ORIGIN) || primaryCorsOrigin || 'http://localhost:3000'
const smtpHost = process.env.SMTP_HOST || ''
const smtpPort = Number(process.env.SMTP_PORT || 0)
const smtpUser = process.env.SMTP_USER || ''
const smtpPass = process.env.SMTP_PASS || ''
const smtpFrom = process.env.SMTP_FROM || ''
const emailUser = process.env.EMAIL || ''
const emailSecret = process.env.EMAILSECRET || ''
const smtpAllowSelfSigned = String(process.env.SMTP_ALLOW_SELF_SIGNED || '').toLowerCase() === 'true'
const brevoApiKey = String(process.env.BREVO_API_KEY || '').trim()
const brevoSenderEmail = String(process.env.BREVO_SENDER_EMAIL || '').trim()
const brevoSenderName = String(process.env.BREVO_SENDER_NAME || 'Profind').trim()
const otpDebugMode = String(process.env.OTP_DEBUG || '').toLowerCase() === 'true' && !isProd
const otpTtlMinutesRaw = Number(process.env.OTP_TTL_MINUTES || 10)
const otpCooldownSecondsRaw = Number(process.env.OTP_COOLDOWN_SECONDS || 60)
const otpMaxAttemptsRaw = Number(process.env.OTP_MAX_ATTEMPTS || 5)
const otpTtlMinutes = Number.isFinite(otpTtlMinutesRaw) ? Math.min(Math.max(Math.round(otpTtlMinutesRaw), 1), 30) : 10
const otpCooldownSeconds = Number.isFinite(otpCooldownSecondsRaw)
  ? Math.min(Math.max(Math.round(otpCooldownSecondsRaw), 15), 600)
  : 60
const otpMaxAttempts = Number.isFinite(otpMaxAttemptsRaw) ? Math.min(Math.max(Math.round(otpMaxAttemptsRaw), 3), 10) : 5
const adminEmail = String(process.env.ADMIN_EMAIL || '')
  .trim()
  .toLowerCase()
const paystackSecretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim()
const paystackWebhookSecret = (process.env.PAYSTACK_WEBHOOK_SECRET || paystackSecretKey).trim()
const cloudinaryCloudName = (process.env.CLOUDINARY_CLOUD_NAME || '').trim()
const cloudinaryApiKey = (process.env.CLOUDINARY_API_KEY || '').trim()
const cloudinaryApiSecret = (process.env.CLOUDINARY_API_SECRET || '').trim()
const cloudinaryUploadPreset = (process.env.CLOUDINARY_UPLOAD_PRESET || '').trim()
const processStartMs = Date.now()

const runtimeStats = {
  requests: 0,
  failedApi: 0,
  serverErrors: 0,
  rateLimited: 0,
  apiLatencyMs: []
}

const OTP_TTL_MS = otpTtlMinutes * 60 * 1000

const otpTransportHost = smtpHost || 'smtp.gmail.com'
const otpTransportPort = smtpPort || 587
const otpTransportUser = emailUser || smtpUser
const otpTransportPass = emailSecret || smtpPass
const otpFrom = smtpFrom || otpTransportUser

let otpTransporter = null
if (otpTransportUser && otpTransportPass) {
  try {
    otpTransporter = nodemailer.createTransport({
      host: otpTransportHost,
      port: otpTransportPort,
      secure: otpTransportPort === 465,
      auth: {
        user: otpTransportUser,
        pass: otpTransportPass
      },
      ...(smtpAllowSelfSigned ? { tls: { rejectUnauthorized: false } } : {}),
      connectionTimeout: 90_000,
      greetingTimeout: 30_000,
      socketTimeout: 90_000
    })
    console.log('OTP email transporter created successfully')
    console.log(`Using email: ${otpTransportUser}`)
    otpTransporter.verify().then(
      () => console.log('OTP email server connection successful'),
      () => console.log('OTP email configuration verification failed')
    )
  } catch (error) {
    console.log('OTP email transporter initialization failed', error)
  }
}
const canSendOtpViaSmtp = () => Boolean(otpTransporter && otpFrom)
const canSendOtpViaBrevoApi = () => Boolean(brevoApiKey && brevoSenderEmail)
const createSmtpTransporter = () =>
  nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    ...(smtpAllowSelfSigned ? { tls: { rejectUnauthorized: false } } : {}),
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000
  })

if (!jwtSecret) {
  throw new Error('Missing JWT_SECRET')
}

if (isProd && jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production')
}

const authCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',
  maxAge: tokenTtlMs
}

const csrfCookieOptions = {
  ...authCookieOptions,
  httpOnly: false
}

app.set('trust proxy', 1)
app.use(helmet())
app.use(cookieParser())
app.use(
  express.json({
    limit: '15mb',
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString('utf8')
    }
  })
)
if (allowedCorsOrigins.size > 0) {
  app.use((req, res, next) => {
    const requestOrigin = normalizeOrigin(req.headers.origin)
    const isAllowedOrigin =
      (requestOrigin && allowedCorsOrigins.has(requestOrigin)) ||
      (!isProd && requestOrigin && isLocalDevOrigin(requestOrigin))
    if (isAllowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin)
      res.setHeader('Vary', 'Origin')
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (req.method === 'OPTIONS') {
      if (!isAllowedOrigin) return res.sendStatus(403)
      return res.sendStatus(204)
    }
    next()
  })
}
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
})

app.use((req, res, next) => {
  const isApi = req.path.startsWith('/api')
  const start = Date.now()
  if (isApi) runtimeStats.requests += 1

  res.on('finish', () => {
    if (!isApi) return
    const latency = Date.now() - start
    runtimeStats.apiLatencyMs.push(latency)
    if (runtimeStats.apiLatencyMs.length > 500) runtimeStats.apiLatencyMs.shift()
    if (res.statusCode >= 400) runtimeStats.failedApi += 1
    if (res.statusCode >= 500) runtimeStats.serverErrors += 1
    if (res.statusCode === 429) runtimeStats.rateLimited += 1
  })
  next()
})

const idSchema = z.number().int().positive()

let idSequence = 0
const createNumericId = () => {
  idSequence = (idSequence + 1) % 1000
  return Date.now() * 1000 + idSequence + crypto.randomInt(0, 1000)
}

const createCsrfToken = () => crypto.randomBytes(24).toString('base64url')

const setAuthCookies = (res, token) => {
  const csrfToken = createCsrfToken()
  res.cookie(authCookieName, token, authCookieOptions)
  res.cookie(csrfCookieName, csrfToken, csrfCookieOptions)
  return csrfToken
}

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
    passwordHash: { type: String, default: '' },
    phone: { type: String },
    role: { type: String, default: 'seeker' },
    licenseNumber: { type: String },
    companyName: { type: String },
    verified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    resetPasswordTokenHash: { type: String, default: '' },
    resetPasswordExpiresAt: { type: Date, default: null }
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

const newsletterSubscriptionSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    email: { type: String, unique: true, index: true, required: true },
    source: { type: String, default: 'footer' }
  },
  { timestamps: true }
)

const funnelEventSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    sessionId: String,
    event: { type: String, index: true },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
)

const otpChallengeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    email: { type: String, index: true, required: true },
    purpose: { type: String, default: 'email_verification', index: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    lastSentAt: { type: Date, required: true }
  },
  { timestamps: true }
)
otpChallengeSchema.index({ email: 1, purpose: 1 }, { unique: true })
otpChallengeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const monetizationPlanSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, index: true },
    name: String,
    description: String,
    type: { type: String, enum: ['agent_subscription', 'owner_subscription', 'featured_boost'] },
    durationDays: Number,
    priceKobo: Number,
    currency: { type: String, default: 'NGN' },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const paymentOrderSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    email: String,
    type: { type: String, enum: ['agent_subscription', 'owner_subscription', 'featured_boost'] },
    planCode: String,
    listingId: Number,
    durationDays: Number,
    amountKobo: Number,
    currency: { type: String, default: 'NGN' },
    provider: { type: String, default: 'paystack' },
    providerReference: { type: String, unique: true, index: true },
    status: { type: String, default: 'pending' },
    paidAt: Date,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
)

const paymentTransactionSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    orderId: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    provider: { type: String, default: 'paystack' },
    providerReference: String,
    providerTransactionId: String,
    amountKobo: Number,
    currency: { type: String, default: 'NGN' },
    status: String,
    paidAt: Date,
    raw: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
)

const subscriptionSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    userId: { type: Number, index: true },
    planCode: String,
    status: { type: String, default: 'active' },
    startsAt: Date,
    endsAt: Date,
    amountKobo: Number,
    currency: { type: String, default: 'NGN' }
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
const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema)
const FunnelEvent = mongoose.model('FunnelEvent', funnelEventSchema)
const OtpChallenge = mongoose.model('OtpChallenge', otpChallengeSchema)
const MonetizationPlan = mongoose.model('MonetizationPlan', monetizationPlanSchema)
const PaymentOrder = mongoose.model('PaymentOrder', paymentOrderSchema)
const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema)
const Subscription = mongoose.model('Subscription', subscriptionSchema)

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

const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    jwtSecret,
    {
      expiresIn: Math.floor(tokenTtlMs / 1000),
      issuer: 'profind',
      audience: 'profind-web'
    }
  )
}

const verifyToken = (token) => {
  if (!token) return null
  const secrets = [jwtSecret, jwtPreviousSecret].filter(Boolean)
  for (const secret of secrets) {
    try {
      return jwt.verify(token, secret, { issuer: 'profind', audience: 'profind-web' })
    } catch {
      // Try next secret (rotation support).
    }
  }
  return null
}

const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || ''
  const bearerToken = header.startsWith('Bearer ') ? header.slice(7) : null
  const token = req.cookies?.[authCookieName] || bearerToken
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const decoded = verifyToken(token)
    if (!decoded) return res.status(401).json({ error: 'Invalid token' })
    const user = await User.findOne({ id: decoded.id })
    if (!user) return res.status(401).json({ error: 'User not found' })
    req.user = { id: user.id, role: user.role, email: user.email }
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

const requireCsrf = (req, res, next) => {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next()
  const csrfExemptPaths = new Set([
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
    '/auth/reset-password/request',
    '/auth/reset-password/confirm',
    '/auth/otp/send',
    '/auth/otp/verify'
  ])
  if (csrfExemptPaths.has(req.path)) return next()
  const hasAuthCookie = Boolean(req.cookies?.[authCookieName])
  if (!hasAuthCookie) return next()
  const csrfCookie = req.cookies?.[csrfCookieName]
  const csrfHeader = String(req.headers['x-csrf-token'] || '')
  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ error: 'Invalid CSRF token' })
  }
  next()
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 5 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' }
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
})

const otpSendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 5 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many OTP requests. Please try again later.' }
})

const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 20 : 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many OTP verification attempts. Please try again later.' }
})

const allowedRoles = ['seeker', 'owner', 'agent']

const authRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.enum(['seeker', 'owner', 'agent']).optional(),
  licenseNumber: z.string().optional(),
  companyName: z.string().optional()
})

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const resetPasswordRequestSchema = z.object({
  email: z.string().email()
})

const resetPasswordConfirmSchema = z.object({
  token: z.string().min(20),
  newPassword: z.string().min(6)
})

const createResetToken = () => crypto.randomBytes(32).toString('hex')
const hashResetToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

const monetizationDefaults = [
  {
    code: 'agent_sub_monthly',
    name: 'Agent Pro Monthly',
    description: 'Monthly subscription for agents with premium access.',
    type: 'agent_subscription',
    durationDays: 30,
    priceKobo: 250000,
    currency: 'NGN',
    active: true
  },
  {
    code: 'owner_sub_monthly',
    name: 'Owner Pro Monthly',
    description: 'Monthly subscription for property owners with premium listing access.',
    type: 'owner_subscription',
    durationDays: 30,
    priceKobo: 200000,
    currency: 'NGN',
    active: true
  },
  {
    code: 'featured_boost_7d',
    name: 'Featured Boost 7 Days',
    description: 'Promote a listing in featured sections for 7 days.',
    type: 'featured_boost',
    durationDays: 7,
    priceKobo: 50000,
    currency: 'NGN',
    active: true
  },
  {
    code: 'featured_boost_14d',
    name: 'Featured Boost 14 Days',
    description: 'Promote a listing in featured sections for 14 days.',
    type: 'featured_boost',
    durationDays: 14,
    priceKobo: 90000,
    currency: 'NGN',
    active: true
  }
]

let monetizationSeeded = false
const ensureMonetizationPlans = async () => {
  const defaultCodes = monetizationDefaults.map((plan) => plan.code)

  if (monetizationSeeded) {
    const existingActiveDefaults = await MonetizationPlan.countDocuments({
      code: { $in: defaultCodes },
      active: true
    })
    if (existingActiveDefaults >= monetizationDefaults.length) return
  }

  for (const plan of monetizationDefaults) {
    await MonetizationPlan.updateOne({ code: plan.code }, { $set: plan }, { upsert: true })
  }
  monetizationSeeded = true
}

const buildPaystackReference = () => `profind_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`

const initializePaystackTransaction = async ({ email, amountKobo, reference, callbackUrl, metadata }) => {
  if (!paystackSecretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is missing')
  }
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      amount: amountKobo,
      currency: 'NGN',
      reference,
      callback_url: callbackUrl,
      metadata
    })
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data?.status || !data?.data?.authorization_url) {
    throw new Error(data?.message || 'Paystack initialize failed')
  }
  return data.data
}

const verifyPaystackSignature = (req) => {
  if (!paystackWebhookSecret) return false
  const signature = String(req.headers['x-paystack-signature'] || '')
  if (!signature || !req.rawBody) return false
  const expected = crypto.createHmac('sha512', paystackWebhookSecret).update(req.rawBody).digest('hex')
  return signature === expected
}

const grantEntitlementForOrder = async (order, paymentData = {}) => {
  if (order.type === 'agent_subscription' || order.type === 'owner_subscription') {
    const now = new Date()
    const current = await Subscription.findOne({ userId: order.userId }).sort({ endsAt: -1 })
    const base = current?.endsAt && current.endsAt > now ? current.endsAt : now
    const endsAt = new Date(base.getTime() + order.durationDays * 24 * 60 * 60 * 1000)
    await Subscription.create({
      id: createNumericId(),
      userId: order.userId,
      planCode: order.planCode,
      status: 'active',
      startsAt: base,
      endsAt,
      amountKobo: order.amountKobo,
      currency: order.currency
    })
    if (order.type === 'agent_subscription') {
      await User.updateOne(
        { id: order.userId },
        { $set: { verified: true, verifiedAt: new Date().toISOString() } }
      )
    }
    return { subscriptionEndsAt: endsAt.toISOString() }
  }

  if (order.type === 'featured_boost') {
    const listing = await Listing.findOne({ id: order.listingId })
    if (!listing) return {}
    const now = new Date()
    const currentUntilRaw = listing.data?.featuredUntil
    const currentUntil = currentUntilRaw ? new Date(currentUntilRaw) : null
    const base = currentUntil && currentUntil > now ? currentUntil : now
    const featuredUntil = new Date(base.getTime() + order.durationDays * 24 * 60 * 60 * 1000)
    listing.data = {
      ...(listing.data || {}),
      isFeatured: true,
      featuredPlanCode: order.planCode,
      featuredActivatedAt: now.toISOString(),
      featuredUntil: featuredUntil.toISOString()
    }
    await listing.save()
    return { featuredUntil: featuredUntil.toISOString() }
  }

  return {}
}

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${String(appOrigin).replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`
  if (smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom) {
    const transporter = createSmtpTransporter()
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'Reset your Profind password',
      text: `Reset your password using this link: ${resetUrl}. This link expires in 1 hour.`
    })
    return {}
  }

  if (canSendOtpViaBrevoApi()) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify({
        sender: { name: brevoSenderName, email: brevoSenderEmail },
        to: [{ email }],
        subject: 'Reset your Profind password',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset your password</h2>
            <p>Use the button below to choose a new password. This link expires in 1 hour.</p>
            <p style="margin: 24px 0;">
              <a
                href="${resetUrl}"
                style="background-color: #16a34a; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; display: inline-block;"
              >
                Reset Password
              </a>
            </p>
            <p>If the button does not work, copy and paste this link into your browser:</p>
            <p>${resetUrl}</p>
          </div>
        `,
        textContent: `Reset your password using this link: ${resetUrl}. This link expires in 1 hour.`
      })
    })

    if (!response.ok) {
      const brevoError = await response.text().catch(() => '')
      throw new Error(`Brevo API send failed: ${response.status} ${brevoError}`)
    }

    return {}
  }

  if (isProd) throw new Error('Password reset email is not configured')
  return { resetUrl }
}

const generateOtpCode = () => `${Math.floor(100000 + Math.random() * 900000)}`
const hashOtp = (otp) => crypto.createHash('sha256').update(String(otp)).digest('hex')

const sendOtpViaBrevoApi = async (email, otp) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': brevoApiKey
    },
    body: JSON.stringify({
      sender: { name: brevoSenderName, email: brevoSenderEmail },
      to: [{ email }],
      subject: 'Your OTP Code',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP Code</h2>
          <div style="background-color: #e6f3ff; padding: 20px; text-align: center; border-radius: 8px;">
            <h1 style="color: #007bff; font-size: 36px; margin: 0;">${otp}</h1>
          </div>
          <p style="margin-top: 12px; color: #444;">This code will expire in 10 minutes.</p>
        </div>
      `,
      textContent: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`
    })
  })

  if (!response.ok) {
    const brevoError = await response.text().catch(() => '')
    throw new Error(`Brevo API send failed: ${response.status} ${brevoError}`)
  }
}

const sendOtpEmailMessage = async (email, otp) => {
  if (!canSendOtpViaSmtp() && !canSendOtpViaBrevoApi()) {
    if (isProd) throw new Error('OTP email is not configured')
    return { debugOtp: otpDebugMode ? otp : undefined }
  }

  if (canSendOtpViaSmtp()) {
    try {
      await otpTransporter.sendMail({
        from: otpFrom,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your OTP Code</h2>
            <div style="background-color: #e6f3ff; padding: 20px; text-align: center; border-radius: 8px;">
              <h1 style="color: #007bff; font-size: 36px; margin: 0;">${otp}</h1>
            </div>
            <p style="margin-top: 12px; color: #444;">This code will expire in 10 minutes.</p>
          </div>
        `,
        text: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`
      })
      return {}
    } catch (smtpError) {
      console.log('OTP SMTP send failed, trying Brevo API fallback:', smtpError?.message || smtpError)
      if (!canSendOtpViaBrevoApi()) throw smtpError
    }
  }

  await sendOtpViaBrevoApi(email, otp)

  return {}
}

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

const listingInputSchema = z.record(z.string(), z.any())

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
  credentials: z.record(z.string(), z.any())
})

const savedSearchInputSchema = z.record(z.string(), z.any())

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

const listingImageUploadInputSchema = z.object({
  images: z.array(z.string().min(32)).min(1).max(10)
})

const isCloudinaryConfigured = () =>
  Boolean(cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret)

const buildCloudinarySignature = (params) => {
  const serialized = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return crypto.createHash('sha1').update(`${serialized}${cloudinaryApiSecret}`).digest('hex')
}

const uploadImageToCloudinary = async (dataUrl, { folder, publicId } = {}) => {
  const trimmed = String(dataUrl || '').trim()
  if (!/^data:image\/(png|jpe?g|webp|gif|avif);base64,/i.test(trimmed)) {
    throw new Error('Only PNG, JPG, WEBP, GIF, and AVIF images are supported')
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const paramsToSign = {
    folder: folder || undefined,
    public_id: publicId || undefined,
    timestamp,
    ...(cloudinaryUploadPreset ? { upload_preset: cloudinaryUploadPreset } : {})
  }

  const signature = buildCloudinarySignature(paramsToSign)
  const formData = new FormData()
  formData.set('file', trimmed)
  formData.set('api_key', cloudinaryApiKey)
  formData.set('timestamp', String(timestamp))
  formData.set('signature', signature)
  if (folder) formData.set('folder', folder)
  if (publicId) formData.set('public_id', publicId)
  if (cloudinaryUploadPreset) formData.set('upload_preset', cloudinaryUploadPreset)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
    method: 'POST',
    body: formData
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = payload?.error?.message || 'Cloudinary upload failed'
    throw new Error(message)
  }

  return {
    url: payload.secure_url || payload.url,
    publicId: payload.public_id,
    width: payload.width,
    height: payload.height,
    format: payload.format
  }
}

const newsletterSubscribeSchema = z.object({
  email: z.string().email()
})

const otpSendSchema = z.object({
  email: z.string().email(),
  purpose: z.enum(['email_verification', 'password_reset', 'login']).optional()
})

const otpVerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
  purpose: z.enum(['email_verification', 'password_reset', 'login']).optional()
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

const paymentInitializeSchema = z.object({
  planCode: z.string().min(3),
  listingId: idSchema.optional(),
  callbackUrl: z.string().url().optional()
})

const paymentVerifySchema = z.object({
  reference: z.string().min(8)
})

const funnelEventInputSchema = z.object({
  event: z.string().min(3),
  sessionId: z.string().min(3).optional(),
  metadata: z.record(z.string(), z.any()).optional()
})

app.use(async (req, res, next) => {
  try {
    await connectDb()
    await ensureMonetizationPlans()
    next()
  } catch (error) {
    console.error('Mongo connection failed', error)
    res.status(500).json({ error: 'Database connection failed' })
  }
})

app.use('/api', apiLimiter)
app.use('/api', requireCsrf)

app.post('/api/auth/register', authLimiter, async (req, res) => {
  const parse = authRegisterSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const { name, password, phone, role, licenseNumber, companyName } = parse.data
  const email = String(parse.data.email).trim().toLowerCase()
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }
  const normalizedRole = email && adminEmail && email === adminEmail ? 'admin' : role || 'seeker'
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ error: 'Email already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    id: createNumericId(),
    name,
    email,
    passwordHash,
    phone,
    role: normalizedRole,
    licenseNumber,
    companyName,
    emailVerified: false
  })
  res.status(201).json({
    ok: true,
    message: 'Account created successfully. Verify your email with OTP.',
    user: toUserResponse(user)
  })
})

app.post('/api/auth/login', authLimiter, loginLimiter, async (req, res) => {
  const parse = authLoginSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const email = String(parse.data.email).trim().toLowerCase()
  const { password } = parse.data
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  if (!user.emailVerified) return res.status(403).json({ error: 'Please verify your email with OTP before signing in.' })
  if (adminEmail && email === adminEmail && user.role !== 'admin') {
    user.role = 'admin'
    await user.save()
  }
  const token = signToken(user)
  const csrfToken = setAuthCookies(res, token)
  res.json({ user: toUserResponse(user), csrfToken })
})

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await User.findOne({ id: req.user.id })
  if (!user) return res.status(404).json({ error: 'User not found' })
  const csrfToken = req.cookies?.[csrfCookieName] || createCsrfToken()
  if (!req.cookies?.[csrfCookieName]) {
    res.cookie(csrfCookieName, csrfToken, csrfCookieOptions)
  }
  res.json({ user: toUserResponse(user), csrfToken })
})

app.post('/api/auth/logout', async (req, res) => {
  res.clearCookie(authCookieName, { ...authCookieOptions, maxAge: 0 })
  res.clearCookie(csrfCookieName, { ...csrfCookieOptions, maxAge: 0 })
  res.json({ ok: true })
})

app.post('/api/auth/reset-password/request', authLimiter, async (req, res) => {
  const parse = resetPasswordRequestSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const email = String(parse.data.email).trim().toLowerCase()
  const user = await User.findOne({ email })
  let debugResetUrl

  if (user) {
    const token = createResetToken()
    user.resetPasswordTokenHash = hashResetToken(token)
    user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await user.save()
    void sendPasswordResetEmail(user.email, token)
      .then((mailResult) => {
        if (mailResult?.resetUrl) {
          console.log(`Password reset debug URL for ${user.email}: ${mailResult.resetUrl}`)
        }
      })
      .catch((error) => {
        console.error(`Password reset email send failed for ${user.email}`, error)
      })
    if (!isProd) {
      debugResetUrl = `${String(appOrigin).replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`
    }
  }

  // Prevent account enumeration.
  res.json({
    ok: true,
    message: 'If that email exists, a reset link has been sent.',
    ...(debugResetUrl ? { debugResetUrl } : {})
  })
})

app.post('/api/auth/reset-password/confirm', authLimiter, async (req, res) => {
  const parse = resetPasswordConfirmSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })

  const tokenHash = hashResetToken(parse.data.token)
  const user = await User.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpiresAt: { $gt: new Date() }
  })

  if (!user) return res.status(400).json({ error: 'Invalid or expired reset token' })

  user.passwordHash = await bcrypt.hash(parse.data.newPassword, 10)
  user.resetPasswordTokenHash = ''
  user.resetPasswordExpiresAt = null
  await user.save()

  res.json({ ok: true })
})

// Backward-compatible alias for existing client calls.
app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  const parse = resetPasswordRequestSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid data' })
  const email = String(parse.data.email).trim().toLowerCase()
  const user = await User.findOne({ email })
  let debugResetUrl

  if (user) {
    const token = createResetToken()
    user.resetPasswordTokenHash = hashResetToken(token)
    user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await user.save()
    void sendPasswordResetEmail(user.email, token)
      .then((mailResult) => {
        if (mailResult?.resetUrl) {
          console.log(`Password reset debug URL for ${user.email}: ${mailResult.resetUrl}`)
        }
      })
      .catch((error) => {
        console.error(`Password reset email send failed for ${user.email}`, error)
      })
    if (!isProd) {
      debugResetUrl = `${String(appOrigin).replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`
    }
  }

  res.json({
    ok: true,
    message: 'If that email exists, a reset link has been sent.',
    ...(debugResetUrl ? { debugResetUrl } : {})
  })
})

app.post('/api/auth/otp/send', authLimiter, otpSendLimiter, async (req, res) => {
  const parse = otpSendSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ success: false, error: 'Email is required' })

  if (!canSendOtpViaSmtp() && !canSendOtpViaBrevoApi()) {
    return res.status(503).json({
      success: false,
      error: 'OTP email service is not configured. Set SMTP_* vars or BREVO_API_KEY + BREVO_SENDER_EMAIL.'
    })
  }

  const email = String(parse.data.email).trim().toLowerCase()
  const purpose = parse.data.purpose || 'email_verification'
  const now = Date.now()
  const existing = await OtpChallenge.findOne({ email, purpose })
  if (existing?.lastSentAt) {
    const retryAfterMs = otpCooldownSeconds * 1000 - (now - new Date(existing.lastSentAt).getTime())
    if (retryAfterMs > 0) {
      return res.status(429).json({
        success: false,
        error: `Please wait ${Math.ceil(retryAfterMs / 1000)}s before requesting another OTP`
      })
    }
  }

  const otp = generateOtpCode()
  const expiresAt = new Date(now + OTP_TTL_MS)
  await OtpChallenge.updateOne(
    { email, purpose },
    {
      $set: {
        id: existing?.id || createNumericId(),
        email,
        purpose,
        otpHash: hashOtp(otp),
        expiresAt,
        attempts: 0,
        lastSentAt: new Date(now)
      }
    },
    { upsert: true }
  )

  try {
    const mailResult = await sendOtpEmailMessage(email, otp)
    res.json({
      success: true,
      message: 'OTP sent successfully. It expires soon.',
      expiresAt: expiresAt.toISOString(),
      purpose,
      ...(mailResult?.debugOtp ? { debugOtp: mailResult.debugOtp } : {})
    })
  } catch (error) {
    console.log('send OTP error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP'
    })
  }
})

app.post('/api/auth/otp/verify', authLimiter, otpVerifyLimiter, async (req, res) => {
  const parse = otpVerifySchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ success: false, error: 'Email and OTP are required' })

  const email = String(parse.data.email).trim().toLowerCase()
  const purpose = parse.data.purpose || 'email_verification'
  const otp = parse.data.otp
  const entry = await OtpChallenge.findOne({ email, purpose })
  if (!entry) return res.status(400).json({ success: false, error: 'OTP not found or expired' })

  if (Date.now() > new Date(entry.expiresAt).getTime()) {
    await OtpChallenge.deleteOne({ _id: entry._id })
    return res.status(400).json({ success: false, error: 'OTP expired' })
  }

  if (entry.attempts >= otpMaxAttempts) {
    await OtpChallenge.deleteOne({ _id: entry._id })
    return res.status(429).json({ success: false, error: 'Too many attempts. Request a new OTP.' })
  }

  if (entry.otpHash !== hashOtp(otp)) {
    entry.attempts += 1
    await entry.save()
    return res.status(400).json({ success: false, error: 'Invalid OTP' })
  }

  await OtpChallenge.deleteOne({ _id: entry._id })
  await User.updateOne({ email }, { $set: { emailVerified: true } })
  return res.json({ success: true, message: 'OTP verified successfully', purpose })
})

app.post('/api/newsletter/subscribe', async (req, res) => {
  const parse = newsletterSubscribeSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid email' })

  const email = parse.data.email.trim().toLowerCase()
  await NewsletterSubscription.updateOne(
    { email },
    {
      $setOnInsert: {
        id: createNumericId(),
        email,
        source: 'footer'
      }
    },
    { upsert: true }
  )

  res.json({ ok: true })
})

app.post('/api/analytics/events', async (req, res) => {
  const parse = funnelEventInputSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid analytics event' })

  let userId = null
  const header = req.headers.authorization || ''
  const bearerToken = header.startsWith('Bearer ') ? header.slice(7) : null
  const token = req.cookies?.[authCookieName] || bearerToken
  if (token) {
    const decoded = verifyToken(token)
    if (decoded?.id) userId = decoded.id
  }

  await FunnelEvent.create({
    id: createNumericId(),
    userId: userId || undefined,
    sessionId: parse.data.sessionId,
    event: parse.data.event,
    metadata: parse.data.metadata || {}
  })

  res.json({ ok: true })
})

app.get('/api/analytics/overview', requireAuth, async (_req, res) => {
  const events = ['search_submitted', 'property_viewed', 'inquiry_submitted', 'payment_started', 'payment_verified']
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  const rows = await FunnelEvent.aggregate([
    { $match: { createdAt: { $gte: since }, event: { $in: events } } },
    { $group: { _id: '$event', count: { $sum: 1 } } }
  ])
  const counts = Object.fromEntries(events.map((event) => [event, 0]))
  rows.forEach((row) => {
    counts[row._id] = row.count
  })

  const avgLatency =
    runtimeStats.apiLatencyMs.length > 0
      ? Math.round(runtimeStats.apiLatencyMs.reduce((sum, n) => sum + n, 0) / runtimeStats.apiLatencyMs.length)
      : 0
  const failedRatePct =
    runtimeStats.requests > 0 ? Number(((runtimeStats.failedApi / runtimeStats.requests) * 100).toFixed(2)) : 0

  res.json({
    since: since.toISOString(),
    counts,
    qa: {
      failedRatePct,
      avgLatencyMs: avgLatency,
      requests: runtimeStats.requests
    }
  })
})

app.get('/api/analytics/trends', requireAuth, async (req, res) => {
  const events = ['search_submitted', 'property_viewed', 'inquiry_submitted', 'payment_started', 'payment_verified']
  const daysRaw = Number(req.query.days || 14)
  const days = Number.isFinite(daysRaw) ? Math.max(7, Math.min(30, Math.round(daysRaw))) : 14
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const rows = await FunnelEvent.aggregate([
    { $match: { createdAt: { $gte: since }, event: { $in: events } } },
    {
      $group: {
        _id: {
          day: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          event: '$event'
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.day': 1 } }
  ])

  const series = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const dayKey = date.toISOString().slice(0, 10)
    const seed = { day: dayKey }
    events.forEach((event) => {
      seed[event] = 0
    })
    series.push(seed)
  }

  rows.forEach((row) => {
    const target = series.find((item) => item.day === row._id.day)
    if (!target) return
    target[row._id.event] = row.count
  })

  res.json({ days, series, events })
})

const finalizeSuccessfulPayment = async (order, paymentData) => {
  if (!order) return null
  if (order.status === 'paid') return order

  order.status = 'paid'
  order.paidAt = new Date()
  order.metadata = {
    ...(order.metadata || {}),
    paidChannel: paymentData?.channel,
    paidGatewayResponse: paymentData?.gateway_response
  }
  await order.save()

  await PaymentTransaction.updateOne(
    { orderId: order.id },
    {
      $setOnInsert: {
        id: createNumericId(),
        orderId: order.id
      },
      $set: {
        userId: order.userId,
        provider: 'paystack',
        providerReference: order.providerReference,
        providerTransactionId: String(paymentData?.id || ''),
        amountKobo: Number(paymentData?.amount || order.amountKobo),
        currency: paymentData?.currency || order.currency,
        status: 'success',
        paidAt: paymentData?.paid_at ? new Date(paymentData.paid_at) : new Date(),
        raw: paymentData
      }
    },
    { upsert: true }
  )

  await grantEntitlementForOrder(order, paymentData)
  return order
}

app.get('/api/monetization/plans', async (req, res) => {
  const plans = await MonetizationPlan.find({ active: true }).sort({ priceKobo: 1 })
  res.json({ plans })
})

app.post('/api/payments/initialize', requireAuth, async (req, res) => {
  const parse = paymentInitializeSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid payment request' })

  const user = await User.findOne({ id: req.user.id })
  if (!user) return res.status(404).json({ error: 'User not found' })
  const plan = await MonetizationPlan.findOne({ code: parse.data.planCode, active: true })
  if (!plan) return res.status(404).json({ error: 'Plan not found' })

  if (plan.type === 'agent_subscription' && req.user.role !== 'agent') {
    return res.status(403).json({ error: 'Only agents can buy this plan' })
  }
  if (plan.type === 'owner_subscription' && req.user.role !== 'owner') {
    return res.status(403).json({ error: 'Only property owners can buy this plan' })
  }

  if (plan.type === 'agent_subscription' || plan.type === 'owner_subscription') {
    const now = new Date()
    const active = await Subscription.findOne({
      userId: req.user.id,
      status: 'active',
      endsAt: { $gt: now }
    })
    if (active) {
      return res.status(409).json({ error: 'You already have an active subscription' })
    }
  }

  let listingId = null
  if (plan.type === 'featured_boost') {
    listingId = Number(parse.data.listingId)
    if (!Number.isFinite(listingId)) return res.status(400).json({ error: 'listingId is required for boosts' })
    const listing = await Listing.findOne({ id: listingId })
    if (!listing) return res.status(404).json({ error: 'Listing not found' })
    if (req.user.role !== 'admin' && listing.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'You can only boost your own listing' })
    }
  }

  const reference = buildPaystackReference()
  const callbackUrl =
    parse.data.callbackUrl || `${String(appOrigin).replace(/\/$/, '')}/dashboard?payment=success`

  const order = await PaymentOrder.create({
    id: createNumericId(),
    userId: req.user.id,
    email: user.email,
    type: plan.type,
    planCode: plan.code,
    listingId,
    durationDays: plan.durationDays,
    amountKobo: plan.priceKobo,
    currency: plan.currency || 'NGN',
    provider: 'paystack',
    providerReference: reference,
    status: 'pending',
    metadata: {}
  })

  try {
    const session = await initializePaystackTransaction({
      email: user.email,
      amountKobo: plan.priceKobo,
      reference,
      callbackUrl,
      metadata: {
        orderId: order.id,
        userId: req.user.id,
        planCode: plan.code,
        type: plan.type,
        listingId
      }
    })

    order.metadata = {
      ...(order.metadata || {}),
      accessCode: session.access_code,
      authorizationUrl: session.authorization_url
    }
    await order.save()

    res.json({
      orderId: order.id,
      reference,
      authorizationUrl: session.authorization_url,
      accessCode: session.access_code,
      amountKobo: plan.priceKobo,
      currency: plan.currency || 'NGN'
    })
  } catch (error) {
    order.status = 'failed'
    order.metadata = { ...(order.metadata || {}), initializeError: error.message }
    await order.save()
    res.status(502).json({ error: error.message || 'Could not initialize payment' })
  }
})

app.post('/api/payments/verify', requireAuth, async (req, res) => {
  const parse = paymentVerifySchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid reference' })
  if (!paystackSecretKey) return res.status(503).json({ error: 'PAYSTACK_SECRET_KEY is missing' })

  const order = await PaymentOrder.findOne({
    providerReference: parse.data.reference,
    userId: req.user.id
  })
  if (!order) return res.status(404).json({ error: 'Order not found' })
  if (order.status === 'paid') return res.json({ ok: true, order })

  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(parse.data.reference)}`, {
    headers: { Authorization: `Bearer ${paystackSecretKey}` }
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data?.status || !data?.data) {
    return res.status(502).json({ error: data?.message || 'Paystack verify failed' })
  }
  const paymentData = data.data
  if (paymentData.status !== 'success') {
    return res.status(400).json({ error: 'Payment not successful yet' })
  }
  if (Number(paymentData.amount) !== order.amountKobo) {
    return res.status(400).json({ error: 'Amount mismatch' })
  }

  await finalizeSuccessfulPayment(order, paymentData)
  res.json({ ok: true, order })
})

app.post('/api/payments/webhook', async (req, res) => {
  if (!verifyPaystackSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body?.event
  const data = req.body?.data || {}
  if (event !== 'charge.success') {
    return res.json({ ok: true })
  }

  const reference = String(data.reference || '')
  if (!reference) return res.json({ ok: true })

  const order = await PaymentOrder.findOne({ providerReference: reference })
  if (!order) return res.json({ ok: true })
  if (order.status === 'paid') return res.json({ ok: true })
  if (Number(data.amount) !== order.amountKobo) {
    order.status = 'failed'
    order.metadata = { ...(order.metadata || {}), webhookError: 'Amount mismatch' }
    await order.save()
    return res.json({ ok: true })
  }

  await finalizeSuccessfulPayment(order, data)
  res.json({ ok: true })
})

app.get('/api/payments/orders/me', requireAuth, async (req, res) => {
  const orders = await PaymentOrder.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(100)
  res.json({ orders })
})

app.get('/api/subscriptions/me', requireAuth, async (req, res) => {
  const now = new Date()
  const subscriptions = await Subscription.find({ userId: req.user.id }).sort({ createdAt: -1 })
  const active = subscriptions.find((sub) => sub.endsAt && sub.endsAt > now) || null
  res.json({ activeSubscription: active, subscriptions })
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

app.get('/api/admin/analytics/funnel', requireAuth, requireAdmin, async (_req, res) => {
  const events = ['search_submitted', 'property_viewed', 'inquiry_submitted', 'payment_started', 'payment_verified']
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const rows = await FunnelEvent.aggregate([
    { $match: { createdAt: { $gte: since }, event: { $in: events } } },
    { $group: { _id: '$event', count: { $sum: 1 } } }
  ])
  const counts = Object.fromEntries(events.map((event) => [event, 0]))
  rows.forEach((row) => {
    counts[row._id] = row.count
  })
  res.json({ counts, since: since.toISOString() })
})

app.get('/api/admin/analytics/trends', requireAuth, requireAdmin, async (req, res) => {
  const events = ['search_submitted', 'property_viewed', 'inquiry_submitted', 'payment_started', 'payment_verified']
  const daysRaw = Number(req.query.days || 14)
  const days = Number.isFinite(daysRaw) ? Math.max(7, Math.min(60, Math.round(daysRaw))) : 14
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const rows = await FunnelEvent.aggregate([
    { $match: { createdAt: { $gte: since }, event: { $in: events } } },
    {
      $group: {
        _id: {
          day: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          event: '$event'
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.day': 1 } }
  ])

  const series = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - i)
    const dayKey = date.toISOString().slice(0, 10)
    const seed = { day: dayKey }
    events.forEach((event) => {
      seed[event] = 0
    })
    series.push(seed)
  }

  rows.forEach((row) => {
    const target = series.find((item) => item.day === row._id.day)
    if (!target) return
    target[row._id.event] = row.count
  })

  res.json({ days, series, events })
})

app.get('/api/admin/qa', requireAuth, requireAdmin, async (_req, res) => {
  const [totalListings, pendingListings, totalUsers, totalInquiries] = await Promise.all([
    Listing.countDocuments({}),
    Listing.countDocuments({ status: 'pending' }),
    User.countDocuments({}),
    Inquiry.countDocuments({})
  ])
  const avgLatency =
    runtimeStats.apiLatencyMs.length > 0
      ? Math.round(runtimeStats.apiLatencyMs.reduce((sum, n) => sum + n, 0) / runtimeStats.apiLatencyMs.length)
      : 0
  const failedRatePct =
    runtimeStats.requests > 0 ? Number(((runtimeStats.failedApi / runtimeStats.requests) * 100).toFixed(2)) : 0

  res.json({
    qa: {
      totalListings,
      pendingListings,
      totalUsers,
      totalInquiries,
      requests: runtimeStats.requests,
      failedApi: runtimeStats.failedApi,
      serverErrors: runtimeStats.serverErrors,
      rateLimited: runtimeStats.rateLimited,
      failedRatePct,
      avgLatencyMs: avgLatency
    }
  })
})

app.get('/api/admin/system/health', requireAuth, requireAdmin, async (_req, res) => {
  const avgLatency =
    runtimeStats.apiLatencyMs.length > 0
      ? Math.round(runtimeStats.apiLatencyMs.reduce((sum, n) => sum + n, 0) / runtimeStats.apiLatencyMs.length)
      : 0

  res.json({
    ok: true,
    uptimeSeconds: Math.round((Date.now() - processStartMs) / 1000),
    memory: process.memoryUsage(),
    avgApiLatencyMs: avgLatency,
    requests: runtimeStats.requests,
    failedApi: runtimeStats.failedApi,
    serverErrors: runtimeStats.serverErrors
  })
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

app.post('/api/uploads/listing-images', requireAuth, async (req, res) => {
  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      error: 'Cloudinary is not configured on the server'
    })
  }

  const parse = listingImageUploadInputSchema.safeParse(req.body)
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid image upload payload' })
  }

  const folder = `profind/listings/${req.user.id}`
  const uploads = await Promise.all(
    parse.data.images.map((image, index) =>
      uploadImageToCloudinary(image, {
        folder,
        publicId: `listing_${Date.now()}_${index + 1}_${crypto.randomInt(1000, 9999)}`
      })
    )
  )

  res.json({ images: uploads })
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
  let user = null
  const header = req.headers.authorization || ''
  const bearerToken = header.startsWith('Bearer ') ? header.slice(7) : null
  const token = req.cookies?.[authCookieName] || bearerToken
  if (token) {
    try {
      const decoded = verifyToken(token)
      const dbUser = decoded?.id ? await User.findOne({ id: decoded.id }) : null
      if (dbUser) user = { id: dbUser.id }
    } catch {
      user = null
    }
  }
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

app.post('/api/saved-searches/:id/notify', requireAuth, async (req, res) => {
  const searchId = Number(req.params.id)
  const search = await SavedSearch.findOne({ id: searchId, userId: req.user.id })
  if (!search) return res.status(404).json({ error: 'Saved search not found' })
  const user = await User.findOne({ id: req.user.id })
  if (!user?.email) return res.status(400).json({ error: 'No email found for user' })

  const summary = JSON.stringify(search.criteria || {}, null, 2)
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
    return res.json({ ok: true, debug: 'SMTP not configured', summary })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass }
  })

  await transporter.sendMail({
    from: smtpFrom,
    to: user.email,
    subject: 'Profind saved search alert',
    text: `Your saved search digest is ready.\n\nCriteria:\n${summary}`
  })
  res.json({ ok: true })
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

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled server error', err)
  const status = err.statusCode || err.status || 500
  if (status >= 500) {
    return res.status(500).json({ error: 'Internal server error' })
  }
  return res.status(status).json({ error: err.message || 'Request failed' })
})

if (isProd && hasDist) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Profind server listening on http://localhost:${port}`)
  })
}

export default app
