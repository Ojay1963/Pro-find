import { resolveApiBase } from './apiBase'

const API_BASE = resolveApiBase()
const CSRF_KEY = 'profind_csrf_token'
const AUTH_TOKEN_KEY = 'profind_auth_token'
const AUTH_CHANGE_EVENT = 'profind-auth-changed'
const ANALYTICS_SESSION_KEY = 'profind_analytics_session'
const REQUEST_TIMEOUT_MS = 45000

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers || {})
  const method = String(options.method || 'GET').toUpperCase()
  const csrfToken = localStorage.getItem(CSRF_KEY)
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    headers.set('x-csrf-token', csrfToken)
  }
  if (authToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${authToken}`)
  }
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  let response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: 'include',
      headers,
      signal: options.signal || controller.signal
    })
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = data?.error || 'Request failed'
    throw new Error(message)
  }
  return data
}

const safeRequest = (path, options) =>
  apiRequest(path, options).catch((error) => {
    console.error(`API error ${path}`, error)
    return null
  })

const setAuthSession = (user, csrfToken, token) => {
  if (csrfToken) localStorage.setItem(CSRF_KEY, csrfToken)
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
  if (user) {
    localStorage.setItem('profind_user_role', user.role || 'seeker')
    localStorage.setItem('profind_user_name', user.name || 'User')
    localStorage.setItem('profind_user_id', user.id)
    localStorage.setItem('profind_user_email', user.email || '')
    writeJson('profind_current_user', user)
  }
  emitAuthChange()
}


const clearAuthSession = () => {
  localStorage.removeItem(CSRF_KEY)
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem('profind_user_role')
  localStorage.removeItem('profind_user_name')
  localStorage.removeItem('profind_user_id')
  localStorage.removeItem('profind_user_email')
  localStorage.removeItem('profind_current_user')
  emitAuthChange()
}

const readJson = (key, fallback) => {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getAnalyticsSessionId = () => {
  let sessionId = localStorage.getItem(ANALYTICS_SESSION_KEY)
  if (sessionId) return sessionId
  if (window.crypto?.randomUUID) {
    sessionId = window.crypto.randomUUID()
  } else {
    sessionId = `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
  }
  localStorage.setItem(ANALYTICS_SESSION_KEY, sessionId)
  return sessionId
}

