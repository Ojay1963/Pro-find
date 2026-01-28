import React from 'react';
import {
  FaHome,
  FaBuilding,
  FaKey,
  FaShieldAlt,
  FaChartLine,
  FaBalanceScale,
  FaUsers,
  FaTools,
  FaMapMarkedAlt
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-24 py-20 bg-gray-50">
        <section className="home-content space-y-12">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-8 sm:p-12 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
              End-to-end real estate support for modern clients.
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl">
              Profind delivers a full real estate stack for buyers, sellers, investors, and property owners.
              Every service is backed by verified data, trusted agents, and local expertise.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Verified agents</span>
              <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Pricing insights</span>
              <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Secure transactions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Buy Property',
                text: 'Search verified listings with neighborhood insights and pricing guidance.',
                icon: FaHome,
              },
              {
                title: 'Sell Property',
                text: 'Premium listing exposure, professional media, and closing support.',
                icon: FaBuilding,
              },
              {
                title: 'Rent Property',
                text: 'Match with rentals that fit your lifestyle, budget, and timeline.',
                icon: FaKey,
              },
              {
                title: 'Property Management',
                text: 'Tenant screening, maintenance, and rent collection handled end-to-end.',
                icon: FaTools,
              },
              {
                title: 'Investment Advisory',
                text: 'Market trend analysis, ROI modeling, and portfolio strategy.',
                icon: FaChartLine,
              },
              {
                title: 'Legal & Compliance',
                text: 'Document verification, title checks, and transaction compliance.',
                icon: FaBalanceScale,
              },
              {
                title: 'Relocation Support',
                text: 'Move-in coordination, inspections, and area onboarding.',
                icon: FaMapMarkedAlt,
              },
              {
                title: 'Client Matching',
                text: 'Qualified buyer and tenant matching for faster conversions.',
                icon: FaUsers,
              },
              {
                title: 'Secure Transactions',
                text: 'Verified agents, secure escrow options, and fraud safeguards.',
                icon: FaShieldAlt,
              },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                  <service.icon className="text-green-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Why Our Services Stand Out
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Verified listings with consistent quality checks',
                'Local market intelligence across major Nigerian cities',
                'Transparent pricing benchmarks and valuation guidance',
                'Dedicated support throughout negotiation and closing',
                'Digital scheduling, virtual tours, and comparison tools',
                'Trusted partner network for legal and mortgage support',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Ready to work with Profind?</h3>
              <p className="text-gray-600 mt-2">Speak with an advisor to plan your next move.</p>
            </div>
            <div className="flex gap-3">
              <a href="/contact" className="btn-primary px-6 py-3">Contact Us</a>
              <a href="/properties" className="btn-secondary px-6 py-3">Browse Listings</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

