import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCheckCircle, FaStar, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import properties from '../components/propertiesData';
import AgentReviews from '../components/AgentReviews';

export default function AgentProfile() {
  const { id } = useParams();
  const allUsers = storage.getUsers();
  const agent = allUsers.find(u => u.id === parseInt(id) && u.role === 'agent');
  const verifications = storage.getAgentVerifications();
  const agentVerification = verifications.find(v => v.userId === agent?.id && v.status === 'approved');
  
  const isVerified = agent?.verified || agentVerification;

  // Get agent's listings
  const allListings = storage.getListings();
  const agentListings = allListings.filter(l => l.userId === agent?.id || l.contactEmail === agent?.email);
  const activeListings = agentListings.filter(l => l.status === 'approved');

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 mt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <Link to="/properties" className="text-blue-600 underline">Back to Properties</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="max-w-6xl mx-auto">
          {/* Agent Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-6xl text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                      {agent.name}
                      {isVerified && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <FaCheckCircle />
                          Verified Agent
                        </span>
                      )}
                    </h1>
                    {agent.companyName && (
                      <p className="text-gray-600 mb-2 flex items-center gap-2">
                        <FaBuilding />
                        {agent.companyName}
                      </p>
                    )}
                    {agent.licenseNumber && (
                      <p className="text-sm text-gray-500">License: {agent.licenseNumber}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope />
                    <a href={`mailto:${agent.email}`} className="hover:text-green-600">{agent.email}</a>
                  </div>
                  {agent.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone />
                      <a href={`tel:${agent.phone}`} className="hover:text-green-600">{agent.phone}</a>
                    </div>
                  )}
                </div>

                {/* Agent Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-gray-600 text-sm">Active Listings</p>
                    <p className="text-2xl font-bold">{activeListings.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Listings</p>
                    <p className="text-2xl font-bold">{agentListings.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Member Since</p>
                    <p className="text-lg font-semibold">
                      {new Date(agent.createdAt).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent's Listings */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Properties by {agent.name}</h2>
            {activeListings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No active listings yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeListings.map(listing => (
                  <Link
                    key={listing.id}
                    to={`/property/${listing.id}`}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0].preview || listing.images[0]}
                        alt={listing.title}
                        className="w-full aspect-square object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <FaBuilding className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{listing.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {listing.location}
                      </p>
                      <p className="text-green-600 font-bold">₦{parseInt(listing.price || 0).toLocaleString()}</p>
                      <div className="flex gap-2 text-xs text-gray-600 mt-2">
                        <span>{listing.beds} Beds</span>
                        <span>•</span>
                        <span>{listing.baths} Baths</span>
                        <span>•</span>
                        <span>{listing.area} sqm</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Agent Reviews */}
          <div className="mt-6">
            <AgentReviews agentId={agent.id} />
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mt-6">
            <h2 className="text-2xl font-bold mb-4">Contact {agent.name}</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={`mailto:${agent.email}`}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center font-semibold flex items-center justify-center gap-2"
              >
                <FaEnvelope />
                Send Email
              </a>
              {agent.phone && (
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-center font-semibold flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
