import React, { useState } from 'react'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBuilding, FaUserTie, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'
import { useI18n } from '../contexts/I18nContext'

const CAC_NUMBER_REGEX = /^(RC|BN|IT)\d{7}$/i
const CAC_NUMBER_HINT = 'Use RC, BN, or IT followed by 7 digits, for example RC1234567.'
const PHONE_NUMBER_REGEX = /^\d{11}$/

const Register = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const registerSchema = z
    .object({
      name: z.string().min(1, t('registerPage.errors.fullNameRequired', 'Full name is required')),
      email: z.string().email(t('registerPage.errors.validEmail', 'Enter a valid email address')),
      password: z.string().min(6, t('registerPage.errors.passwordMin', 'Password must be at least 6 characters')),
      confirmPassword: z.string().min(1, t('registerPage.errors.confirmPasswordRequired', 'Please confirm your password')),
      phone: z.string().min(1, t('registerPage.errors.phoneRequired', 'Phone number is required')),
      role: z.enum(['seeker', 'owner', 'agent']),
      cacNumber: z.string().optional(),
      companyName: z.string().optional()
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: t('registerPage.errors.passwordsNoMatch', 'Passwords do not match')
        })
      }

      if (!PHONE_NUMBER_REGEX.test(String(data.phone || '').trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['phone'],
          message: t('registerPage.errors.phoneFormat', 'Phone number must be exactly 11 digits')
        })
      }

      const cacNumber = String(data.cacNumber || '').trim().toUpperCase()

      if (data.role === 'agent' && !cacNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cacNumber'],
          message: t('registerPage.errors.cacRequired', 'CAC number is required for agents')
        })
      } else if (data.role === 'agent' && !CAC_NUMBER_REGEX.test(cacNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cacNumber'],
          message: t('registerPage.errors.cacFormat', CAC_NUMBER_HINT)
        })
      }

      if (data.role === 'agent' && !String(data.companyName || '').trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['companyName'],
          message: t('registerPage.errors.companyNameRequired', 'Company name is required for agents')
        })
      }
    })
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'seeker',
    cacNumber: '', // For agents
    companyName: '' // For agents
  }
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const result = registerSchema.safeParse(formData)
    if (result.success) {
      setErrors({})
      return true
    }

    const newErrors = {}
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]
      if (field && !newErrors[field]) {
        newErrors[field] = issue.message
      }
    })

    setErrors(newErrors)
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    
    if (validateForm()) {
      setIsSubmitting(true)
      // Save user data
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // In real app, hash this
        phone: formData.phone,
        role: formData.role,
        ...(formData.role === 'agent' && {
          cacNumber: formData.cacNumber.trim().toUpperCase(),
          companyName: formData.companyName,
          verified: false
        })
      };
      
      try {
        await storage.addUser(userData)
        void storage.sendOtp(formData.email, 'email_verification')
          .then(() => {
            toast.success(t('registerPage.toast.success', 'Account created. OTP sent to your email.'))
          })
          .catch((otpError) => {
            toast.error(otpError.message || 'Account created, but OTP could not be sent. Try resend on the next page.')
          })
        setFormData(initialFormData)
        setErrors({})
        navigate('/verify-otp', { state: { email: formData.email } })
      } catch (error) {
        toast.error(error.message || t('registerPage.toast.error', 'Registration failed. Please try again.'))
      } finally {
        setIsSubmitting(false)
      }
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

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-16 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="text-white space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-green-100">
              {t('registerPage.badge', 'Get started')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              {t('registerPage.heroTitle', 'Join Profind to list, discover, and manage properties faster.')}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl">
              {t('registerPage.heroText', 'Whether you are a buyer, owner, or agent, Profind gives you verified listings, smarter search, and trusted connections across Nigeria.')}
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { label: t('registerPage.stats.cities', 'Cities Covered'), value: '30+' },
                { label: t('registerPage.stats.viewings', 'Monthly Viewings'), value: '2,800+' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 text-sm text-slate-200">
              {[
                t('registerPage.bullets.verified', 'Get verified listings and agent support.'),
                t('registerPage.bullets.track', 'Track favorites and schedule viewings.'),
                t('registerPage.bullets.list', 'List faster with guided property tools.')
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <div className="rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-lg p-6 sm:p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-green-700 tracking-wide">PROFIND</h1>
                <h2 className="text-xl font-semibold mt-3">{t('registerPage.title', 'Create Your Account')}</h2>
                <p className="text-gray-600 text-sm">{t('registerPage.subtitle', "Join Nigeria's premier real estate platform")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'seeker'})}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                      formData.role === 'seeker'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaHome />
                    <span>{t('registerPage.roles.seeker', 'Property Seeker')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({...formData, role: 'owner'})
                      if (errors.role) setErrors({...errors, role: ''})
                    }}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                      formData.role === 'owner'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaBuilding />
                    <span>{t('registerPage.roles.owner', 'Property Owner')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({...formData, role: 'agent'})
                      if (errors.role) setErrors({...errors, role: ''})
                    }}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                      formData.role === 'agent'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaUserTie />
                    <span>{t('registerPage.roles.agent', 'Real Estate Agent')}</span>
                  </button>
                </div>
                {errors.role && <p className="text-red-500 text-sm -mt-3 mb-3">{errors.role}</p>}

                <div>
                  <label className="block text-gray-700 mb-2">{t('registerPage.form.fullName', 'Full Name')}</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="off"
                      placeholder={t('registerPage.form.fullNamePlaceholder', 'Enter your full name')}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value})
                        if (errors.name) setErrors({...errors, name: ''})
                      }}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('registerPage.form.email', 'Email Address')}</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder={t('registerPage.form.emailPlaceholder', 'example@email.com')}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value})
                        if (errors.email) setErrors({...errors, email: ''})
                      }}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('registerPage.form.phone', 'Phone Number')}</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="off"
                      placeholder={t('registerPage.form.phonePlaceholder', '0803 123 4567')}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.phone}
                      onChange={(e) => {
                        const phone = e.target.value.replace(/\D/g, '').slice(0, 11)
                        setFormData({...formData, phone})
                        if (errors.phone) setErrors({...errors, phone: ''})
                      }}
                      inputMode="numeric"
                      maxLength={11}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">{t('registerPage.form.password', 'Password')}</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder={t('registerPage.form.passwordPlaceholder', '********')}
                        className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({...formData, password: e.target.value})
                          if (errors.password) setErrors({...errors, password: ''})
                        }}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                        aria-label={showPassword ? t('registerPage.form.hidePassword', 'Hide password') : t('registerPage.form.showPassword', 'Show password')}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">{t('registerPage.form.confirmPassword', 'Confirm Password')}</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder={t('registerPage.form.confirmPasswordPlaceholder', '********')}
                        className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({...formData, confirmPassword: e.target.value})
                          if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''})
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        tabIndex={-1}
                        aria-label={showConfirmPassword ? t('registerPage.form.hidePassword', 'Hide password') : t('registerPage.form.showPassword', 'Show password')}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {formData.role === 'agent' && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">{t('registerPage.form.cacNumber', 'CAC Number')}</label>
                      <input
                        type="text"
                        placeholder={t('registerPage.form.cacNumberPlaceholder', 'RC1234567')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                          errors.cacNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.cacNumber}
                        onChange={(e) => {
                          setFormData({...formData, cacNumber: e.target.value.toUpperCase()})
                          if (errors.cacNumber) setErrors({...errors, cacNumber: ''})
                        }}
                        maxLength={9}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {t('registerPage.form.cacNumberHint', CAC_NUMBER_HINT)}
                      </p>
                      {errors.cacNumber && <p className="text-red-500 text-sm mt-1">{errors.cacNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">{t('registerPage.form.companyName', 'Company Name')}</label>
                      <input
                        type="text"
                        placeholder={t('registerPage.form.companyNamePlaceholder', 'Your real estate company')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight ${
                          errors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.companyName}
                        onChange={(e) => {
                          setFormData({...formData, companyName: e.target.value})
                          if (errors.companyName) setErrors({...errors, companyName: ''})
                        }}
                        required={formData.role === 'agent'}
                      />
                      {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('registerPage.form.creating', 'Creating Account...') : t('registerPage.form.create', 'Create Account')}
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    {t('registerPage.form.haveAccount', 'Already have an account?')}{' '}
                    <Link to="/login" className="text-green-600 hover:underline font-semibold cursor-pointer">
                      {t('registerPage.form.signIn', 'Sign In')}
                    </Link>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 text-center mb-3">
                    {t('registerPage.follow', 'Follow us')}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
                      { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
                      { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
                      { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        target="_blank"
                        rel="noreferrer"
                        className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                      >
                        <item.icon />
                      </a>
                    ))}
                  </div>
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

export default Register
