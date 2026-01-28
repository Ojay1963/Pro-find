import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaList, FaUsers, FaCheck, FaBan, FaEye } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  
  // Check if user is admin (in real app, this would check auth)
  const currentUser = storage.getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 mt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-green-600 text-white rounded-lg">
            Go Home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const listings = storage.getListings();
  const pendingListings = listings.filter(l => l.status === 'pending');
  const approvedListings = listings.filter(l => l.status === 'approved');
  const rejectedListings = listings.filter(l => l.status === 'rejected');
  
  const agentVerifications = storage.getAgentVerifications();
  const pendingVerifications = agentVerifications.filter(v => v.status === 'pending');
  
  const allUsers = storage.getUsers();

  const handleApproveListing = (listingId) => {
    storage.updateListing(listingId, { status: 'approved', reviewedAt: new Date().toISOString() });
    toast.success('Listing approved!');
    window.location.reload();
  };

  const handleRejectListing = (listingId) => {
    storage.updateListing(listingId, { status: 'rejected', reviewedAt: new Date().toISOString() });
    toast.success('Listing rejected!');
    window.location.reload();
  };

  const handleApproveAgent = (verificationId) => {
    storage.verifyAgent(verificationId, true);
    toast.success('Agent verified!');
    window.location.reload();
  };

  const handleRejectAgent = (verificationId) => {
    storage.verifyAgent(verificationId, false);
    toast.error('Agent verification rejected!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FaShieldAlt className="text-green-600" />
            Admin Panel
          </h1>
          <p className="text-gray-600">Manage listings, users, and agent verifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <nav className="space-y-2">
                {[
                  { id: 'listings', label: 'Listing Moderation', icon: FaList, count: pendingListings.length },
                  { id: 'agents', label: 'Agent Verifications', icon: FaUsers, count: pendingVerifications.length },
                  { id: 'users', label: 'All Users', icon: FaUsers },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-green-50 text-green-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
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
            {/* Listing Moderation */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Listing Moderation</h2>
                    <div className="flex gap-4 text-sm">
                      <span className="text-orange-600">Pending: {pendingListings.length}</span>
                      <span className="text-green-600">Approved: {approvedListings.length}</span>
                      <span className="text-red-600">Rejected: {rejectedListings.length}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {pendingListings.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No pending listings to review.</p>
                    ) : (
                      pendingListings.map(listing => (
                        <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            {listing.images && listing.images.length > 0 && (
                              <img 
                                src={listing.images[0].preview || listing.images[0]} 
                                alt={listing.title}
                                className="w-32 h-32 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                              <p className="text-gray-600 mb-2">{listing.location}</p>
                              <p className="text-green-600 font-bold mb-2">₦{parseInt(listing.price || 0).toLocaleString()}</p>
                              <div className="flex gap-2 text-sm text-gray-600 mb-3">
                                <span>{listing.beds} Beds</span>
                                <span>{listing.baths} Baths</span>
                                <span>{listing.area} sqm</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-4">{listing.description?.substring(0, 150)}...</p>
                              <div className="flex gap-2">
                                <Link
                                  to={`/property/${listing.id}`}
                                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <FaEye />
                                  View
                                </Link>
                                <button
                                  onClick={() => handleApproveListing(listing.id)}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                >
                                  <FaCheck />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectListing(listing.id)}
                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                >
                                  <FaBan />
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Agent Verifications */}
            {activeTab === 'agents' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Agent Verifications</h2>
                {pendingVerifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending agent verifications.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingVerifications.map(verification => {
                      const user = allUsers.find(u => u.id === verification.userId);
                      return (
                        <div key={verification.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{user?.name || 'Unknown User'}</h3>
                              <p className="text-gray-600 mb-2">{user?.email}</p>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-semibold">License Number:</span> {verification.credentials?.licenseNumber || 'N/A'}</p>
                                <p><span className="font-semibold">Company:</span> {verification.credentials?.companyName || user?.companyName || 'N/A'}</p>
                                <p><span className="font-semibold">Phone:</span> {user?.phone || 'N/A'}</p>
                              </div>
                              {verification.credentials?.documents && (
                                <div className="mt-2">
                                  <p className="font-semibold text-sm mb-1">Documents:</p>
                                  <p className="text-sm text-gray-600">{verification.credentials.documents}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveAgent(verification.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                              >
                                <FaCheckCircle />
                                Verify
                              </button>
                              <button
                                onClick={() => handleRejectAgent(verification.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                              >
                                <FaTimesCircle />
                                Reject
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

            {/* All Users */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">All Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Verified</th>
                        <th className="text-left p-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm capitalize">
                              {user.role}
                            </span>
                            {user.role === 'agent' && user.verified && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                ✓ Verified
                              </span>
                            )}
                          </td>
                          <td className="p-2">
                            {user.emailVerified ? (
                              <FaCheckCircle className="text-green-600" />
                            ) : (
                              <FaTimesCircle className="text-gray-400" />
                            )}
                          </td>
                          <td className="p-2 text-sm text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
