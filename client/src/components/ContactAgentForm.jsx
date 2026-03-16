import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment, FaComments, FaPaperPlane } from 'react-icons/fa';
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
    preferredContact: 'phone'
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

    setFormData({ name: '', email: '', phone: '', message: '', preferredContact: 'phone' });
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
    <div className="rounded-[28px] border border-white/10 bg-[#121b33] p-4 text-white shadow-[0_18px_45px_rgba(3,8,23,0.24)] sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{heading}</h2>
          <p className="mt-1 max-w-lg text-sm text-slate-300">{helperText}</p>
        </div>
        <div className="inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Quick form
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
              <FaUser className="text-emerald-300" />
              {t('propertyDetailsPage.form.fullName', 'Full Name')}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-[#0c1427] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10"
              placeholder={t('propertyDetailsPage.form.fullNamePlaceholder', 'Your name')}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
              <FaPhone className="text-emerald-300" />
              {t('propertyDetailsPage.form.phone', 'Phone Number')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-[#0c1427] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10"
              placeholder={t('propertyDetailsPage.form.phonePlaceholder', '0803 123 4567')}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
            <FaEnvelope className="text-emerald-300" />
            {t('propertyDetailsPage.form.email', 'Email Address')}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-[#0c1427] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10"
            placeholder={t('propertyDetailsPage.form.emailPlaceholder', 'your@email.com')}
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-100">
            <FaComment className="text-emerald-300" />
            {t('propertyDetailsPage.contact.message', 'Message')}
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="3"
            className="w-full rounded-2xl border border-white/10 bg-[#0c1427] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-500/10"
            placeholder={t('propertyDetailsPage.contact.messagePlaceholder', "I'm interested in this property. Please contact me...")}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            <FaPaperPlane />
            {actionLabel}
          </button>
          <button
            type="button"
            onClick={handleStartChat}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
            title={t('propertyDetailsPage.contact.startChat', 'Start a chat conversation')}
          >
            <FaComments />
            <span className="hidden sm:inline">Chat</span>
          </button>
        </div>
      </form>
    </div>
  );
}
