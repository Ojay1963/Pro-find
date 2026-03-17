import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'
import { useI18n } from '../contexts/I18nContext'

const formatNaira = (kobo) => `NGN ${(Number(kobo || 0) / 100).toLocaleString()}`
const allowedRoles = new Set(['agent', 'owner'])

const Upgrade = () => {
  const { t } = useI18n()
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
      toast.error(error.message || t('upgradePage.loadError', 'Failed to load pricing'))
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
        toast.success(t('upgradePage.paymentVerified', 'Payment verified successfully.'))
        await loadData()
      } catch (error) {
        toast.error(error.message || t('upgradePage.verifyError', 'Could not verify payment yet.'))
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
      toast.error(t('upgradePage.roleError', 'Only agents and property owners can purchase plans.'))
      return
    }

    let listingId
    if (plan.type === 'featured_boost') {
      listingId = Number(selectedListings[plan.code])
      if (!Number.isFinite(listingId)) {
        toast.error(t('upgradePage.selectListing', 'Select a listing before continuing.'))
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
        throw new Error(t('upgradePage.checkoutError', 'Could not start checkout'))
      }
      window.location.href = response.authorizationUrl
    } catch (error) {
      toast.error(error.message || t('upgradePage.paymentInitFailed', 'Payment initialization failed'))
      setProcessingPlan('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('upgradePage.title', 'Upgrade and Promote')}</h1>
          <p className="text-gray-600">{t('upgradePage.subtitle', 'Buy your monthly subscription or boost your listings with Paystack.')}</p>
          <Link to="/dashboard" className="inline-block mt-3 text-green-700 hover:underline">
            {t('upgradePage.backToDashboard', 'Back to dashboard')}
          </Link>
        </div>

        {subscriptions?.activeSubscription && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-800">{t('upgradePage.activeSubscription', 'Active subscription')}</p>
            <p className="text-sm text-green-700">
              {t('upgradePage.plan', 'Plan')}: {subscriptions.activeSubscription.planCode} | {t('upgradePage.ends', 'Ends')}:{' '}
              {new Date(subscriptions.activeSubscription.endsAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {userRole === 'agent'
                ? t('upgradePage.agentBadgeActive', 'Your agent verified badge is active.')
                : t('upgradePage.ownerSubscriptionActive', 'Your owner subscription is active.')}
            </p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl p-6 border border-gray-200">{t('upgradePage.loadingPlans', 'Loading plans...')}</div>
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
                      ? t('upgradePage.agentSubscription', 'Agent Subscription')
                      : plan.type === 'owner_subscription'
                        ? t('upgradePage.ownerSubscription', 'Owner Subscription')
                        : t('upgradePage.featuredBoost', 'Featured Boost')}
                  </p>
                  <h2 className="text-xl font-bold mt-2">{plan.name}</h2>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                  <p className="text-2xl font-bold text-green-700 mt-4">{formatNaira(plan.priceKobo)}</p>
                  <p className="text-sm text-gray-500 mt-1">{plan.durationDays} {t('upgradePage.dayAccess', 'day access')}</p>

                  {plan.type === 'featured_boost' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('upgradePage.selectListingToBoost', 'Select listing to boost')}</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                        value={selectedListings[plan.code] || ''}
                        onChange={(event) =>
                          setSelectedListings((prev) => ({ ...prev, [plan.code]: event.target.value }))
                        }
                      >
                        <option value="">{t('upgradePage.chooseListing', 'Choose a listing')}</option>
                        {myListings.map((listing) => (
                          <option key={listing.id} value={listing.id}>
                            {listing.title || `Listing ${listing.id}`}
                          </option>
                        ))}
                      </select>
                      {myListings.length === 0 && (
                        <p className="text-xs text-amber-700 mt-2">
                          {t('upgradePage.needListing', 'You need at least one listing before using a featured boost.')}
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
                        ? (isAgentPlan ? t('upgradePage.agentsOnly', 'Agents only') : isOwnerPlan ? t('upgradePage.ownersOnly', 'Owners only') : t('upgradePage.ownersAgentsOnly', 'Owners/agents only'))
                        : t('upgradePage.createListingFirst', 'Create a listing first')
                      : processingPlan === plan.code
                        ? t('upgradePage.redirecting', 'Redirecting...')
                        : t('upgradePage.payWithPaystack', 'Pay with Paystack')}
                  </button>
                </div>
              )
            })}
            {visiblePlans.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm lg:col-span-2">
                <p className="font-semibold text-gray-800">{t('upgradePage.noPlans', 'No plans available right now.')}</p>
                <p className="text-sm text-gray-600 mt-1">{t('upgradePage.noPlansText', 'Please check back shortly or contact support.')}</p>
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
