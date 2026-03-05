import React, { useCallback, useRef, useState } from 'react'
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
  FaMapMarkedAlt,
  FaChevronDown
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
import { useI18n } from '../contexts/I18nContext'

const HomePage = () => {
  const { t } = useI18n()
  const resultsRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(0)

  const handleSearchApplied = useCallback(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const faqItems = t('home.faq.items', [])
  const safeFaqItems = Array.isArray(faqItems) ? faqItems : []

  const marketCards = [
    { label: t('home.market.stats.activeListings'), value: '1,200+', icon: FaHome },
    { label: t('home.market.stats.avgDays'), value: '21', icon: FaChartLine },
    { label: t('home.market.stats.verifiedAgents'), value: '340+', icon: FaShieldAlt },
    { label: t('home.market.stats.viewingRequests'), value: '2,800+', icon: FaRegCalendarCheck }
  ]

  const howSteps = [
    {
      title: t('home.works.discoverTitle'),
      text: t('home.works.discoverText'),
      icon: FaSearch
    },
    {
      title: t('home.works.validateTitle'),
      text: t('home.works.validateText'),
      icon: FaShieldAlt
    },
    {
      title: t('home.works.closeTitle'),
      text: t('home.works.closeText'),
      icon: FaClipboardList
    }
  ]

  const proFeatures = [
    { label: t('home.pro.features.portfolio'), icon: FaBuilding },
    { label: t('home.pro.features.heatmaps'), icon: FaMapMarkedAlt },
    { label: t('home.pro.features.matching'), icon: FaUsers },
    { label: t('home.pro.features.compliance'), icon: FaShieldAlt }
  ]

  const proCards = [
    { title: t('home.pro.cards.verified'), value: t('home.pro.values.verified') },
    { title: t('home.pro.cards.support'), value: t('home.pro.values.support') },
    { title: t('home.pro.cards.pricing'), value: t('home.pro.values.pricing') },
    { title: t('home.pro.cards.closings'), value: t('home.pro.values.closings') }
  ]

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
              <h2 className="text-3xl font-bold mb-3">{t('home.market.title')}</h2>
              <p className="text-gray-600">{t('home.market.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketCards.map((item, index) => (
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
              <h2 className="text-3xl font-bold mb-3">{t('home.works.title')}</h2>
              <p className="text-gray-600">{t('home.works.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howSteps.map((step, index) => (
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
                <h2 className="text-3xl font-bold mb-4">{t('home.pro.title')}</h2>
                <p className="text-gray-600 mb-6">{t('home.pro.subtitle')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {proFeatures.map((feature) => (
                    <div key={feature.label} className="flex items-center gap-3">
                      <feature.icon className="text-green-600 text-xl" />
                      <span className="text-gray-700 font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/create-listing" className="btn-primary">
                    {t('home.pro.listProperty')}
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    {t('home.pro.advisor')}
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-right" style={{ animationDelay: '120ms' }}>
                {proCards.map((item, index) => (
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

        <section className="w-full py-16 bg-gray-50 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-up">
              <h2 className="text-3xl font-bold mb-3">{t('home.faq.title')}</h2>
              <p className="text-gray-600">{t('home.faq.subtitle')}</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-3">
              {safeFaqItems.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <div key={item.question} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50"
                    >
                      <span className="font-semibold text-gray-900">{item.question}</span>
                      <FaChevronDown
                        className={`text-green-700 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && <div className="px-5 pb-5 text-gray-600">{item.answer}</div>}
                  </div>
                )
              })}
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
