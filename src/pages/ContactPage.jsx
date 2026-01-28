import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-20 mt-24">
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-8 sm:p-12 mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">Contact Profind</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
            Let’s talk about your next move.
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Reach out for property advice, listing support, or partnership inquiries. Our team is ready to help.
          </p>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
