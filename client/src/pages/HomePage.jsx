import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaBuilding,
  FaSearch,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaRegCalendarCheck,
  FaClipboardList,
  FaMapMarkedAlt
} from 'react-icons/fa'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturedProperties from '../components/FeaturedProperties'
import PropertiesSearchBar from '../components/PropertiesSearchBar'
import Services from '../components/Services'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AiChatBot from '../components/AiChatBot'

const HomePage = () => {
  const resultsRef = useRef(null)
  const handleSearchApplied = useCallback(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 mt-24 py-8 animate-pop-in" style={{ animationDelay: '120ms' }}>
        <PropertiesSearchBar onSearchApplied={handleSearchApplied} />
      </div>

      <div ref={resultsRef} className="scroll-mt-24">
        <FeaturedProperties />
      </div>

      <div className="home-content space-y-16">
        <section className="w-full py-16 bg-white animate-fade-in">
          <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-up">
            <h2 className="text-3xl font-bold mb-3">Market Snapshot</h2>
            <p className="text-gray-600">
              Real-time visibility into listings, demand, and agent activity across key cities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Listings', value: '1,200+', icon: FaHome },
              { label: 'Avg. Days on Market', value: '21', icon: FaChartLine },
              { label: 'Verified Agents', value: '340+', icon: FaShieldAlt },
              { label: 'Viewing Requests / Week', value: '2,800+', icon: FaRegCalendarCheck },
            ].map((item, index) => (
              <div
                key={item.label}
                className="card p-6 text-center transition-transform hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <item.icon className="text-3xl text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{item.value}</div>
                <p className="text-sm text-gray-500 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className="w-full py-16 bg-gray-50 animate-fade-in">
          <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-up">
            <h2 className="text-3xl font-bold mb-3">How Profind Works</h2>
            <p className="text-gray-600">
              A streamlined process built for serious buyers, sellers, and investors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Discover',
                text: 'Use advanced filters and neighborhood insights to shortlist confidently.',
                icon: FaSearch,
              },
              {
                title: 'Validate',
                text: 'Verified agents, detailed listings, and transparent pricing data.',
                icon: FaShieldAlt,
              },
              {
                title: 'Close',
                text: 'Schedule viewings, compare options, and move with clarity.',
                icon: FaClipboardList,
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="card p-6 hover:shadow-md transition-all animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <step.icon className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className="w-full py-16 bg-white animate-fade-in">
          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-left">
              <h2 className="text-3xl font-bold mb-4">Built for Professionals</h2>
              <p className="text-gray-600 mb-6">
                Manage portfolios, monitor performance, and deliver faster decisions with
                data-first tools and verified listing intelligence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Portfolio Tracking', icon: FaBuilding },
                  { label: 'Market Heatmaps', icon: FaMapMarkedAlt },
                  { label: 'Client Matching', icon: FaUsers },
                  { label: 'Compliance Checks', icon: FaShieldAlt },
                ].map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3">
                    <feature.icon className="text-green-600 text-xl" />
                    <span className="text-gray-700 font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/create-listing" className="btn-primary">
                  List a Property
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Talk to an Advisor
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-right" style={{ animationDelay: '120ms' }}>
              {[
                { title: 'Verified Listings', value: '100% checks before publish' },
                { title: 'Dedicated Support', value: 'Fast, local response team' },
                { title: 'Data-Led Pricing', value: 'Comparable sales & trends' },
                { title: 'Faster Closings', value: 'Digital scheduling & reviews' },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="card p-5 animate-fade-up transition-transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        <Services />
        <WhyChoose />
        <Testimonials />
        <Contact />
      </div>
      <AiChatBot />
      <Footer />
    </div>
  )
}

export default HomePage
