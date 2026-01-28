import React from 'react';
import { FaCheckCircle, FaGlobeAfrica, FaShieldAlt, FaUsers } from 'react-icons/fa';
import logo from '../assets/Untitled design.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-20 mt-24">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-green-50 border border-emerald-100 p-8 sm:p-12 mb-14">
          <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">About Profind</p>
              <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-gray-900 leading-tight">
                Trusted real estate decisions, built for Nigeria.
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Since 2009, Profind has connected buyers, renters, and investors with verified listings and
                transparent market insights. We combine local expertise with a modern, intuitive platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Verified listings</span>
                <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Trusted agents</span>
                <span className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-sm text-green-700">Market insights</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img src={logo} alt="Profind Logo" className="rounded-3xl shadow-xl w-full max-w-sm object-contain bg-white p-3" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {[
            { title: 'National coverage', text: 'Presence across major cities with localized insights.', icon: FaGlobeAfrica },
            { title: 'Verified trust', text: 'Screened listings and compliance-driven checks.', icon: FaShieldAlt },
            { title: 'People-first support', text: 'Dedicated advisors that stay with you to closing.', icon: FaUsers },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="h-12 w-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                <item.icon className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-3 text-green-700">Our Mission</h2>
            <p className="text-gray-700">
              To simplify the property search process and empower Nigerians with the information and tools
              they need to make confident real estate decisions.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-3 text-green-700">Why Profind</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                'Extensive listings across Nigeria\'s key markets',
                'Verified properties and vetted agents',
                'Advanced search, filters, and comparison tools',
                'Fast support from local real estate specialists',
                'Mobile-first experience for on-the-go clients',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-green-700">Contact Us</h2>
            <p className="text-gray-700 mb-2">Questions or feedback? Our advisors are here to help you every step.</p>
            <ul className="text-gray-700">
              <li><span className="font-semibold">Email:</span> support@profind.ng</li>
              <li><span className="font-semibold">Phone:</span> +234 800 000 0000</li>
              <li><span className="font-semibold">Address:</span> 123 Profind Avenue, Lagos, Nigeria</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <a href="mailto:support@profind.ng" className="bg-green-700 text-white rounded-lg px-6 py-3 font-semibold text-center hover:bg-green-800 transition">Email Us</a>
            <a href="tel:+2348000000000" className="bg-gray-200 text-green-700 rounded-lg px-6 py-3 font-semibold text-center hover:bg-green-100 transition">Call Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

