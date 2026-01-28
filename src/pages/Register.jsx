import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBuilding, FaUserTie, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'seeker',
    licenseNumber: '', // For agents
    companyName: '' // For agents
  }
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Save user data
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // In real app, hash this
        phone: formData.phone,
        role: formData.role,
        ...(formData.role === 'agent' && {
          licenseNumber: formData.licenseNumber,
          companyName: formData.companyName,
          verified: false
        })
      };
      
      storage.addUser(userData);
      toast.success('Account created successfully! Please check your email to verify your account.');
      // In a real app, send verification email here
      setFormData(initialFormData)
      setErrors({})
      navigate('/registration-success')
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
              Get started
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Join Profind to list, discover, and manage properties faster.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl">
              Whether you are a buyer, owner, or agent, Profind gives you verified listings, smarter search,
              and trusted connections across Nigeria.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { label: 'Cities Covered', value: '30+' },
                { label: 'Monthly Viewings', value: '2,800+' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 text-sm text-slate-200">
              {[
                'Get verified listings and agent support.',
                'Track favorites and schedule viewings.',
                'List faster with guided property tools.'
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
                <h2 className="text-xl font-semibold mt-3">Create Your Account</h2>
                <p className="text-gray-600 text-sm">Join Nigeria's premier real estate platform</p>
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
                    <span>Property Seeker</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'owner'})}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                      formData.role === 'owner'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaBuilding />
                    <span>Property Owner</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'agent'})}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                      formData.role === 'agent'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaUserTie />
                    <span>Real Estate Agent</span>
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="off"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="example@email.com"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="off"
                      placeholder="0803 123 4567"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder="********"
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
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder="********"
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
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
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
                      <label className="block text-gray-700 mb-2">License Number</label>
                      <input
                        type="text"
                        placeholder="Enter your real estate license number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Company Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="Your real estate company"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Create Account
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 hover:underline font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 text-center mb-3">
                    Follow us
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
