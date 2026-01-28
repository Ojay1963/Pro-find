import React, { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaLink, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function PropertyShare({ propertyId, propertyTitle, propertyUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const fullUrl = propertyUrl || `${window.location.origin}/property/${propertyId}`;

  const shareMethods = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'text-blue-600',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'text-blue-400',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(propertyTitle)}`, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'text-green-500',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${propertyTitle} - ${fullUrl}`)}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      color: 'text-gray-600',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(`Check out this property: ${fullUrl}`)}`;
      }
    }
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <FaShareAlt />
        <span>Share</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Share Property</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {shareMethods.map(method => {
          const Icon = method.icon;
          return (
            <button
              key={method.name}
              onClick={method.action}
              className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon className={`text-2xl ${method.color}`} />
              <span className="text-sm">{method.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
        <input
          type="text"
          value={fullUrl}
          readOnly
          className="flex-1 bg-transparent text-sm text-gray-600"
        />
        <button
          onClick={copyLink}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Copy link"
        >
          <FaCopy className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
