import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function PriceAlertForm({ propertyId, currentPrice }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    targetPrice: '',
    alertType: 'drop' // drop or match
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const alert = {
      propertyId,
      currentPrice: parseInt(currentPrice.toString().replace(/[^\d]/g, '')),
      targetPrice: parseInt(formData.targetPrice),
      alertType: formData.alertType,
      email: formData.email
    };
    storage.addPriceAlert(alert);
    toast.success('Price alert set! We\'ll notify you when the price changes.');
    setShowForm(false);
    setFormData({ email: '', targetPrice: '', alertType: 'drop' });
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
      >
        <FaBell />
        Set Price Alert
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h3 className="font-bold mb-3">Set Price Alert</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Alert Type</label>
          <select
            value={formData.alertType}
            onChange={(e) => setFormData({...formData, alertType: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="drop">Price Drop</option>
            <option value="match">Price Match</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Target Price (₦)</label>
          <input
            type="number"
            required
            value={formData.targetPrice}
            onChange={(e) => setFormData({...formData, targetPrice: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter target price"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Set Alert
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
