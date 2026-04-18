import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { useI18n } from '../contexts/I18nContext'
import { storage } from '../utils/localStorage'

export default function Footer() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    if (!email.trim()) {
      toast.error(t('footer.newsletter.required', 'Please enter your email to subscribe.'))
      return
    }
    try {
      setIsSubmitting(true)
      await storage.subscribeNewsletter(email.trim())
      toast.success(t('footer.newsletter.success', 'Thanks for subscribing!'))
      setEmail('')
    } catch (error) {
      toast.error(error.message || t('footer.newsletter.error', 'Unable to subscribe right now.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="site-footer mt-12 hidden w-full bg-gray-900 pb-8 pt-16 text-white md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-green-400 mb-2 block">PROFIND</span>
            <p className="text-gray-400 mb-4 text-sm">
              {t('footer.tagline', 'Your trusted partner in finding the perfect property. Making dreams come true since 2009.')}
            </p>
            <div className="flex gap-3 mt-3">
              <a
                href="https://facebook.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('footer.quickLinks.title', 'Quick Links')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.quickLinks.home', 'Home')}</Link></li>
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.quickLinks.properties', 'Properties')}</Link></li>
              <li><Link to="/about" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.quickLinks.about', 'About Us')}</Link></li>
              <li><Link to="/services" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.quickLinks.services', 'Services')}</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.quickLinks.contact', 'Contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('footer.services.title', 'Services')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.services.buy', 'Buy Property')}</Link></li>
              <li><Link to="/create-listing" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.services.sell', 'Sell Property')}</Link></li>
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.services.rent', 'Rent Property')}</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.services.management', 'Property Management')}</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">{t('footer.services.consulting', 'Consulting')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('footer.newsletter.title', 'Newsletter')}</h4>
            <p className="text-gray-400 text-sm mb-2">{t('footer.newsletter.subtitle', 'Subscribe to get the latest property updates')}</p>
            <form className="flex flex-col md:flex-col lg:flex-row gap-2 w-full" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="px-3 py-2 rounded bg-gray-800 text-white text-sm border-none focus:ring-2 focus:ring-green-400 w-full"
                placeholder={t('footer.newsletter.placeholder', 'Your email')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-4 py-2 text-sm w-full lg:w-auto lg:mt-0"
              >
                {isSubmitting ? t('footer.newsletter.loading', 'Subscribing...') : t('footer.newsletter.button', 'Subscribe')}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
          {t('footer.legal', '© 2026 Profind. All rights reserved. | Privacy Policy | Terms of Service')}
        </div>
      </div>
    </footer>
  )
}
