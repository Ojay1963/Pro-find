import React, { useState } from 'react';
import { FaStar, FaUser, FaCalendar } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function AgentReviews({ agentId }) {
  const currentUser = storage.getCurrentUser();
  const userId = currentUser?.id || localStorage.getItem('profind_user_id');
  const reviews = storage.getAgentReviews(agentId);
  const agent = storage.getUsers().find(u => u.id === agentId);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    propertyId: null
  });

  const hasUserReviewed = userId && reviews.some(r => r.userId === userId);
  const averageRating = agent?.averageRating || 
    (reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (hasUserReviewed) {
      toast.error('You have already reviewed this agent');
      return;
    }

    const review = {
      agentId,
      userId,
      userName: currentUser?.name || 'Anonymous',
      rating: formData.rating,
      comment: formData.comment,
      propertyId: formData.propertyId
    };

    storage.addAgentReview(review);
    toast.success('Review submitted successfully!');
    setShowForm(false);
    setFormData({ rating: 5, comment: '', propertyId: null });
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Agent Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>
        {userId && !hasUserReviewed && userId !== agentId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Write Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3">Write a Review</h4>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`text-3xl transition-colors ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <FaStar className={star <= formData.rating ? 'fill-current' : ''} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comment</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Share your experience with this agent..."
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({ rating: 5, comment: '', propertyId: null });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <FaCalendar className="text-xs" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar
                        key={star}
                        className={star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
