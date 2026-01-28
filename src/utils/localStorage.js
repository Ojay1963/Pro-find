// Local storage utilities for favorites, recently viewed, etc.

export const storage = {
  cleanupFloorPlans: () => {
    const cleanupFlag = localStorage.getItem('profind_floorplan_cleanup_done');
    if (cleanupFlag) {
      return;
    }

    const mediaRaw = localStorage.getItem('profind_virtual_tours');
    if (mediaRaw) {
      const media = JSON.parse(mediaRaw);
      const cleaned = media.filter((item) => item.type !== 'floor_plan');
      localStorage.setItem('profind_virtual_tours', JSON.stringify(cleaned));
    }

    const listingsRaw = localStorage.getItem('profind_listings');
    if (listingsRaw) {
      const listings = JSON.parse(listingsRaw);
      const cleanedListings = listings.map((listing) => {
        const { floorPlanUrl, ...rest } = listing;
        return rest;
      });
      localStorage.setItem('profind_listings', JSON.stringify(cleanedListings));
    }

    localStorage.setItem('profind_floorplan_cleanup_done', 'true');
  },
  // Favorites
  getFavorites: () => {
    const favorites = localStorage.getItem('profind_favorites');
    return favorites ? JSON.parse(favorites) : [];
  },
  
  addFavorite: (propertyId) => {
    const favorites = storage.getFavorites();
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);
      localStorage.setItem('profind_favorites', JSON.stringify(favorites));
    }
  },
  
  removeFavorite: (propertyId) => {
    const favorites = storage.getFavorites();
    const updated = favorites.filter(id => id !== propertyId);
    localStorage.setItem('profind_favorites', JSON.stringify(updated));
  },
  
  isFavorite: (propertyId) => {
    const favorites = storage.getFavorites();
    return favorites.includes(propertyId);
  },
  
  // Recently Viewed
  getRecentlyViewed: () => {
    const viewed = localStorage.getItem('profind_recently_viewed');
    return viewed ? JSON.parse(viewed) : [];
  },
  
  addRecentlyViewed: (propertyId) => {
    const viewed = storage.getRecentlyViewed();
    const updated = [propertyId, ...viewed.filter(id => id !== propertyId)].slice(0, 20);
    localStorage.setItem('profind_recently_viewed', JSON.stringify(updated));
  },
  
  // Saved Searches
  getSavedSearches: () => {
    const searches = localStorage.getItem('profind_saved_searches');
    return searches ? JSON.parse(searches) : [];
  },
  
  saveSearch: (searchCriteria) => {
    const searches = storage.getSavedSearches();
    const newSearch = { id: Date.now(), ...searchCriteria, createdAt: new Date().toISOString() };
    searches.push(newSearch);
    localStorage.setItem('profind_saved_searches', JSON.stringify(searches));
    return newSearch;
  },
  
  deleteSavedSearch: (searchId) => {
    const searches = storage.getSavedSearches();
    const updated = searches.filter(s => s.id !== searchId);
    localStorage.setItem('profind_saved_searches', JSON.stringify(updated));
  },
  
  // User preferences
  getUserPreferences: () => {
    const prefs = localStorage.getItem('profind_user_preferences');
    return prefs ? JSON.parse(prefs) : { notifications: true, emailAlerts: true };
  },
  
  saveUserPreferences: (preferences) => {
    localStorage.setItem('profind_user_preferences', JSON.stringify(preferences));
  },

  // Inquiries Management
  getInquiries: () => {
    const inquiries = localStorage.getItem('profind_inquiries');
    return inquiries ? JSON.parse(inquiries) : [];
  },

  addInquiry: (inquiry) => {
    const inquiries = storage.getInquiries();
    const newInquiry = {
      id: Date.now(),
      ...inquiry,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    localStorage.setItem('profind_inquiries', JSON.stringify(inquiries));
    return newInquiry;
  },

  updateInquiryStatus: (inquiryId, status) => {
    const inquiries = storage.getInquiries();
    const updated = inquiries.map(inq => 
      inq.id === inquiryId ? { ...inq, status, updatedAt: new Date().toISOString() } : inq
    );
    localStorage.setItem('profind_inquiries', JSON.stringify(updated));
  },

  // Listings Management
  getListings: () => {
    const listings = localStorage.getItem('profind_listings');
    return listings ? JSON.parse(listings) : [];
  },

  getListingById: (id) => {
    const listings = storage.getListings();
    return listings.find(l => l.id === id);
  },

  updateListing: (id, updates) => {
    const listings = storage.getListings();
    const updated = listings.map(listing => 
      listing.id === id ? { ...listing, ...updates, updatedAt: new Date().toISOString() } : listing
    );
    localStorage.setItem('profind_listings', JSON.stringify(updated));
  },

  deleteListing: (id) => {
    const listings = storage.getListings();
    const updated = listings.filter(l => l.id !== id);
    localStorage.setItem('profind_listings', JSON.stringify(updated));
  },

  // Listing Analytics
  getListingAnalytics: (listingId) => {
    const analytics = localStorage.getItem(`profind_analytics_${listingId}`);
    return analytics ? JSON.parse(analytics) : { views: 0, inquiries: 0, favorites: 0 };
  },

  trackListingView: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId);
    analytics.views = (analytics.views || 0) + 1;
    analytics.lastViewed = new Date().toISOString();
    localStorage.setItem(`profind_analytics_${listingId}`, JSON.stringify(analytics));
  },

  trackListingInquiry: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId);
    analytics.inquiries = (analytics.inquiries || 0) + 1;
    localStorage.setItem(`profind_analytics_${listingId}`, JSON.stringify(analytics));
  },

  trackListingFavorite: (listingId) => {
    const analytics = storage.getListingAnalytics(listingId);
    analytics.favorites = (analytics.favorites || 0) + 1;
    localStorage.setItem(`profind_analytics_${listingId}`, JSON.stringify(analytics));
  },

  // Price Alerts
  getPriceAlerts: () => {
    const alerts = localStorage.getItem('profind_price_alerts');
    return alerts ? JSON.parse(alerts) : [];
  },

  addPriceAlert: (alert) => {
    const alerts = storage.getPriceAlerts();
    const newAlert = {
      id: Date.now(),
      ...alert,
      active: true,
      createdAt: new Date().toISOString()
    };
    alerts.push(newAlert);
    localStorage.setItem('profind_price_alerts', JSON.stringify(alerts));
    return newAlert;
  },

  deletePriceAlert: (alertId) => {
    const alerts = storage.getPriceAlerts();
    const updated = alerts.filter(a => a.id !== alertId);
    localStorage.setItem('profind_price_alerts', JSON.stringify(updated));
  },

  // User Management
  getUsers: () => {
    const users = localStorage.getItem('profind_users');
    return users ? JSON.parse(users) : [];
  },

  addUser: (user) => {
    const users = storage.getUsers();
    const newUser = {
      id: Date.now(),
      ...user,
      emailVerified: false,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('profind_users', JSON.stringify(users));
    // Also set current user
    localStorage.setItem('profind_user_role', user.role);
    localStorage.setItem('profind_user_name', user.name);
    localStorage.setItem('profind_user_id', newUser.id);
    localStorage.setItem('profind_user_email', user.email);
    return newUser;
  },

  getCurrentUser: () => {
    const userId = localStorage.getItem('profind_user_id');
    if (!userId) return null;
    const users = storage.getUsers();
    return users.find(u => u.id === parseInt(userId)) || null;
  },

  updateUser: (userId, updates) => {
    const users = storage.getUsers();
    const updated = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    );
    localStorage.setItem('profind_users', JSON.stringify(updated));
  },

  // Property Comparisons
  getComparisons: () => {
    const comparisons = localStorage.getItem('profind_comparisons');
    return comparisons ? JSON.parse(comparisons) : [];
  },

  addComparison: (propertyIds) => {
    const comparisons = storage.getComparisons();
    const newComparison = {
      id: Date.now(),
      propertyIds,
      createdAt: new Date().toISOString()
    };
    comparisons.push(newComparison);
    localStorage.setItem('profind_comparisons', JSON.stringify(comparisons));
    return newComparison;
  },

  // Agent Verification
  getAgentVerifications: () => {
    const verifications = localStorage.getItem('profind_agent_verifications');
    return verifications ? JSON.parse(verifications) : [];
  },

  requestAgentVerification: (userId, credentials) => {
    const verifications = storage.getAgentVerifications();
    const newRequest = {
      id: Date.now(),
      userId,
      credentials,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    verifications.push(newRequest);
    localStorage.setItem('profind_agent_verifications', JSON.stringify(verifications));
    return newRequest;
  },

  verifyAgent: (verificationId, approved) => {
    const verifications = storage.getAgentVerifications();
    const updated = verifications.map(v => {
      if (v.id === verificationId) {
        return {
          ...v,
          status: approved ? 'approved' : 'rejected',
          reviewedAt: new Date().toISOString()
        };
      }
      return v;
    });
    localStorage.setItem('profind_agent_verifications', JSON.stringify(updated));
    
    if (approved) {
      const verification = updated.find(v => v.id === verificationId);
      storage.updateUser(verification.userId, { verified: true, verifiedAt: new Date().toISOString() });
    }
  },

  // In-App Messaging
  getConversations: (userId) => {
    const conversations = localStorage.getItem('profind_conversations');
    const all = conversations ? JSON.parse(conversations) : [];
    return all.filter(c => c.participantIds.includes(userId));
  },

  getOrCreateConversation: (userId1, userId2, propertyId = null) => {
    const conversations = localStorage.getItem('profind_conversations');
    const all = conversations ? JSON.parse(conversations) : [];
    const existing = all.find(c => 
      c.participantIds.includes(userId1) && 
      c.participantIds.includes(userId2) &&
      (!propertyId || c.propertyId === propertyId)
    );
    
    if (existing) return existing;
    
    const newConv = {
      id: Date.now(),
      participantIds: [userId1, userId2],
      propertyId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.push(newConv);
    localStorage.setItem('profind_conversations', JSON.stringify(all));
    return newConv;
  },

  addMessage: (conversationId, message) => {
    const conversations = localStorage.getItem('profind_conversations');
    const all = conversations ? JSON.parse(conversations) : [];
    const conv = all.find(c => c.id === conversationId);
    if (conv) {
      const newMessage = {
        id: Date.now(),
        ...message,
        createdAt: new Date().toISOString()
      };
      conv.messages.push(newMessage);
      conv.updatedAt = new Date().toISOString();
      localStorage.setItem('profind_conversations', JSON.stringify(all));
      return newMessage;
    }
    return null;
  },

  // Agent Ratings & Reviews
  getAgentReviews: (agentId) => {
    const reviews = localStorage.getItem('profind_agent_reviews');
    const all = reviews ? JSON.parse(reviews) : [];
    return all.filter(r => r.agentId === agentId);
  },

  addAgentReview: (review) => {
    const reviews = localStorage.getItem('profind_agent_reviews');
    const all = reviews ? JSON.parse(reviews) : [];
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString()
    };
    all.push(newReview);
    localStorage.setItem('profind_agent_reviews', JSON.stringify(all));
    
    // Update agent's average rating
    const agentReviews = all.filter(r => r.agentId === review.agentId);
    const avgRating = agentReviews.reduce((sum, r) => sum + r.rating, 0) / agentReviews.length;
    storage.updateUser(review.agentId, { averageRating: avgRating, totalReviews: agentReviews.length });
    
    return newReview;
  },

  // Virtual Tours
  addVirtualTour: (propertyId, tourUrl) => {
    const tours = localStorage.getItem('profind_virtual_tours');
    const all = tours ? JSON.parse(tours) : [];
    const newTour = {
      id: Date.now(),
      propertyId,
      tourUrl,
      type: 'virtual_tour',
      createdAt: new Date().toISOString()
    };
    all.push(newTour);
    localStorage.setItem('profind_virtual_tours', JSON.stringify(all));
    return newTour;
  },

  getPropertyMedia: (propertyId) => {
    const media = localStorage.getItem('profind_virtual_tours');
    const all = media ? JSON.parse(media) : [];
    return all.filter(m => m.propertyId === propertyId);
  }
};
