import React, { useState } from 'react';
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { storage } from '../utils/localStorage';
import { useI18n } from '../contexts/I18nContext';

export default function ScheduleViewingForm({
  propertyId,
  propertyTitle,
  agentId = null,
  agentName = 'Property Agent',
  inquiryType = 'viewing',
  title,
  subtitle,
  submitLabel,
  initialMessage = ''
}) {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: initialMessage
  });
  const heading = title || t('propertyDetailsPage.schedule.title', 'Schedule a Viewing');
  const helperText = subtitle || t('propertyDetailsPage.schedule.subtitle', 'Book a time to visit this property in person.');
  const actionLabel = submitLabel || t('propertyDetailsPage.schedule.submit', 'Schedule Viewing');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save inquiry
    const inquiry = {
      propertyId,
      propertyTitle,
      agentName,
      agentId,
      ...formData,
      type: inquiryType
    };
    try {
      await storage.addInquiry(inquiry);
      storage.trackListingInquiry(propertyId);
      toast.success(t('propertyDetailsPage.schedule.toastSuccess', 'Viewing scheduled! The agent will confirm the appointment.'));
    } catch (error) {
      toast.error(error.message || t('propertyDetailsPage.schedule.toastError', 'Failed to schedule viewing. Please try again.'));
      return;
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-2">{heading}</h3>
      <p className="text-gray-600 mb-4">{helperText}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaUser className="text-gray-400" />
            {t('propertyDetailsPage.form.fullName', 'Full Name')}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.form.fullNamePlaceholder', 'Your name')}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            {t('propertyDetailsPage.form.email', 'Email Address')}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.form.emailPlaceholder', 'your@email.com')}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaPhone className="text-gray-400" />
            {t('propertyDetailsPage.form.phone', 'Phone Number')}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.form.phonePlaceholder', '0803 123 4567')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendar className="text-gray-400" />
              {t('propertyDetailsPage.schedule.preferredDate', 'Preferred Date')}
            </label>
            <input
              type="date"
              required
              min={today}
              value={formData.preferredDate}
              onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2">
              <FaClock className="text-gray-400" />
              {t('propertyDetailsPage.schedule.preferredTime', 'Preferred Time')}
            </label>
            <select
              required
              value={formData.preferredTime}
              onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{t('propertyDetailsPage.schedule.selectTime', 'Select time')}</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{t('propertyDetailsPage.schedule.notes', 'Additional Notes')}</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.schedule.notesPlaceholder', 'Any special requests or questions...')}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          {actionLabel}
        </button>
      </form>
    </div>
  );
}
