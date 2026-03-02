import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaList, FaUsers, FaCheck, FaBan, FaEye, FaChartLine, FaServer } from 'react-icons/fa';
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
  const [qaMetrics, setQaMetrics] = useState(null);
  const [funnelMetrics, setFunnelMetrics] = useState({});
  const [systemHealth, setSystemHealth] = useState(null);
  const [trendDays, setTrendDays] = useState(14);
  const [trendData, setTrendData] = useState({ days: 14, series: [], events: [] });
  const [qaLoading, setQaLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('property_viewed');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const currentUser = storage.getCurrentUser();
  const isAdmin = Boolean(currentUser && currentUser.role === 'admin')

  const loadAdminData = async () => {
    try {
      await storage.syncAll();
      const [adminUsers, adminConversations] = await Promise.all([
        storage.adminGetUsers(),
        storage.adminGetConversations()
      ]);
      setListings(storage.getListings());
      setUsers(adminUsers);
      setVerifications(storage.getAgentVerifications());
      setInquiries(storage.getInquiries());
      setConversations(adminConversations);
    } catch (error) {
      toast.error(error.message || 'Failed to load admin data');
    }
  };

  const loadQaData = async (days = trendDays) => {
    setQaLoading(true);
    try {
      const [qaData, funnelData, healthData, trends] = await Promise.all([
        storage.adminGetQaMetrics(),
        storage.adminGetFunnelMetrics(),
        storage.adminGetSystemHealth(),
        storage.adminGetAnalyticsTrends(days)
      ]);
      setQaMetrics(qaData);
      setFunnelMetrics(funnelData || {});
      setSystemHealth(healthData);
      setTrendData(trends || { days, series: [], events: [] });
      setLastUpdatedAt(new Date().toISOString());
    } catch (error) {
      toast.error(error.message || 'Failed to load QA insights');
    } finally {
      setQaLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    void loadAdminData();
    void loadQaData(trendDays);
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin || activeTab !== 'qa' || !autoRefresh) return;
    const timer = setInterval(() => {
      void loadQaData(trendDays);
    }, 60000);
    return () => clearInterval(timer);
  }, [isAdmin, activeTab, autoRefresh, trendDays]);

  if (!isAdmin) {
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

  const qaKpis = useMemo(() => {
    const searches = Number(funnelMetrics.search_submitted || 0);
    const views = Number(funnelMetrics.property_viewed || 0);
    const inquiriesCount = Number(funnelMetrics.inquiry_submitted || 0);
    const starts = Number(funnelMetrics.payment_started || 0);
    const verified = Number(funnelMetrics.payment_verified || 0);
    const inquiryRate = views > 0 ? ((inquiriesCount / views) * 100).toFixed(1) : '0.0';
    const paymentCompletion = starts > 0 ? ((verified / starts) * 100).toFixed(1) : '0.0';
    return { searches, views, inquiriesCount, starts, verified, inquiryRate, paymentCompletion };
  }, [funnelMetrics]);
  const metricConfig = {
    search_submitted: { label: 'Searches', color: '#7C3AED' },
    property_viewed: { label: 'Property views', color: '#2563EB' },
    inquiry_submitted: { label: 'Inquiries', color: '#059669' },
    payment_started: { label: 'Payment starts', color: '#D97706' },
    payment_verified: { label: 'Payment verified', color: '#DC2626' }
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
                  { id: 'qa', label: 'Platform QA', icon: FaChartLine },
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

            {activeTab === 'qa' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaChartLine className="text-indigo-600" />
                        Platform QA Insights
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">Live health, conversion funnel, and trend movement.</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleTimeString() : 'Not yet'}
                        {' '}| Auto-refresh: {autoRefresh ? 'On (60s)' : 'Off'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {[7, 14, 30].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => {
                            setTrendDays(days);
                            void loadQaData(days);
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm border ${
                            trendDays === days ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'
                          }`}
                        >
                          {days}d
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => void loadQaData(trendDays)}
                        className="px-3 py-1.5 rounded-full text-sm border border-gray-300 bg-white text-gray-700"
                      >
                        Refresh
                      </button>
                      <button
                        type="button"
                        onClick={() => setAutoRefresh((prev) => !prev)}
                        className={`px-3 py-1.5 rounded-full text-sm border ${
                          autoRefresh ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {autoRefresh ? 'Auto On' : 'Auto Off'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KpiCard label="API Requests" value={qaMetrics?.requests || 0} tone="indigo" />
                  <KpiCard label="Error Rate" value={`${qaMetrics?.failedRatePct || 0}%`} tone="rose" />
                  <KpiCard label="Inquiry Rate" value={`${qaKpis.inquiryRate}%`} tone="emerald" />
                  <KpiCard label="Payment Completion" value={`${qaKpis.paymentCompletion}%`} tone="amber" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                  <div className="xl:col-span-3 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Event Trend</h3>
                      <select
                        value={selectedMetric}
                        onChange={(event) => setSelectedMetric(event.target.value)}
                        className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                      >
                        {Object.entries(metricConfig).map(([key, value]) => (
                          <option key={key} value={key}>{value.label}</option>
                        ))}
                      </select>
                    </div>
                    {qaLoading ? (
                      <p className="text-sm text-gray-500">Loading trends...</p>
                    ) : (
                      <TrendLineChart
                        data={trendData.series || []}
                        metric={selectedMetric}
                        color={metricConfig[selectedMetric]?.color || '#2563EB'}
                        label={metricConfig[selectedMetric]?.label || 'Metric'}
                      />
                    )}
                  </div>
                  <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Funnel Snapshot</h3>
                    <FunnelBars counts={funnelMetrics} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Reliability</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Failed API Calls" value={qaMetrics?.failedApi || 0} />
                      <MetricCard label="Avg Latency" value={`${qaMetrics?.avgLatencyMs || 0} ms`} />
                      <MetricCard label="429 Rate Limited" value={qaMetrics?.rateLimited || 0} />
                      <MetricCard label="Server Errors" value={qaMetrics?.serverErrors || 0} />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaServer className="text-blue-600" />
                      System Health
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Uptime" value={`${systemHealth?.uptimeSeconds || 0}s`} />
                      <MetricCard label="Memory RSS" value={`${Math.round((systemHealth?.memory?.rss || 0) / 1024 / 1024)} MB`} />
                      <MetricCard label="Requests" value={systemHealth?.requests || 0} />
                      <MetricCard label="Failed API" value={systemHealth?.failedApi || 0} />
                    </div>
                  </div>
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

function MetricCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function KpiCard({ label, value, tone = 'indigo' }) {
  const toneMap = {
    indigo: 'from-indigo-50 to-white border-indigo-100 text-indigo-700',
    rose: 'from-rose-50 to-white border-rose-100 text-rose-700',
    emerald: 'from-emerald-50 to-white border-emerald-100 text-emerald-700',
    amber: 'from-amber-50 to-white border-amber-100 text-amber-700'
  };
  const style = toneMap[tone] || toneMap.indigo;
  return (
    <div className={`rounded-xl border p-4 bg-gradient-to-br ${style}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function TrendLineChart({ data, metric, color, label }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-sm text-gray-500">No trend data yet.</p>;
  }
  const width = 720;
  const height = 220;
  const pad = 22;
  const values = data.map((item) => Number(item?.[metric] || 0));
  const max = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = pad + (index / Math.max(values.length - 1, 1)) * (width - pad * 2);
      const y = height - pad - (value / max) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{values[values.length - 1] || 0} today</p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 rounded-lg bg-gray-50 border border-gray-200">
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>{data[0]?.day || ''}</span>
        <span>{data[data.length - 1]?.day || ''}</span>
      </div>
    </div>
  );
}

function FunnelBars({ counts = {} }) {
  const rows = [
    { key: 'search_submitted', label: 'Searches' },
    { key: 'property_viewed', label: 'Property views' },
    { key: 'inquiry_submitted', label: 'Inquiries' },
    { key: 'payment_started', label: 'Payment starts' },
    { key: 'payment_verified', label: 'Payment verified' }
  ];
  const max = Math.max(...rows.map((row) => Number(counts[row.key] || 0)), 1);
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const value = Number(counts[row.key] || 0);
        const width = `${Math.round((value / max) * 100)}%`;
        return (
          <div key={row.key}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">{row.label}</span>
              <span className="font-semibold text-gray-900">{value}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
