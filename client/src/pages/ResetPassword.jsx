import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storage } from '../utils/localStorage'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useI18n } from '../contexts/I18nContext'

const ResetPassword = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenFromLink = searchParams.get('token') || ''
  const [formData, setFormData] = useState({
    email: '',
    token: tokenFromLink,
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.token && formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error(t('resetPage.errors.passwordsNoMatch', 'Passwords do not match.'))
          return
        }
        await storage.confirmPasswordReset(formData.token, formData.newPassword)
        toast.success(t('resetPage.toast.updated', 'Password updated successfully. You can now sign in.'))
        navigate('/login')
      } else {
        await storage.requestPasswordReset(formData.email)
        toast.success(t('resetPage.toast.sent', 'If the account exists, a reset link has been sent.'))
        navigate('/reset-password/check-email', {
          state: { email: formData.email.trim().toLowerCase() }
        })
      }
    } catch (error) {
      toast.error(error.message || t('resetPage.errors.generic', 'Unable to process password reset request.'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700">PROFIND</h1>
            <h2 className="text-xl font-bold mt-4">{t('resetPage.title', 'Reset Password')}</h2>
            <p className="text-gray-600">
              {formData.token
                ? t('resetPage.subtitleWithToken', 'Enter your new password')
                : t('resetPage.subtitleWithoutToken', 'Enter your email to receive a reset link')}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            {formData.token ? (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">{t('resetPage.form.newPassword', 'New Password')}</label>
                  <input
                    type="password"
                    className="w-full pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">{t('resetPage.form.confirmPassword', 'Confirm Password')}</label>
                  <input
                    type="password"
                    className="w-full pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-gray-700 mb-2">{t('resetPage.form.email', 'Email Address')}</label>
                <input
                  type="email"
                  placeholder={t('resetPage.form.emailPlaceholder', 'example@email.com')}
                  className="w-full pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {formData.token
                ? t('resetPage.form.updatePassword', 'Update Password')
                : t('resetPage.form.sendResetLink', 'Send Reset Link')}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPassword
