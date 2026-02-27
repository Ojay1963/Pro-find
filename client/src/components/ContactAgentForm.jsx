import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { storage } from '../utils/localStorage';

export default function ContactAgentForm({ propertyId, propertyTitle, agentName = 'Property Agent', agentId = null }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  });
  const [successMessage, setSuccessMessage] = useState('');

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
      type: 'contact'
    };
    try {
      await storage.addInquiry(inquiry);
      storage.trackListingInquiry(propertyId);
    } catch (error) {
      toast.error(error.message || 'Failed to send inquiry. Please try again.');
      return;
    }
    
    // Create conversation if user is logged in
    if (userId && agentId) {
      const conversation = await storage.getOrCreateConversation(userId, agentId, propertyId);
      if (formData.message) {
        storage.addMessage(conversation.id, {
          senderId: userId,
          text: formData.message,
          read: false
        });
        toast.success('Message sent! Opening conversation...');
        setSuccessMessage('Your message was sent successfully.');
        setTimeout(() => navigate('/messages'), 1000);
      } else {
        toast.success('Your inquiry has been sent! The agent will contact you soon.');
        setSuccessMessage('Your inquiry was sent successfully.');
      }
    } else {
      toast.success('Your inquiry has been sent! The agent will contact you soon.');
      setSuccessMessage('Your inquiry was sent successfully.');
    }
    
    setFormData({ name: '', email: '', phone: '', message: '', preferredContact: 'email' });
  };

  const handleStartChat = async () => {
    const currentUser = storage.getCurrentUser();
    const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id'));
    
    if (!userId) {
      toast.error('Please log in to start a chat');
      navigate('/login');
      return;
    }
    
    if (!agentId) {
      toast.error('Agent information not available');
      return;
    }
    
    await storage.getOrCreateConversation(userId, agentId, propertyId);
    navigate('/messages');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
      <p className="text-gray-600 mb-4">Interested in this property? Contact {agentName} for more information.</p>
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaUser className="text-gray-400" />
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaPhone className="text-gray-400" />
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0803 123 4567"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <FaComment className="text-gray-400" />
            Message
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="I'm interested in this property. Please contact me..."
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Preferred Contact Method</label>
          <select
            value={formData.preferredContact}
            onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Send Inquiry
          </button>
          <button
            type="button"
            onClick={handleStartChat}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
            title="Start a chat conversation"
          >
            <FaComments />
          </button>
        </div>
      </form>
    </div>
  );
}
