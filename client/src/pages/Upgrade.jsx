import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'

const formatNaira = (kobo) => `NGN ${(Number(kobo || 0) / 100).toLocaleString()}`
const allowedRoles = new Set(['agent', 'owner'])

const Upgrade = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [plans, setPlans] = useState([])
  const [subscriptions, setSubscriptions] = useState({ activeSubscription: null, subscriptions: [] })
  const [selectedListings, setSelectedListings] = useState({})
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState('')
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser())

  const userId = currentUser?.id || Number(localStorage.getItem('profind_user_id') || 0)
  const userRole = currentUser?.role || localStorage.getItem('profind_user_role') || 'seeker'

  const myListings = useMemo(() => {
    const all = storage.getListings()
    if (!userId) return []
    return all.filter((listing) => listing.ownerId === userId)
  }, [userId])

  const hasActiveSubscription = useMemo(() => {
    const active = subscriptions?.activeSubscription
    if (!active) return false
    return new Date(active.endsAt).getTime() > Date.now()
  }, [subscriptions])

  const visiblePlans = useMemo(() => {
    return plans
      .filter((plan) => {
        if (plan.type === 'agent_subscription') return userRole === 'agent'
        if (plan.type === 'owner_subscription') return userRole === 'owner'
        if (plan.type === 'featured_boost') return userRole === 'agent' || userRole === 'owner' || userRole === 'admin'
        return false
      })
      .filter((plan) => {
        if (!hasActiveSubscription) return true
        if (plan.type === 'agent_subscription') return false
        if (plan.type === 'owner_subscription') return false
        return true
      })
  }, [plans, hasActiveSubscription, userRole])

  const loadData = async () => {
    setLoading(true)
    try {
      void storage.syncAll()
      const [loadedPlans, subInfo] = await Promise.all([
        storage.getMonetizationPlans(),
        storage.getMySubscriptions()
      ])
      setPlans(Array.isArray(loadedPlans) ? loadedPlans : [])
      setSubscriptions(subInfo || { activeSubscription: null, subscriptions: [] })
    } catch (error) {
      toast.error(error.message || 'Failed to load pricing')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const syncUser = () => setCurrentUser(storage.getCurrentUser())
    window.addEventListener('profind-auth-changed', syncUser)
    return () => window.removeEventListener('profind-auth-changed', syncUser)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const reference = params.get('reference') || params.get('trxref')
    if (!reference) return

    const verify = async () => {
      try {
        await storage.verifyPayment(reference)
        void storage.trackEvent('payment_verified', { reference })
        toast.success('Payment verified successfully.')
        await loadData()
      } catch (error) {
        toast.error(error.message || 'Could not verify payment yet.')
      } finally {
        navigate('/upgrade', { replace: true })
      }
    }

    void verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, navigate])

  const handleBuyPlan = async (plan) => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    if (!allowedRoles.has(userRole)) {
      toast.error('Only agents and property owners can purchase plans.')
      return
    }

    let listingId
    if (plan.type === 'featured_boost') {
      listingId = Number(selectedListings[plan.code])
      if (!Number.isFinite(listingId)) {
        toast.error('Select a listing before continuing.')
        return
      }
    }

    setProcessingPlan(plan.code)
    try {
      const callbackUrl = `${window.location.origin}/upgrade`
      void storage.trackEvent('payment_started', {
        planCode: plan.code,
        planType: plan.type,
        listingId: listingId || null
      })
      const response = await storage.initializePayment({
        planCode: plan.code,
        listingId,
        callbackUrl
      })
      if (!response?.authorizationUrl) {
        throw new Error('Could not start checkout')
      }
      window.location.href = response.authorizationUrl
    } catch (error) {
      toast.error(error.message || 'Payment initialization failed')
      setProcessingPlan('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Upgrade and Promote</h1>
          <p className="text-gray-600">Buy your monthly subscription or boost your listings with Paystack.</p>
          <Link to="/dashboard" className="inline-block mt-3 text-green-700 hover:underline">
            Back to dashboard
          </Link>
        </div>

        {subscriptions?.activeSubscription && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-800">Active subscription</p>
            <p className="text-sm text-green-700">
              Plan: {subscriptions.activeSubscription.planCode} | Ends:{' '}
              {new Date(subscriptions.activeSubscription.endsAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {userRole === 'agent'
                ? 'Your agent verified badge is active.'
                : 'Your owner subscription is active.'}
            </p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl p-6 border border-gray-200">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {visiblePlans.map((plan) => {
              const isAgentPlan = plan.type === 'agent_subscription'
              const isOwnerPlan = plan.type === 'owner_subscription'
              const roleBlocked =
                (isAgentPlan && userRole !== 'agent') ||
                (isOwnerPlan && userRole !== 'owner') ||
                (plan.type === 'featured_boost' && !['agent', 'owner', 'admin'].includes(userRole))
              const listingBlocked = plan.type === 'featured_boost' && myListings.length === 0
              const blocked = roleBlocked || listingBlocked
              return (
                <div key={plan.code} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {plan.type === 'agent_subscription'
                      ? 'Agent Subscription'
                      : plan.type === 'owner_subscription'
                        ? 'Owner Subscription'
                        : 'Featured Boost'}
                  </p>
                  <h2 className="text-xl font-bold mt-2">{plan.name}</h2>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                  <p className="text-2xl font-bold text-green-700 mt-4">{formatNaira(plan.priceKobo)}</p>
                  <p className="text-sm text-gray-500 mt-1">{plan.durationDays} day access</p>

                  {plan.type === 'featured_boost' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select listing to boost</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        value={selectedListings[plan.code] || ''}
                        onChange={(event) =>
                          setSelectedListings((prev) => ({ ...prev, [plan.code]: event.target.value }))
                        }
                      >
                        <option value="">Choose a listing</option>
                        {myListings.map((listing) => (
                          <option key={listing.id} value={listing.id}>
                            {listing.title || `Listing ${listing.id}`}
                          </option>
                        ))}
                      </select>
                      {myListings.length === 0 && (
                        <p className="text-xs text-amber-700 mt-2">
                          You need at least one listing before using a featured boost.
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={blocked || processingPlan === plan.code}
                    onClick={() => handleBuyPlan(plan)}
                    className="mt-5 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {blocked
                      ? roleBlocked
                        ? (isAgentPlan ? 'Agents only' : isOwnerPlan ? 'Owners only' : 'Owners/agents only')
                        : 'Create a listing first'
                      : processingPlan === plan.code
                        ? 'Redirecting...'
                        : 'Pay with Paystack'}
                  </button>
                </div>
              )
            })}
            {visiblePlans.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm lg:col-span-2">
                <p className="font-semibold text-gray-800">No plans available right now.</p>
                <p className="text-sm text-gray-600 mt-1">Please check back shortly or contact support.</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Upgrade
