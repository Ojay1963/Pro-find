import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaHome, FaHeart, FaEye, FaSearch, FaPlus, FaEdit, FaChartLine, FaEnvelope, FaTrash, FaCheckCircle, FaClock, FaUser, FaShieldAlt, FaBell, FaTimes, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import properties from '../components/propertiesData';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Initialize data only if user is logged in
  const favorites = isLoggedIn ? storage.getFavorites() : [];
  const recentlyViewed = isLoggedIn ? storage.getRecentlyViewed() : [];
  const savedSearches = isLoggedIn ? storage.getSavedSearches() : [];

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const userData = storage.getCurrentUser();
      const localStorageName = localStorage.getItem('profind_user_name');
      const localStorageId = localStorage.getItem('profind_user_id');
      
      const loggedIn = !!(userData || localStorageName || localStorageId);
      
      setIsLoggedIn(loggedIn);
      
      if (!loggedIn) {
        console.log('User not logged in, redirecting to home...');
        navigate('/', { replace: true });
        return false;
      }
      return true;
    };

    // Initial check
    if (!checkLoginStatus()) {
      return;
    }

    // Set up interval to check login status periodically (helps with async state updates)
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  // If not logged in, don't render the dashboard content
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 mt-24">
          <div className="text-center py-12">
            <p className="text-gray-600">Redirecting to homepage...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const viewedProperties = properties.filter(p => recentlyViewed.includes(p.id));

  const userRole = currentUser?.role || localStorage.getItem('profind_user_role') || 'seeker';
  const userName = currentUser?.name || localStorage.getItem('profind_user_name') || 'User';
  const userId = currentUser?.id || localStorage.getItem('profind_user_id');
  const userEmail = currentUser?.email || localStorage.getItem('profind_user_email');
  const userPhone = currentUser?.phone;

  const computeProfileCompletion = () => {
    const checks = [
      Boolean(userName && userName !== 'User'),
      Boolean(userEmail),
      Boolean(userPhone),
      Boolean(userRole),
    ];

    if (userRole === 'agent') {
      checks.push(Boolean(currentUser?.licenseNumber));
      checks.push(Boolean(currentUser?.companyName));
    }

    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  const profileCompletion = computeProfileCompletion();

  // Get user's listings
  const allListings = storage.getListings();
  const myListings = allListings.filter(l => l.userId === userId || l.contactEmail === currentUser?.email);

  // Get inquiries
  const allInquiries = storage.getInquiries();
  const myInquiries = allInquiries.filter(inq => {
    if (userRole === 'owner' || userRole === 'agent') {
      // For owners/agents, show inquiries for their listings
      return myListings.some(listing => listing.id === inq.propertyId);
    } else {
      // For seekers, show their own inquiries
      return inq.email === currentUser?.email;
    }
  });

  const handleDeleteListing = (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      storage.deleteListing(listingId);
      toast.success('Listing deleted!');
      window.location.reload();
    }
  };

  const handleUpdateInquiryStatus = (inquiryId, status) => {
    storage.updateInquiryStatus(inquiryId, status);
    toast.success('Inquiry status updated!');
    window.location.reload();
  };

  const priceAlerts = storage.getPriceAlerts();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear ALL user session data
      localStorage.removeItem('profind_user_name');
      localStorage.removeItem('profind_user_role');
      localStorage.removeItem('profind_user_id');
      localStorage.removeItem('currentUser'); // Add this if it exists
      
      // Clear from storage utility
      if (storage.clearCurrentUser) {
        storage.clearCurrentUser();
      }
      
      // Clear any other potential user storage
      sessionStorage.clear(); // Clear session storage too
      
      // Reset state
      setCurrentUser(null);
      setIsLoggedIn(false);
      
      toast.success('Logged out successfully!');
      
      // Force immediate redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24 dashboard-page">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600">Manage your properties, inquiries, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 rounded-2xl shadow-lg p-4 border border-gray-100 backdrop-blur lg:sticky lg:top-28">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: FaHome },
                  { id: 'favorites', label: 'Favorites', icon: FaHeart },
                  { id: 'recently-viewed', label: 'Recently Viewed', icon: FaEye },
                  { id: 'saved-searches', label: 'Saved Searches', icon: FaSearch },
                  { id: 'price-alerts', label: 'Price Alerts', icon: FaEnvelope },
                  ...(userRole === 'owner' || userRole === 'agent' ? [
                    { id: 'my-listings', label: 'My Listings', icon: FaEdit },
                    { id: 'create-listing', label: 'Create Listing', icon: FaPlus },
                    ...(userRole === 'agent' ? [
                      { id: 'bulk-upload', label: 'Bulk Upload', icon: FaPlus },
                    ] : []),
                    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
                  ] : []),
                  { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope, count: myInquiries.filter(i => i.status === 'new').length },
                  { id: 'messages', label: 'Messages', icon: FaComments },
                  ...(userRole === 'admin' ? [
                    { id: 'admin', label: 'Admin Panel', icon: FaShieldAlt },
                  ] : []),
                  { id: 'logout', label: 'Logout', icon: FaSignOutAlt },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'admin') navigate('/admin');
                        else if (item.id === 'messages') navigate('/messages');
                        else if (item.id === 'logout') handleLogout();
                        else setActiveTab(item.id);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-green-600 text-white font-semibold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon />
                        <span>{item.label}</span>
                      </div>
                      {item.count > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-6 shadow-lg">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-green-600">Usage Summary</p>
                      <h2 className="text-2xl font-bold text-gray-900 mt-2">Your activity at a glance</h2>
                      <p className="text-sm text-gray-600 mt-1">Stay on top of your saved homes and inquiries.</p>
                    </div>
                    <Link
                      to="/properties"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                    >
                      Explore new listings
                    </Link>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { label: 'Favorites', value: favorites.length },
                      { label: 'Recently Viewed', value: recentlyViewed.length },
                      { label: 'Saved Searches', value: savedSearches.length },
                      { label: 'New Inquiries', value: myInquiries.filter(i => i.status === 'new').length }
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-white/80 border border-emerald-100 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-emerald-100 bg-white/80 px-4 py-4">
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold text-gray-700">Profile completion</p>
                      <p className="text-green-700 font-semibold">{profileCompletion}%</p>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all"
                        style={{ width: `${profileCompletion}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Add missing details to unlock better matches and faster verification.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Favorites</p>
                        <p className="text-2xl font-bold mt-1">{favorites.length}</p>
                      </div>
                      <span className="h-12 w-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                        <FaHeart className="text-2xl" />
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Recently Viewed</p>
                        <p className="text-2xl font-bold mt-1">{recentlyViewed.length}</p>
                      </div>
                      <span className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                        <FaEye className="text-2xl" />
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Saved Searches</p>
                        <p className="text-2xl font-bold mt-1">{savedSearches.length}</p>
                      </div>
                      <span className="h-12 w-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                        <FaSearch className="text-2xl" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Favorite Properties</h2>
                {favoriteProperties.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No favorite properties yet. Start exploring!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteProperties.map(property => (
                      <Link key={property.id} to={`/property/${property.id}`} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white/90 shadow-sm hover:shadow-lg transition-all">
                        <div className="relative aspect-square overflow-hidden">
                          <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                            <h3 className="font-semibold text-white">{property.title}</h3>
                            <p className="text-xs text-white/80">{property.location}</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <p className="text-green-600 font-bold">{property.price}</p>
                          <span className="text-xs text-gray-500">{property.area}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recently-viewed' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
                {viewedProperties.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recently viewed properties.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {viewedProperties.map(property => (
                      <Link key={property.id} to={`/property/${property.id}`} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white/90 shadow-sm hover:shadow-lg transition-all">
                        <div className="relative aspect-square overflow-hidden">
                          <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                            <h3 className="font-semibold text-white">{property.title}</h3>
                            <p className="text-xs text-white/80">{property.location}</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <p className="text-green-600 font-bold">{property.price}</p>
                          <span className="text-xs text-gray-500">{property.area}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'price-alerts' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Price Alerts</h2>
                {priceAlerts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No price alerts set. Set alerts on property pages to get notified of price changes.</p>
                ) : (
                  <div className="space-y-3">
                    {priceAlerts.map(alert => {
                      const property = properties.find(p => p.id === alert.propertyId) || 
                                     storage.getListingById(alert.propertyId);
                      if (!property) return null;
                      
                      const currentPrice = parseInt(property.price?.toString().replace(/[^\d]/g, '') || '0');
                      const targetPrice = alert.targetPrice || 0;
                      const priceMet = alert.alertType === 'drop' 
                        ? currentPrice <= targetPrice 
                        : currentPrice === targetPrice;
                      
                      return (
                        <div key={alert.id} className={`border rounded-lg p-4 ${
                          priceMet ? 'border-green-500 bg-green-50' : 'border-gray-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{alert.propertyTitle || property.title}</h3>
                                {priceMet && (
                                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                                    Alert Triggered!
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                              <div className="flex gap-4 text-sm">
                                <span>Current: <strong>₦{currentPrice.toLocaleString()}</strong></span>
                                <span>Target: <strong>₦{targetPrice.toLocaleString()}</strong></span>
                                <span className="text-gray-500">Alert: {alert.alertType === 'drop' ? 'Price Drop' : 'Price Match'}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">Email: {alert.email}</p>
                            </div>
                            <button
                              onClick={() => {
                                storage.deletePriceAlert(alert.id);
                                toast.success('Price alert removed!');
                                window.location.reload();
                              }}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'saved-searches' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Saved Searches</h2>
                {savedSearches.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No saved searches yet.</p>
                ) : (
                  <div className="space-y-3">
                    {savedSearches.map(search => (
                      <div key={search.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{search.location || 'All Locations'}</p>
                          <p className="text-sm text-gray-600">
                            {search.type || 'All Types'} • 
                            {search.min && ` Min: ₦${search.min.toLocaleString()}`}
                            {search.max && ` Max: ₦${search.max.toLocaleString()}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link to="/properties" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            View
                          </Link>
                          <button
                            onClick={() => {
                              storage.deleteSavedSearch(search.id);
                              window.location.reload();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'create-listing' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Create New Listing</h2>
                <p className="text-gray-600 mb-4">Start listing your property to reach thousands of potential buyers and renters.</p>
                <Link
                  to="/create-listing"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Create Listing
                </Link>
              </div>
            )}

            {activeTab === 'bulk-upload' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Bulk Upload Properties</h2>
                <p className="text-gray-600 mb-4">Upload multiple properties at once using a CSV file. Perfect for agents with many listings.</p>
                <Link
                  to="/bulk-upload"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Go to Bulk Upload
                </Link>
              </div>
            )}

            {activeTab === 'my-listings' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">My Listings</h2>
                  <Link
                    to="/create-listing"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <FaPlus />
                    Create Listing
                  </Link>
                </div>
                {myListings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">You haven't created any listings yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myListings.map(listing => {
                      const analytics = storage.getListingAnalytics(listing.id);
                      return (
                        <div key={listing.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          {listing.images && listing.images.length > 0 && (
                            <img 
                              src={listing.images[0].preview || listing.images[0]} 
                              alt={listing.title}
                              className="w-full aspect-square object-cover"
                            />
                          )}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold">{listing.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded ${
                                listing.status === 'approved' ? 'bg-green-100 text-green-800' :
                                listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {listing.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{listing.location}</p>
                            <p className="text-green-600 font-bold mb-3">₦{parseInt(listing.price || 0).toLocaleString()}</p>
                            <div className="flex gap-2 text-xs text-gray-600 mb-3">
                              <span>{analytics.views} views</span>
                              <span>•</span>
                              <span>{analytics.inquiries} inquiries</span>
                              <span>•</span>
                              <span>{analytics.favorites} favorites</span>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                to={`/property/${listing.id}`}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-center text-sm"
                              >
                                View
                              </Link>
                              <Link
                                to={`/create-listing?edit=${listing.id}`}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center text-sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteListing(listing.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Listing Performance Analytics</h2>
                {myListings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Create listings to see analytics.</p>
                ) : (
                  <div className="space-y-6">
                    {/* Overall Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Views</p>
                        <p className="text-2xl font-bold mt-1">
                          {myListings.reduce((sum, l) => sum + (storage.getListingAnalytics(l.id).views || 0), 0)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Inquiries</p>
                        <p className="text-2xl font-bold mt-1">
                          {myListings.reduce((sum, l) => sum + (storage.getListingAnalytics(l.id).inquiries || 0), 0)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Favorites</p>
                        <p className="text-2xl font-bold mt-1">
                          {myListings.reduce((sum, l) => sum + (storage.getListingAnalytics(l.id).favorites || 0), 0)}
                        </p>
                      </div>
                    </div>

                    {/* Per Listing Analytics */}
                    <div>
                      <h3 className="text-lg font-bold mb-3">Per Listing Breakdown</h3>
                      <div className="space-y-3">
                        {myListings.map(listing => {
                          const analytics = storage.getListingAnalytics(listing.id);
                          return (
                            <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{listing.title}</h4>
                                <Link to={`/property/${listing.id}`} className="text-blue-600 text-sm">View Listing</Link>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Views</p>
                                  <p className="text-xl font-bold">{analytics.views || 0}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Inquiries</p>
                                  <p className="text-xl font-bold">{analytics.inquiries || 0}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Favorites</p>
                                  <p className="text-xl font-bold">{analytics.favorites || 0}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
                {myInquiries.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No inquiries yet.</p>
                ) : (
                  <div className="space-y-4">
                    {myInquiries.map(inquiry => (
                      <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{inquiry.propertyTitle}</h3>
                            <p className="text-sm text-gray-600">{inquiry.type === 'viewing' ? 'Viewing Request' : 'Contact Inquiry'}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                            inquiry.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm mb-3">
                          <p><span className="font-semibold">From:</span> {inquiry.name}</p>
                          <p><span className="font-semibold">Email:</span> {inquiry.email}</p>
                          <p><span className="font-semibold">Phone:</span> {inquiry.phone}</p>
                          {inquiry.preferredDate && (
                            <p><span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate} at {inquiry.preferredTime}</p>
                          )}
                          {inquiry.message && (
                            <p><span className="font-semibold">Message:</span> {inquiry.message}</p>
                          )}
                        </div>
                        {userRole === 'owner' || userRole === 'agent' ? (
                          <div className="flex gap-2">
                            {inquiry.status === 'new' && (
                              <>
                                <button
                                  onClick={() => handleUpdateInquiryStatus(inquiry.id, 'contacted')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                                >
                                  <FaCheckCircle />
                                  Mark as Contacted
                                </button>
                                <button
                                  onClick={() => handleUpdateInquiryStatus(inquiry.id, 'closed')}
                                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                                >
                                  Close
                                </button>
                              </>
                            )}
                            {inquiry.status === 'contacted' && (
                              <button
                                onClick={() => handleUpdateInquiryStatus(inquiry.id, 'closed')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                              >
                                Close
                              </button>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">Status: {inquiry.status}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
