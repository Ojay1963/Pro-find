import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactAgentForm from '../components/ContactAgentForm'
import properties from '../components/propertiesData'
import { storage } from '../utils/localStorage'
import { useI18n } from '../contexts/I18nContext'

export default function PropertyContact() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const storedListing = storage.getListingById(parseInt(id))
  const property = properties.find((item) => String(item.id) === String(id)) || storedListing

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{t('propertyDetailsPage.notFoundTitle', 'Property Not Found')}</h2>
            <Link to="/properties" className="mt-4 inline-block text-green-600 hover:underline">
              {t('propertyDetailsPage.backToProperties', 'Back to Properties')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const inquiryType = location.state?.inquiryType || 'contact'
  const title = location.state?.title
  const subtitle = location.state?.subtitle
  const submitLabel = location.state?.submitLabel

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb]">
      <Header />

      <main className="flex-1 px-4 pb-12 pt-28 sm:px-6">
        <section className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-[32px] border border-[#22314f] bg-[#0f172d] shadow-[0_28px_80px_rgba(15,23,45,0.24)]">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_42%),linear-gradient(180deg,_rgba(18,26,47,0.96),_rgba(13,21,39,0.98))] px-5 py-6 sm:px-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-emerald-400/40 hover:text-white"
              >
                <FaArrowLeft />
                Back
              </button>

              <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/90">Agent contact</p>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact agent</h1>
                  <p className="mt-2 text-sm text-slate-300 sm:text-base">Send a short inquiry and the agent can follow up with the next step.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <FaMapMarkerAlt />
                    <span className="font-semibold text-white">{property.title}</span>
                  </div>
                  <p className="mt-1 text-slate-300">{property.location}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-8 sm:py-7">
              <ContactAgentForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentName={property.agentName}
                agentId={property.agentId}
                inquiryType={inquiryType}
                title={title}
                subtitle={subtitle}
                submitLabel={submitLabel}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
