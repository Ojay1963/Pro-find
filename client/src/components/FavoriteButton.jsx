import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function FavoriteButton({ propertyId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(storage.isFavorite(propertyId));
  }, [propertyId]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      storage.removeFavorite(propertyId);
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      storage.addFavorite(propertyId);
      storage.trackListingFavorite(propertyId);
      setIsFavorite(true);
      toast.success('Added to favorites');
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
      } shadow-lg`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FaHeart className={isFavorite ? 'fill-current' : ''} />
    </button>
  );
}
