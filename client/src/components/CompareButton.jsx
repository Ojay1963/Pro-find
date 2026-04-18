import React, { useMemo } from 'react';
import { FaBalanceScale } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CompareButton({ propertyId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('ids')?.split(',').map((id) => parseInt(id, 10)).filter(Boolean) || [];
  }, [location.search]);

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedIds.includes(propertyId)) {
      toast.error('This property is already in comparison');
      navigate(`/compare?ids=${selectedIds.join(',')}`);
      return;
    }

    if (selectedIds.length >= 4) {
      toast.error('Maximum 4 properties can be compared at once');
      return;
    }

    const newIds = [...selectedIds, propertyId];
    toast.success('Added to comparison!');
    navigate(`/compare?ids=${newIds.join(',')}`);
  };

  const isInComparison = selectedIds.includes(propertyId);

  return (
    <button
      onClick={handleAddToCompare}
      className={`flex min-h-[44px] w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
        isInComparison
          ? 'border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:border-blue-700'
          : 'border-gray-200 bg-white text-gray-400 shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:border-gray-300 hover:text-gray-500'
      }`}
      title="Add to comparison"
      type="button"
    >
      <FaBalanceScale className="text-[0.95rem]" />
      <span>Compare</span>
    </button>
  );
}
