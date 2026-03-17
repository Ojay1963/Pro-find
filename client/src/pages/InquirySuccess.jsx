import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

const InquirySuccess = () => {
  const location = useLocation()
  const propertyTitle = location.state?.propertyTitle || 'the property'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 sm:px-6">
        <section className="mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-[32px] border border-[#22314f] bg-[#0f172d] px-6 py-10 text-center shadow-[0_28px_80px_rgba(15,23,45,0.24)] sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
              <FaCheckCircle className="text-5xl" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Inquiry sent</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Your inquiry was sent successfully</h1>
            <p className="mt-4 text-base text-slate-300">
              Your message about <span className="font-semibold text-white">{propertyTitle}</span> has been delivered. The agent will review it and get back to you soon.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              You can continue browsing properties while you wait for a response.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
              >
                Browse properties
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
              >
                Go to dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default InquirySuccess
