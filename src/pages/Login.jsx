import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate credentials
    const users = storage.getUsers()
    const user = users.find(u => u.email === formData.email && u.password === formData.password)

    if (user) {
      // Set current user session
      localStorage.setItem('profind_user_role', user.role)
      localStorage.setItem('profind_user_name', user.name)
      localStorage.setItem('profind_user_id', user.id)
      localStorage.setItem('profind_user_email', user.email)

      toast.success('Login successful!')
      navigate('/dashboard')
    } else {
      toast.error('Invalid email or password. Please try again.')
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

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="text-white space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-green-100">
              Secure access
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Sign in to manage your property journey with confidence.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl">
              Track saved homes, schedule viewings, and connect with verified agents across Nigeria.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { label: 'Verified Listings', value: '1,200+' },
                { label: 'Trusted Agents', value: '340+' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-green-700 tracking-wide">PROFIND</h1>
                <h2 className="text-xl font-semibold mt-3">Sign In</h2>
                <p className="text-gray-600 text-sm">Welcome back! Please sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white input-spotlight"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-green-600" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link to="/reset-password" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-600 hover:underline font-semibold">
                      Create Account
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

export default Login

