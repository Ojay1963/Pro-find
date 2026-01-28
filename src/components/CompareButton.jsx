import React, { useState } from 'react';
import { FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function CompareButton({ propertyId }) {
  const [selectedIds, setSelectedIds] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ids = urlParams.get('ids')?.split(',').map(id => parseInt(id)) || [];
    return ids;
  });

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get IDs from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const urlIds = urlParams.get('ids')?.split(',').map(id => parseInt(id)).filter(Boolean) || [];
    const currentIds = urlIds.length > 0 ? urlIds : selectedIds;
    
    if (currentIds.includes(propertyId)) {
      toast.error('This property is already in comparison');
      window.location.href = `/compare?ids=${currentIds.join(',')}`;
      return;
    }
    
    if (currentIds.length >= 4) {
      toast.error('Maximum 4 properties can be compared at once');
      return;
    }
    
    const newIds = [...currentIds, propertyId];
    toast.success('Added to comparison!');
    setTimeout(() => {
      window.location.href = `/compare?ids=${newIds.join(',')}`;
    }, 500);
  };

  const isInComparison = selectedIds.includes(propertyId);

  return (
    <button
      onClick={handleAddToCompare}
      className={`p-2 rounded-full transition-colors ${
        isInComparison
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-white text-gray-400 hover:text-blue-500 hover:bg-blue-50'
      } shadow-lg`}
      title="Add to comparison"
    >
      <FaBalanceScale />
    </button>
  );
}
