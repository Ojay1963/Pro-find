import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useI18n } from '../contexts/I18nContext'

const ResetPasswordCheckEmail = () => {
  const { t } = useI18n()
  const location = useLocation()
  const email = location.state?.email || ''

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center pb-12 pt-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-green-700">PROFIND</h1>
          <h2 className="text-xl font-bold mt-4">
            {t('resetCheckEmail.title', 'Check your email')}
          </h2>
          <p className="text-gray-600 mt-3">
            {email
              ? t(
                  'resetCheckEmail.bodyWithEmail',
                  `We sent a password reset link to ${email}. Open your inbox and follow the link to continue.`
                )
              : t(
                  'resetCheckEmail.body',
                  'If the account exists, a password reset link has been sent. Open your inbox and follow the link to continue.'
                )}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            {t('resetCheckEmail.tip', 'If you do not see it, check your spam or promotions folder.')}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {t('resetCheckEmail.backToLogin', 'Back to login')}
            </Link>
            <Link
              to="/reset-password"
              className="w-full border border-green-600 text-green-700 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              {t('resetCheckEmail.tryAgain', 'Send another reset link')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPasswordCheckEmail
