import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUser, FaEnvelope, FaPaperPlane, FaSearch, FaHome } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import { resolveApiBase } from '../utils/apiBase';
import toast from 'react-hot-toast';
import properties from '../components/propertiesData';
import { useI18n } from '../contexts/I18nContext';

export default function Messages() {
  const { t } = useI18n();
  const { conversationId } = useParams();
  const currentUser = storage.getCurrentUser();
  const userId = currentUser?.id || parseInt(localStorage.getItem('profind_user_id'));
  const apiBase = resolveApiBase();
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

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
      try {
        const response = await fetch(`${apiBase}/api/conversations/${selectedConversation.id}/messages`, {
          credentials: 'include'
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [selectedConversation?.messages?.length]);

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
    toast.success(t('messagesPage.toastSent', 'Message sent!'));
    
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
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('messagesPage.loginRequired', 'Please log in to view messages')}</h1>
          <Link to="/login" className="text-green-600 underline">{t('messagesPage.goToLogin', 'Go to Login')}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm md:rounded-3xl md:p-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-emerald-600">Inbox</p>
          <h1 className="mb-2 mt-2 text-3xl font-bold">{t('messagesPage.title', 'Messages')}</h1>
          <p className="text-gray-600">{t('messagesPage.subtitle', 'Chat with agents and property owners')}</p>
        </div>

        <div className="grid h-[calc(100vh-12.75rem)] grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Conversations List */}
          <div className={`lg:col-span-1 bg-white rounded-[1.75rem] shadow-sm border border-gray-200 flex flex-col overflow-hidden ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
            <div className="border-b p-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('messagesPage.searchPlaceholder', 'Search conversations...')}
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
                  <p>{t('messagesPage.noConversations', 'No conversations yet')}</p>
                  <p className="text-sm mt-1">{t('messagesPage.startFromProperty', 'Start a conversation from a property page')}</p>
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
                      className={`w-full border-b p-4 text-left transition-colors hover:bg-gray-50 ${
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
                              {lastMessage.senderId === userId ? t('messagesPage.youPrefix', 'You: ') : ''}
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
          <div className={`lg:col-span-2 bg-white rounded-[1.75rem] shadow-sm border border-gray-200 flex flex-col overflow-hidden ${selectedConversation ? 'flex' : 'hidden lg:flex'}`}>
            {selectedConversation ? (
              <>
                <div className="border-b p-4">
                  {(() => {
                    const other = getOtherParticipant(selectedConversation);
                    const prop = selectedConversation.propertyId 
                      ? getPropertyInfo(selectedConversation.propertyId) 
                      : null;
                    
                    return (
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-bold">{other.name}</h2>
                          <p className="mt-1 text-sm text-slate-500">{other.email}</p>
                        </div>
                        <button
                          type="button"
                          className="rounded-full border border-gray-200 px-3 py-1 text-sm text-slate-600 lg:hidden"
                          onClick={() => setSelectedConversation(null)}
                        >
                          {t('messagesPage.backToThreads', 'Back')}
                        </button>
                      </div>
                    );
                  })()}
                  {(() => {
                    const prop = selectedConversation.propertyId 
                      ? getPropertyInfo(selectedConversation.propertyId) 
                      : null;
                    
                    return prop ? (
                      <div className="mt-3">
                        <Link 
                          to={`/property/${prop.id}`}
                          className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700 hover:underline"
                        >
                          <FaHome className="text-xs" />
                          {prop.title}
                        </Link>
                      </div>
                    ) : null;
                  })()}
                </div>

                <div className="messages-thread-body flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                  {(selectedConversation.messages || []).length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <p>{t('messagesPage.noMessages', 'No messages yet. Start the conversation!')}</p>
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
                            className={`max-w-[82%] rounded-[1.35rem] p-3 shadow-sm ${
                              isSender
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
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
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="border-t p-3 md:p-4">
                  <div className="flex gap-2 rounded-[1.4rem] border border-gray-200 bg-white p-2 shadow-sm">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={t('messagesPage.typeMessage', 'Type a message...')}
                      className="flex-1 rounded-xl px-4 py-3 outline-none"
                    />
                    <button
                      type="submit"
                      className="flex min-h-[48px] items-center gap-2 rounded-2xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      <FaPaperPlane />
                      <span className="hidden sm:inline">{t('messagesPage.send', 'Send')}</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaEnvelope className="text-6xl mx-auto mb-4 text-gray-300" />
                  <p>{t('messagesPage.selectConversation', 'Select a conversation to start messaging')}</p>
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
