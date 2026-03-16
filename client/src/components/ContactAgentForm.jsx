import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { storage } from '../utils/localStorage';
import { useI18n } from '../contexts/I18nContext';

const getIntentMessage = (intent, propertyTitle) => {
  switch (intent) {
    case 'inspection':
      return `I want to request an inspection for ${propertyTitle}. Please share the next available slot and what I should prepare.`;
    case 'documents':
      return `I want to review the available documents for ${propertyTitle}. Please share the title, survey, and any other relevant paperwork.`;
    case 'negotiation':
      return `I am interested in ${propertyTitle} and would like to discuss the asking price and negotiation range.`;
    default:
      return '';
  }
};

export default function ContactAgentForm({
  propertyId,
  propertyTitle,
  agentName = 'Property Agent',
  agentId = null,
  inquiryType = 'contact',
  title,
  subtitle,
  submitLabel,
  initialMessage = ''
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialMessage || getIntentMessage(inquiryType, propertyTitle),
    preferredContact: 'email'
  });
  const [successMessage, setSuccessMessage] = useState('');

  const heading = title || t('propertyDetailsPage.contact.title', 'Contact Agent');
  const helperText = subtitle || t('propertyDetailsPage.contact.subtitle', 'Interested in this property? Contact the agent for more information.');
  const actionLabel = submitLabel || t('propertyDetailsPage.contact.submit', 'Send Inquiry');
  const hasAgentMessagingAccount = agentId && storage.getUsers().some((user) => user.id === agentId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const currentUser = storage.getCurrentUser();
    const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id'));
    
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
      void storage.trackEvent('inquiry_submitted', {
        propertyId,
        propertyTitle,
        agentId,
        preferredContact: formData.preferredContact,
        inquiryType
      });
    } catch (error) {
      toast.error(error.message || t('propertyDetailsPage.contact.toastError', 'Failed to send inquiry. Please try again.'));
      return;
    }
    
    // Create conversation if user is logged in
    if (userId && agentId && hasAgentMessagingAccount) {
      try {
        const conversation = await storage.getOrCreateConversation(userId, agentId, propertyId);
        if (formData.message) {
          storage.addMessage(conversation.id, {
            senderId: userId,
            text: formData.message,
            read: false
          });
          toast.success(t('propertyDetailsPage.contact.toastMessageSent', 'Message sent! Opening conversation...'));
          setSuccessMessage(t('propertyDetailsPage.contact.successMessage', 'Your message was sent successfully.'));
          setTimeout(() => navigate('/messages'), 1000);
        } else {
          toast.success(t('propertyDetailsPage.contact.toastInquirySent', 'Your inquiry has been sent! The agent will contact you soon.'));
          setSuccessMessage(t('propertyDetailsPage.contact.successInquiry', 'Your inquiry was sent successfully.'));
        }
      } catch (error) {
        toast.success(t('propertyDetailsPage.contact.toastInquirySent', 'Your inquiry has been sent! The agent will contact you soon.'));
        setSuccessMessage(t('propertyDetailsPage.contact.successInquiry', 'Your inquiry was sent successfully.'));
      }
    } else {
      toast.success(t('propertyDetailsPage.contact.toastInquirySent', 'Your inquiry has been sent! The agent will contact you soon.'));
      setSuccessMessage(t('propertyDetailsPage.contact.successInquiry', 'Your inquiry was sent successfully.'));
    }
    
    setFormData({ name: '', email: '', phone: '', message: '', preferredContact: 'email' });
  };

  const handleStartChat = async () => {
    const currentUser = storage.getCurrentUser();
    const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id'));
    
    if (!userId) {
      toast.error(t('propertyDetailsPage.contact.loginRequired', 'Please log in to start a chat'));
      navigate('/login');
      return;
    }
    
    if (!agentId || !hasAgentMessagingAccount) {
      toast.error(t('propertyDetailsPage.contact.agentUnavailable', 'Agent information not available'));
      return;
    }

    try {
      await storage.getOrCreateConversation(userId, agentId, propertyId);
      navigate('/messages');
    } catch (error) {
      toast.error(error.message || t('propertyDetailsPage.contact.toastError', 'Failed to send inquiry. Please try again.'));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-4">{heading}</h3>
      <p className="text-gray-600 mb-4">{helperText}</p>
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

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

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaComment className="text-gray-400" />
            {t('propertyDetailsPage.contact.message', 'Message')}
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('propertyDetailsPage.contact.messagePlaceholder', "I'm interested in this property. Please contact me...")}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{t('propertyDetailsPage.contact.preferredMethod', 'Preferred Contact Method')}</label>
          <select
            value={formData.preferredContact}
            onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="email">{t('propertyDetailsPage.contact.methodEmail', 'Email')}</option>
            <option value="phone">{t('propertyDetailsPage.contact.methodPhone', 'Phone')}</option>
            <option value="whatsapp">{t('propertyDetailsPage.contact.methodWhatsapp', 'WhatsApp')}</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {actionLabel}
          </button>
          <button
            type="button"
            onClick={handleStartChat}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-blue-300"
            title={t('propertyDetailsPage.contact.startChat', 'Start a chat conversation')}
            disabled={!hasAgentMessagingAccount}
          >
            <FaComments />
          </button>
        </div>
      </form>
    </div>
  );
}
