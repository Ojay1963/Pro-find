import React, { useState } from 'react'
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useI18n } from '../contexts/I18nContext'
import { storage } from '../utils/localStorage'

export default function Contact() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setIsSubmitting(true)
    try {
      await storage.addInquiry({
        propertyTitle: t('contactSection.generalContact', 'General Contact'),
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        preferredContact: formData.phone ? 'phone' : 'email',
        type: 'general'
      })
      toast.success(t('contactSection.toastSuccess', 'Message sent successfully!'))
      setSuccessMessage(t('contactSection.successMessage', 'Thanks! Your message was sent successfully.'))
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error(error.message || t('contactSection.toastError', 'Failed to send message. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-section" className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">{t('contactSection.badge', 'Contact')}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700">{t('contactSection.title', 'Get In Touch')}</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            {t(
              'contactSection.subtitle',
              'Have questions? We would love to hear from you. Send us a message and we will respond quickly.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {successMessage && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('contactSection.form.firstName', 'First Name')} *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg input-spotlight"
                  placeholder={t('contactSection.form.firstNamePlaceholder', 'John')}
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('contactSection.form.lastName', 'Last Name')} *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg input-spotlight"
                  placeholder={t('contactSection.form.lastNamePlaceholder', 'Doe')}
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('contactSection.form.email', 'Email')} *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg input-spotlight"
                  placeholder={t('contactSection.form.emailPlaceholder', 'john@example.com')}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('contactSection.form.phone', 'Phone')}</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border rounded-lg input-spotlight"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('contactSection.form.message', 'Message')} *</label>
              <textarea
                className="w-full px-4 py-3 border rounded-lg min-h-32 input-spotlight"
                placeholder={t('contactSection.form.messagePlaceholder', 'Tell us about your property needs...')}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? t('contactSection.form.sending', 'Sending...') : t('contactSection.form.send', 'Send Message')}
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-green-700">{t('contactSection.info.title', 'Contact Information')}</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <p className="text-gray-500">{t('contactSection.info.phone', 'Phone')}</p>
                    <p className="font-medium">+234 800 000 0000</p>
                    <p className="font-medium">+234 700 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <FaEnvelope />
                  </span>
                  <div>
                    <p className="text-gray-500">{t('contactSection.info.email', 'Email')}</p>
                    <p className="font-medium">support@profind.ng</p>
                    <p className="font-medium">info@profind.ng</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p className="text-gray-500">{t('contactSection.info.address', 'Address')}</p>
                    <p className="font-medium">123 Profind Avenue</p>
                    <p className="font-medium">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <span className="block text-gray-500 text-sm mb-2">{t('contactSection.info.social', 'Social')}</span>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
                    { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
                    { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
                    { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn }
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                    >
                      <item.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow-sm border border-emerald-100">
              <h3 className="text-lg font-semibold mb-4 text-green-700">{t('contactSection.hours.title', 'Office Hours')}</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('contactSection.hours.weekdays', 'Monday - Friday')}</span>
                  <span>{t('contactSection.hours.weekdaysTime', '9:00 AM - 6:00 PM')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contactSection.hours.saturday', 'Saturday')}</span>
                  <span>{t('contactSection.hours.saturdayTime', '10:00 AM - 4:00 PM')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contactSection.hours.sunday', 'Sunday')}</span>
                  <span className="text-gray-400">{t('contactSection.hours.closed', 'Closed')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
