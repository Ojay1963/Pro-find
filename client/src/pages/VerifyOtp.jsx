import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import { useI18n } from '../contexts/I18nContext'

const VerifyOtp = () => {
  const { t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const emailFromState = location.state?.email || ''

  const [email, setEmail] = useState(emailFromState)
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (!emailFromState) return
    setEmail(emailFromState)
  }, [emailFromState])

  const handleVerify = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    if (!email.trim()) return toast.error('Email is required')
    if (!/^\d{6}$/.test(otp)) return toast.error('Enter the 6-digit OTP code')

    setIsSubmitting(true)
    try {
      await storage.verifyOtp(email.trim(), otp.trim(), 'email_verification')
      toast.success('Email verified successfully. Please sign in.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'OTP verification failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (isResending) return
    if (!email.trim()) return toast.error('Enter your email to resend OTP')
    setIsResending(true)
    try {
      await storage.sendOtp(email.trim(), 'email_verification')
      toast.success('OTP has been resent to your email.')
    } catch (error) {
      toast.error(error.message || 'Could not resend OTP')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-emerald-950/60" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-16 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="text-white space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-green-100">
              {t('verifyOtp.badge', 'One more step')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              {t('verifyOtp.heroTitle', 'Verify your email to activate your Profind account.')}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl">
              {t('verifyOtp.heroText', 'Enter the 6-digit code sent to your inbox. This keeps your account secure and trusted.')}
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-green-700 tracking-wide">PROFIND</h1>
                <h2 className="text-xl font-semibold mt-3">{t('verifyOtp.title', 'Verify OTP')}</h2>
                <p className="text-gray-600 text-sm">{t('verifyOtp.subtitle', 'Check your email for the verification code')}</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">{t('verifyOtp.email', 'Email Address')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('verifyOtp.code', '6-digit OTP Code')}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white tracking-[0.35em] text-center text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-70"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="w-full border border-green-600 text-green-700 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold disabled:opacity-70"
                >
                  {isResending ? 'Resending...' : 'Resend OTP'}
                </button>

                <div className="text-center text-sm text-gray-600">
                  <p>
                    {t('verifyOtp.hasAccount', 'Already verified?')}{' '}
                    <Link to="/login" className="text-green-600 hover:underline font-semibold">
                      {t('verifyOtp.login', 'Sign in')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VerifyOtp
