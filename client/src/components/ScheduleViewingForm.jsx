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
    <div className="rounded-[28px] border border-white/10 bg-[#f8fafc] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{heading}</h3>
          <p className="text-slate-600">{helperText}</p>
        </div>
        <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Booking
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
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
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.form.emailPlaceholder', 'your@email.com')}
          />
        </div>
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
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.form.phonePlaceholder', '0803 123 4567')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.schedule.notesPlaceholder', 'Any special requests or questions...')}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-green-600 py-3.5 font-semibold text-white transition-colors hover:bg-green-700"
        >
          {actionLabel}
        </button>
      </form>
    </div>
  );
}