export const storage = {
  cleanupFloorPlans: () => {
    const cleanupFlag = localStorage.getItem('profind_floorplan_cleanup_done')
    if (cleanupFlag) return

    const mediaRaw = localStorage.getItem('profind_virtual_tours')
    if (mediaRaw) {
      const media = JSON.parse(mediaRaw)
      const cleaned = media.filter((item) => item.type !== 'floor_plan')
      localStorage.setItem('profind_virtual_tours', JSON.stringify(cleaned))
    }

    const listingsRaw = localStorage.getItem('profind_listings')
    if (listingsRaw) {
      const listings = JSON.parse(listingsRaw)
      const cleanedListings = listings.map((listing) => {
        const { floorPlanUrl, ...rest } = listing
        return rest
      })
      localStorage.setItem('profind_listings', JSON.stringify(cleanedListings))
    }

    localStorage.setItem('profind_floorplan_cleanup_done', 'true')
  },

  syncAll: async () => {
    const listings = await safeRequest('/api/listings')
    if (listings?.listings) writeJson('profind_listings', listings.listings)

    const me = await safeRequest('/api/auth/me')
    if (!me?.user) {
      clearAuthSession()
      return
    }
    setAuthSession(me.user, me.csrfToken)

    const favorites = await safeRequest('/api/favorites')
    if (favorites?.favorites) writeJson('profind_favorites', favorites.favorites)

    const recent = await safeRequest('/api/recently-viewed')
    if (recent?.recentlyViewed) writeJson('profind_recently_viewed', recent.recentlyViewed)

    const searches = await safeRequest('/api/saved-searches')
    if (searches?.searches) writeJson('profind_saved_searches', searches.searches)

    const preferences = await safeRequest('/api/preferences')
    if (preferences?.preferences) writeJson('profind_user_preferences', preferences.preferences)

    const inquiries = await safeRequest('/api/inquiries')
    if (inquiries?.inquiries) writeJson('profind_inquiries', inquiries.inquiries)

    const conversations = await safeRequest('/api/conversations')
    if (conversations?.conversations) writeJson('profind_conversations', conversations.conversations)

    const alerts = await safeRequest('/api/price-alerts')
    if (alerts?.alerts) writeJson('profind_price_alerts', alerts.alerts)

    const verifications = await safeRequest('/api/agent-verifications')
    if (verifications?.verifications) writeJson('profind_agent_verifications', verifications.verifications)

    const users = await safeRequest('/api/users')
    if (users?.users) writeJson('profind_users', users.users)
  },

  // Auth
  addUser: async (user) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    return data?.user
  },

  sendOtp: async (email, purpose = 'email_verification') =>
    apiRequest('/api/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ email, purpose })
    }),

  verifyOtp: async (email, otp, purpose = 'email_verification') =>
    apiRequest('/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ email, otp, purpose })
    }),

  login: async (email, password) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const serverUser = data?.user
    setAuthSession(serverUser, data?.csrfToken, data?.token)
    await storage.syncAll()
    return serverUser
  },

  logout: async () => {
    await safeRequest('/api/auth/logout', { method: 'POST' })
    clearAuthSession()
  },

  requestPasswordReset: async (email) => {
    return apiRequest('/api/auth/reset-password/request', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  },

  confirmPasswordReset: async (token, newPassword) =>
    apiRequest('/api/auth/reset-password/confirm', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    }),

  subscribeNewsletter: async (email) =>
    apiRequest('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  trackEvent: async (event, metadata = {}) => {
    if (!event) return false
    try {
      await apiRequest('/api/analytics/events', {
        method: 'POST',
        body: JSON.stringify({
          event,
          sessionId: getAnalyticsSessionId(),
          metadata
        })
      })
      return true
    } catch (error) {
      console.error(`Analytics tracking failed for ${event}`, error)
      return false
    }
  },

  getAnalyticsOverview: async () => {
    const data = await apiRequest('/api/analytics/overview')
    return data || { counts: {}, qa: null }
  },

  getAnalyticsTrends: async (days = 14) => {
    const data = await apiRequest(`/api/analytics/trends?days=${Number(days) || 14}`)
    return data || { days: 14, series: [], events: [] }
  },

  // Favorites
  getFavorites: () => readJson('profind_favorites', []),

  addFavorite: (propertyId) => {
    const favorites = storage.getFavorites()
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId)
      writeJson('profind_favorites', favorites)
    }
    void safeRequest('/api/favorites', { method: 'POST', body: JSON.stringify({ propertyId }) })
  },

  removeFavorite: (propertyId) => {
    const favorites = storage.getFavorites()
    const updated = favorites.filter((id) => id !== propertyId)
    writeJson('profind_favorites', updated)
    void safeRequest(`/api/favorites/${propertyId}`, { method: 'DELETE' })
  },

  isFavorite: (propertyId) => storage.getFavorites().includes(propertyId),

  // Recently Viewed
  getRecentlyViewed: () => readJson('profind_recently_viewed', []),

  addRecentlyViewed: (propertyId) => {
    const viewed = storage.getRecentlyViewed()
    const updated = [propertyId, ...viewed.filter((id) => id !== propertyId)].slice(0, 20)
    writeJson('profind_recently_viewed', updated)
    void safeRequest('/api/recently-viewed', { method: 'POST', body: JSON.stringify({ propertyId }) })
  },

  // Saved Searches
  getSavedSearches: () => readJson('profind_saved_searches', []),

  saveSearch: (searchCriteria) => {
    const searches = storage.getSavedSearches()
    const tempId = Date.now()
    const newSearch = { id: tempId, ...searchCriteria, createdAt: new Date().toISOString() }
    searches.push(newSearch)
    writeJson('profind_saved_searches', searches)
    void safeRequest('/api/saved-searches', { method: 'POST', body: JSON.stringify(searchCriteria) }).then((response) => {
      if (!response?.search?.id) return
      const latest = storage.getSavedSearches().map((item) => (item.id === tempId ? response.search : item))
      writeJson('profind_saved_searches', latest)
    })
    return newSearch
  },

  deleteSavedSearch: (searchId) => {
    const searches = storage.getSavedSearches()
    const updated = searches.filter((s) => s.id !== searchId)
    writeJson('profind_saved_searches', updated)
    void safeRequest(`/api/saved-searches/${searchId}`, { method: 'DELETE' })
  },

  notifySavedSearch: async (searchId) => {
    const data = await apiRequest(`/api/saved-searches/${searchId}/notify`, { method: 'POST' })
    return data
  },

  // User preferences
  getUserPreferences: () => readJson('profind_user_preferences', { notifications: true, emailAlerts: true }),

  saveUserPreferences: (preferences) => {
    writeJson('profind_user_preferences', preferences)
    void safeRequest('/api/preferences', { method: 'PUT', body: JSON.stringify(preferences) })
  },

  // Monetization & Payments
  getMonetizationPlans: async () => {
    const data = await apiRequest('/api/monetization/plans')
    return data?.plans || []
  },

  initializePayment: async ({ planCode, listingId, callbackUrl }) =>
    apiRequest('/api/payments/initialize', {
      method: 'POST',
      body: JSON.stringify({ planCode, listingId, callbackUrl })
    }),

  verifyPayment: async (reference) =>
    apiRequest('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ reference })
    }),

  getMyPaymentOrders: async () => {
    const data = await apiRequest('/api/payments/orders/me')
    return data?.orders || []
  },

  getMySubscriptions: async () => {
    const data = await apiRequest('/api/subscriptions/me')
    return data || { activeSubscription: null, subscriptions: [] }
  },

  // Inquiries Management
  getInquiries: () => readJson('profind_inquiries', []),

  addInquiry: async (inquiry) => {
    const response = await apiRequest('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiry)
    })
    const saved = response?.inquiry || {
      id: Date.now(),
      ...inquiry,
      status: 'new',
      createdAt: new Date().toISOString()
    }
    const inquiries = storage.getInquiries()
    inquiries.push(saved)
    writeJson('profind_inquiries', inquiries)
    return saved
  },

  updateInquiryStatus: (inquiryId, status) => {
    const inquiries = storage.getInquiries()
    const updated = inquiries.map((inq) =>
      inq.id === inquiryId ? { ...inq, status, updatedAt: new Date().toISOString() } : inq
    )
    writeJson('profind_inquiries', updated)
    void safeRequest(`/api/inquiries/${inquiryId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
  },

  // Listings Management
  getListings: () => readJson('profind_listings', []),

  getListingById: (id) => storage.getListings().find((listing) => listing.id === id),

  addListing: async (listing) => {
    const listings = storage.getListings()
    const tempId = Date.now()
    const newListing = { ...listing, id: tempId, createdAt: new Date().toISOString(), status: listing.status || 'pending' }
    listings.push(newListing)
    writeJson('profind_listings', listings)
    const response = await safeRequest('/api/listings', { method: 'POST', body: JSON.stringify(listing) })
    if (response?.listing?.id) {
      const updatedListings = storage.getListings().map((item) =>
        item.id === tempId ? { ...response.listing } : item
      )
      writeJson('profind_listings', updatedListings)
      return response.listing
    }
    return newListing
  },

  updateListing: (id, updates) => {
    const listings = storage.getListings()
    const updated = listings.map((listing) =>
      listing.id === id ? { ...listing, ...updates, updatedAt: new Date().toISOString() } : listing
    )
    writeJson('profind_listings', updated)
    void safeRequest(`/api/listings/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
  },

  deleteListing: (id) => {
    const listings = storage.getListings()
    const updated = listings.filter((listing) => listing.id !== id)
    writeJson('profind_listings', updated)
    void safeRequest(`/api/listings/${id}`, { method: 'DELETE' })
  },

  // Listing Analytics
  getListingAnalytics: (listingId) =>
    readJson(`profind_analytics_${listingId}`, { views: 0, inquiries: 0, favorites: 0 }),

  trackListingView: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId)
    analytics.views = (analytics.views || 0) + 1
    analytics.lastViewed = new Date().toISOString()
    writeJson(`profind_analytics_${listingId}`, analytics)
    void safeRequest(`/api/listings/${listingId}/track`, { method: 'POST', body: JSON.stringify({ type: 'view' }) })
  },

  trackListingInquiry: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId)
    analytics.inquiries = (analytics.inquiries || 0) + 1
    writeJson(`profind_analytics_${listingId}`, analytics)
    void safeRequest(`/api/listings/${listingId}/track`, { method: 'POST', body: JSON.stringify({ type: 'inquiry' }) })
  },

  trackListingFavorite: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId)
    analytics.favorites = (analytics.favorites || 0) + 1
    writeJson(`profind_analytics_${listingId}`, analytics)
    void safeRequest(`/api/listings/${listingId}/track`, { method: 'POST', body: JSON.stringify({ type: 'favorite' }) })
  },

  // Price Alerts
  getPriceAlerts: () => readJson('profind_price_alerts', []),

  addPriceAlert: (alert) => {
    const alerts = storage.getPriceAlerts()
    const newAlert = {
      id: Date.now(),
      ...alert,
      active: true,
      createdAt: new Date().toISOString()
    }
    alerts.push(newAlert)
    writeJson('profind_price_alerts', alerts)
    void safeRequest('/api/price-alerts', { method: 'POST', body: JSON.stringify(alert) })
    return newAlert
  },

  deletePriceAlert: (alertId) => {
    const alerts = storage.getPriceAlerts()
    const updated = alerts.filter((a) => a.id !== alertId)
    writeJson('profind_price_alerts', updated)
    void safeRequest(`/api/price-alerts/${alertId}`, { method: 'DELETE' })
  },

  // User Management
  getUsers: () => readJson('profind_users', []),

  getCurrentUser: () => {
    const userId = localStorage.getItem('profind_user_id')
    if (!userId) return null
    const users = storage.getUsers()
    const cached = readJson('profind_current_user', null)
    return users.find((u) => u.id === parseInt(userId)) || cached
  },

  adminGetUsers: async () => {
    const data = await apiRequest('/api/admin/users')
    if (data?.users) writeJson('profind_users', data.users)
    return data?.users || []
  },

  adminUpdateUser: async (userId, updates) => {
    const data = await apiRequest(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
    if (data?.user) {
      const users = storage.getUsers().map((u) => (u.id === data.user.id ? data.user : u))
      writeJson('profind_users', users)
    }
    return data?.user
  },

  adminDeleteUser: async (userId) => {
    await apiRequest(`/api/admin/users/${userId}`, { method: 'DELETE' })
    const users = storage.getUsers().filter((u) => u.id !== userId)
    writeJson('profind_users', users)
  },

  adminResetPassword: async (userId, newPassword) => {
    await apiRequest(`/api/admin/users/${userId}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword })
    })
  },

  adminGetConversations: async () => {
    const data = await apiRequest('/api/admin/conversations')
    writeJson('profind_admin_conversations', data?.conversations || [])
    return data?.conversations || []
  },

  adminGetConversationMessages: async (conversationId) => {
    const data = await apiRequest(`/api/admin/conversations/${conversationId}/messages`)
    return data?.messages || []
  },

  adminGetQaMetrics: async () => {
    const data = await apiRequest('/api/admin/qa')
    return data?.qa || null
  },

  adminGetFunnelMetrics: async () => {
    const data = await apiRequest('/api/admin/analytics/funnel')
    return data?.counts || {}
  },

  adminGetAnalyticsTrends: async (days = 14) => {
    const data = await apiRequest(`/api/admin/analytics/trends?days=${Number(days) || 14}`)
    return data || { days: 14, series: [], events: [] }
  },

  adminGetSystemHealth: async () => {
    const data = await apiRequest('/api/admin/system/health')
    return data || null
  },

  updateUser: (userId, updates) => {
    const users = storage.getUsers()
    const updated = users.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    writeJson('profind_users', updated)
  },

  // Property Comparisons
  getComparisons: () => readJson('profind_comparisons', []),

  addComparison: (propertyIds) => {
    const comparisons = storage.getComparisons()
    const newComparison = {
      id: Date.now(),
      propertyIds,
      createdAt: new Date().toISOString()
    }
    comparisons.push(newComparison)
    writeJson('profind_comparisons', comparisons)
    void safeRequest('/api/comparisons', { method: 'POST', body: JSON.stringify({ propertyIds }) })
    return newComparison
  },

  // Agent Verification
  getAgentVerifications: () => readJson('profind_agent_verifications', []),

  requestAgentVerification: (userId, credentials) => {
    const verifications = storage.getAgentVerifications()
    const newRequest = {
      id: Date.now(),
      userId,
      credentials,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    verifications.push(newRequest)
    writeJson('profind_agent_verifications', verifications)
    void safeRequest('/api/agent-verifications', { method: 'POST', body: JSON.stringify({ credentials }) })
    return newRequest
  },

  verifyAgent: (verificationId, approved) => {
    const verifications = storage.getAgentVerifications()
    const updated = verifications.map((v) => {
      if (v.id === verificationId) {
        return {
          ...v,
          status: approved ? 'approved' : 'rejected',
          reviewedAt: new Date().toISOString()
        }
      }
      return v
    })
    writeJson('profind_agent_verifications', updated)
    void safeRequest(`/api/agent-verifications/${verificationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ approved })
    })
  },

  // In-App Messaging
  getConversations: (userId) => {
    const conversations = readJson('profind_conversations', [])
    return conversations.filter((c) => c.participantIds?.includes(userId))
  },

  getOrCreateConversation: async (userId1, userId2, propertyId = null) => {
    const conversations = readJson('profind_conversations', [])
    const existing = conversations.find(
      (c) =>
        c.participantIds?.includes(userId1) &&
        c.participantIds?.includes(userId2) &&
        (!propertyId || c.propertyId === propertyId)
    )
    if (existing) return existing

    const response = await safeRequest('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({ participantId: userId2, propertyId })
    })

    const serverConv = response?.conversation
    const newConv = serverConv || {
      id: Date.now(),
      participantIds: [userId1, userId2],
      propertyId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    conversations.push(newConv)
    writeJson('profind_conversations', conversations)
    return newConv
  },

  addMessage: (conversationId, message) => {
    const conversations = readJson('profind_conversations', [])
    const conv = conversations.find((c) => c.id === conversationId)
    if (!conv) return null
    const newMessage = {
      id: Date.now(),
      ...message,
      createdAt: new Date().toISOString()
    }
    conv.messages = conv.messages || []
    conv.messages.push(newMessage)
    conv.updatedAt = new Date().toISOString()
    writeJson('profind_conversations', conversations)
    void safeRequest(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ text: message.text })
    })
    return newMessage
  },

  // Agent Ratings & Reviews
  getAgentReviews: (agentId) => {
    const reviews = readJson('profind_agent_reviews', [])
    return reviews.filter((r) => r.agentId === agentId)
  },

  addAgentReview: (review) => {
    const reviews = readJson('profind_agent_reviews', [])
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString()
    }
    reviews.push(newReview)
    writeJson('profind_agent_reviews', reviews)
    void safeRequest(`/api/agents/${review.agentId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        rating: review.rating,
        comment: review.comment,
        propertyId: review.propertyId
      })
    })
    return newReview
  },

  // Virtual Tours
  addVirtualTour: (propertyId, tourUrl) => {
    const tours = readJson('profind_virtual_tours', [])
    const newTour = {
      id: Date.now(),
      propertyId,
      tourUrl,
      type: 'virtual_tour',
      createdAt: new Date().toISOString()
    }
    tours.push(newTour)
    writeJson('profind_virtual_tours', tours)
    void safeRequest('/api/virtual-tours', { method: 'POST', body: JSON.stringify({ propertyId, tourUrl }) })
    return newTour
  },

  getPropertyMedia: (propertyId) => {
    const media = readJson('profind_virtual_tours', [])
    return media.filter((m) => m.propertyId === propertyId)
  }
}
