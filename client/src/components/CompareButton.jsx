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
      className={`p-2 rounded-full transition-colors ${
        isInComparison
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-white text-gray-400 hover:text-blue-500 hover:bg-blue-50'
      } shadow-lg w-full sm:w-auto sm:min-w-[110px] border border-gray-200 px-4 py-2 text-sm font-medium flex items-center justify-center gap-2`}
      title="Add to comparison"
      type="button"
    >
      <FaBalanceScale />
      <span>Compare</span>
    </button>
  );
}
