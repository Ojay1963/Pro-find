import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaList, FaUsers, FaCheck, FaBan, FaEye } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);

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

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        await storage.syncAll();
        const adminUsers = await storage.adminGetUsers();
        const adminConversations = await storage.adminGetConversations();
        setListings(storage.getListings());
        setUsers(adminUsers);
        setVerifications(storage.getAgentVerifications());
        setInquiries(storage.getInquiries());
        setConversations(adminConversations);
      } catch (error) {
        toast.error(error.message || 'Failed to load admin data');
      }
    };

    void loadAdminData();
  }, []);

  const pendingListings = listings.filter(l => l.status === 'pending');
  const approvedListings = listings.filter(l => l.status === 'approved');
  const rejectedListings = listings.filter(l => l.status === 'rejected');

  const pendingVerifications = verifications.filter(v => v.status === 'pending');

  const handleApproveListing = (listingId) => {
    storage.updateListing(listingId, { status: 'approved', reviewedAt: new Date().toISOString() });
    toast.success('Listing approved!');
    setListings(storage.getListings());
  };

  const handleRejectListing = (listingId) => {
    storage.updateListing(listingId, { status: 'rejected', reviewedAt: new Date().toISOString() });
    toast.success('Listing rejected!');
    setListings(storage.getListings());
  };

  const handleDeleteListing = (listingId) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    storage.deleteListing(listingId);
    toast.success('Listing deleted!');
    setListings(storage.getListings());
  };

  const handleApproveAgent = (verificationId) => {
    storage.verifyAgent(verificationId, true);
    toast.success('Agent verified!');
    setVerifications(storage.getAgentVerifications());
  };

  const handleRejectAgent = (verificationId) => {
    storage.verifyAgent(verificationId, false);
    toast.error('Agent verification rejected!');
    setVerifications(storage.getAgentVerifications());
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const updated = await storage.adminUpdateUser(userId, { role });
      if (updated) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      }
      toast.success('User role updated');
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleResetPassword = async (userId) => {
    const newPassword = window.prompt('Enter a new password (min 6 chars):');
    if (!newPassword) return;
    try {
      await storage.adminResetPassword(userId, newPassword);
      toast.success('Password reset');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await storage.adminDeleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success('User deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const handleLoadMessages = async (conversation) => {
    setSelectedConversation(conversation);
    try {
      const messages = await storage.adminGetConversationMessages(conversation.id);
      setSelectedMessages(messages);
    } catch (error) {
      toast.error(error.message || 'Failed to load messages');
    }
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
          <p className="text-gray-600">Manage listings, users, inquiries, and messages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <nav className="space-y-2">
                {[
                  { id: 'listings', label: 'Listing Moderation', icon: FaList, count: pendingListings.length },
                  { id: 'agents', label: 'Agent Verifications', icon: FaUsers, count: pendingVerifications.length },
                  { id: 'users', label: 'All Users', icon: FaUsers },
                  { id: 'inquiries', label: 'All Inquiries', icon: FaList, count: inquiries.length },
                  { id: 'messages', label: 'All Messages', icon: FaList, count: conversations.length },
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

          <div className="lg:col-span-3">
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Listing Moderation</h2>
                    <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
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
                                <button
                                  onClick={() => handleDeleteListing(listing.id)}
                                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <FaTimesCircle />
                                  Delete
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

            {activeTab === 'agents' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Agent Verifications</h2>
                {pendingVerifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending agent verifications.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingVerifications.map(verification => {
                      const user = users.find(u => u.id === verification.userId);
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
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="px-2 py-1 border border-gray-200 rounded text-sm capitalize"
                            >
                              {['seeker', 'owner', 'agent', 'admin'].map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
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
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                          </td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleResetPassword(user.id)}
                                className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50"
                              >
                                Reset Password
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">All Inquiries</h2>
                {inquiries.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No inquiries yet.</p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{inq.propertyTitle || 'General Inquiry'}</p>
                            <p className="text-sm text-gray-600">{inq.name} • {inq.email}</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                            {inq.type || 'contact'}
                          </span>
                        </div>
                        {inq.message && <p className="text-sm text-gray-700">{inq.message}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-4">All Conversations</h2>
                  {conversations.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No conversations yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => handleLoadMessages(conv)}
                          className={`w-full text-left border rounded-lg p-3 transition-colors ${
                            selectedConversation?.id === conv.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <p className="text-sm text-gray-600">Conversation #{conv.id}</p>
                          <p className="text-xs text-gray-500">Participants: {conv.participantIds?.join(', ')}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-4">Messages</h2>
                  {!selectedConversation ? (
                    <p className="text-gray-500 text-center py-8">Select a conversation to view messages.</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {selectedMessages.length === 0 ? (
                        <p className="text-gray-500">No messages found.</p>
                      ) : (
                        selectedMessages.map((msg) => (
                          <div key={msg.id} className="border border-gray-200 rounded-lg p-3 text-sm">
                            <p className="text-gray-500">Sender: {msg.senderId}</p>
                            <p className="text-gray-800 mt-1">{msg.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
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
