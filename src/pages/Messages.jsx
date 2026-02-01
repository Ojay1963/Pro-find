import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUser, FaEnvelope, FaPaperPlane, FaSearch, FaHome } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
import properties from '../components/propertiesData';

export default function Messages() {
  const { conversationId } = useParams();
  const currentUser = storage.getCurrentUser();
  const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id'));
  const apiBase = import.meta.env.VITE_API_BASE || '';
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (userId) {
      void storage.syncAll().then(() => {
        const userConversations = storage.getConversations(userId);
        setConversations(userConversations);

        if (conversationId) {
          const conv = userConversations.find(c => c.id === parseInt(conversationId));
          if (conv) setSelectedConversation(conv);
        }
      });
    }
  }, [userId, conversationId]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConversation?.id) return;
      const token = localStorage.getItem('profind_token');
      if (!token) return;
      try {
        const response = await fetch(`${apiBase}/api/conversations/${selectedConversation.id}/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data?.messages) {
          setSelectedConversation((prev) => ({ ...prev, messages: data.messages }));
          const updated = storage.getConversations(userId).map((conv) =>
            conv.id === selectedConversation.id ? { ...conv, messages: data.messages } : conv
          );
          localStorage.setItem('profind_conversations', JSON.stringify(updated));
          setConversations(updated);
        }
      } catch (error) {
        console.error('Failed to load messages', error);
      }
    };
    void loadMessages();
  }, [selectedConversation?.id, apiBase]);

  const getOtherParticipant = (conversation) => {
    const otherId = conversation.participantIds.find(id => id !== userId);
    const users = storage.getUsers();
    return users.find(u => u.id === otherId) || { name: 'Unknown User', email: '' };
  };

  const getPropertyInfo = (propertyId) => {
    const prop = properties.find(p => p.id === propertyId) || storage.getListingById(propertyId);
    return prop;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const message = {
      senderId: userId,
      text: messageText,
      read: false
    };

    storage.addMessage(selectedConversation.id, message);
    setMessageText('');
    toast.success('Message sent!');
    
    // Refresh conversation
    const updated = storage.getConversations(userId);
    const updatedConv = updated.find(c => c.id === selectedConversation.id);
    if (updatedConv) setSelectedConversation(updatedConv);
    setConversations(updated);
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const other = getOtherParticipant(conv);
    const prop = conv.propertyId ? getPropertyInfo(conv.propertyId) : null;
    const searchLower = searchQuery.toLowerCase();
    return (
      other.name.toLowerCase().includes(searchLower) ||
      other.email.toLowerCase().includes(searchLower) ||
      (prop && prop.title.toLowerCase().includes(searchLower))
    );
  });

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 mt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view messages</h1>
          <Link to="/login" className="text-green-600 underline">Go to Login</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-gray-600">Chat with agents and property owners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sortedConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <FaEnvelope className="text-4xl mx-auto mb-2 text-gray-300" />
                  <p>No conversations yet</p>
                  <p className="text-sm mt-1">Start a conversation from a property page</p>
                </div>
              ) : (
                sortedConversations.map(conv => {
                  const other = getOtherParticipant(conv);
                  const messages = conv.messages || [];
                  const lastMessage = messages[messages.length - 1];
                  const prop = conv.propertyId ? getPropertyInfo(conv.propertyId) : null;
                  
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left border-b hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-green-50 border-green-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">{other.name}</h3>
                            {lastMessage && (
                              <span className="text-xs text-gray-500">
                                {new Date(lastMessage.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {prop && (
                            <p className="text-xs text-gray-600 mb-1 truncate flex items-center gap-1">
                              <FaHome className="text-xs" />
                              {prop.title}
                            </p>
                          )}
                          {lastMessage && (
                            <p className="text-sm text-gray-600 truncate">
                              {lastMessage.senderId === userId ? 'You: ' : ''}
                              {lastMessage.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b">
                  {(() => {
                    const other = getOtherParticipant(selectedConversation);
                    const prop = selectedConversation.propertyId 
                      ? getPropertyInfo(selectedConversation.propertyId) 
                      : null;
                    
                    return (
                      <div>
                        <h2 className="font-bold text-lg">{other.name}</h2>
                        {prop && (
                          <Link 
                            to={`/property/${prop.id}`}
                            className="text-sm text-green-600 hover:underline flex items-center gap-1 mt-1"
                          >
                            <FaHome className="text-xs" />
                            {prop.title}
                          </Link>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(selectedConversation.messages || []).length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    (selectedConversation.messages || []).map(message => {
                      const isSender = message.senderId === userId;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isSender
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              isSender ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <FaPaperPlane />
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaEnvelope className="text-6xl mx-auto mb-4 text-gray-300" />
                  <p>Select a conversation to start messaging</p>
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
