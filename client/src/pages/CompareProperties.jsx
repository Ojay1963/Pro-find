import React, { useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FaBath, FaBed, FaCheckCircle, FaRulerCombined, FaTimes } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import properties from '../components/propertiesData'
import { storage } from '../utils/localStorage'
import { useI18n } from '../contexts/I18nContext'
import { applyFallbackImage, getPropertyImage } from '../utils/propertyImages'

const parsePrice = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0
const parseArea = (value) => Number(String(value || '').replace(/[^\d.]/g, '')) || 0

export default function CompareProperties() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const storedListings = storage.getListings().map((listing) => ({
    ...listing,
    image: listing.image || listing.images?.[0]?.preview || listing.images?.[0] || listing.imageUrl,
    badge: listing.badge || listing.listingType || 'For Sale'
  }))

  const allProperties = useMemo(
    () => Array.from(new Map([...properties, ...storedListings].map((item) => [item.id, item])).values()),
    [storedListings]
  )

  const selectedIds = useMemo(
    () =>
      (searchParams.get('ids') || '')
        .split(',')
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id) && id > 0),
    [searchParams]
  )

  const comparisonProperties = useMemo(
    () => selectedIds.map((id) => allProperties.find((property) => property.id === id)).filter(Boolean),
    [selectedIds, allProperties]
  )

  const availableProperties = useMemo(
    () => allProperties.filter((property) => !selectedIds.includes(property.id)).slice(0, 12),
    [allProperties, selectedIds]
  )

  const updateSelectedIds = (ids) => {
    const nextIds = ids.slice(0, 4)
    setSearchParams(nextIds.length ? { ids: nextIds.join(',') } : {}, { replace: false })
  }

  const addProperty = (id) => {
    if (selectedIds.includes(id)) return
    if (selectedIds.length >= 4) {
      window.alert(t('comparePage.maxFour', 'Maximum 4 properties can be compared at once'))
      return
    }
    updateSelectedIds([...selectedIds, id])
  }

  const removeProperty = (id) => {
    updateSelectedIds(selectedIds.filter((propertyId) => propertyId !== id))
  }

  const saveComparison = () => {
    if (!selectedIds.length) return
    storage.addComparison(selectedIds)
    window.alert(t('comparePage.saved', 'Comparison saved!'))
  }

  const bestPrice = comparisonProperties.length
    ? Math.min(...comparisonProperties.map((property) => parsePrice(property.price)).filter(Boolean))
    : null
  const bestArea = comparisonProperties.length
    ? Math.max(...comparisonProperties.map((property) => parseArea(property.area)).filter(Boolean))
    : null
  const bestBeds = comparisonProperties.length
    ? Math.max(...comparisonProperties.map((property) => Number(property.beds) || 0))
    : null
  const bestBaths = comparisonProperties.length
    ? Math.max(...comparisonProperties.map((property) => Number(property.baths) || 0))
    : null

  const comparisonRows = [
    {
      key: 'price',
      label: t('comparePage.fields.price', 'Price'),
      render: (property) => property.price || 'N/A',
      isBest: (property) => bestPrice !== null && parsePrice(property.price) === bestPrice
    },
    {
      key: 'location',
      label: t('comparePage.fields.location', 'Location'),
      render: (property) => property.location || 'N/A',
      isBest: () => false
    },
    {
      key: 'beds',
      label: t('comparePage.fields.bedrooms', 'Bedrooms'),
      render: (property) => property.beds || 'N/A',
      isBest: (property) => bestBeds !== null && (Number(property.beds) || 0) === bestBeds
    },
    {
      key: 'baths',
      label: t('comparePage.fields.bathrooms', 'Bathrooms'),
      render: (property) => property.baths || 'N/A',
      isBest: (property) => bestBaths !== null && (Number(property.baths) || 0) === bestBaths
    },
    {
      key: 'area',
      label: t('comparePage.fields.area', 'Area'),
      render: (property) => property.area || 'N/A',
      isBest: (property) => bestArea !== null && parseArea(property.area) === bestArea
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('comparePage.title', 'Compare Properties')}</h1>
          <p className="text-gray-600">
            {t('comparePage.subtitle', 'Select up to 4 properties to compare side by side')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">{t('comparePage.addTitle', 'Add Properties to Compare')}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Pick 2 to 4 listings. The table below compares price, location, bedrooms, bathrooms, and area side by side.
              </p>
            </div>
            <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              {comparisonProperties.length}/4 selected
            </div>
          </div>

          {availableProperties.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableProperties.map((property) => (
                <button
                  key={property.id}
                  type="button"
                  onClick={() => addProperty(property.id)}
                  className="border border-gray-200 rounded-xl p-3 text-left transition hover:border-green-500 hover:shadow-md cursor-pointer"
                >
                  <img
                    src={getPropertyImage(property)}
                    alt={property.title}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                    onError={(event) => applyFallbackImage(event, property)}
                  />
                  <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{property.location}</p>
                  <p className="text-green-600 font-bold text-sm">{property.price}</p>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500">You have already selected the maximum number of properties.</p>
          )}
        </div>

        {comparisonProperties.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 overflow-x-auto">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold">{t('comparePage.comparison', 'Comparison')}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Green check marks highlight the strongest value in each row.
                </p>
              </div>
              <button
                type="button"
                onClick={saveComparison}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
              >
                {t('comparePage.saveComparison', 'Save Comparison')}
              </button>
            </div>

            <table className="w-full min-w-[860px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-44 bg-gray-50 text-left p-4 text-sm font-semibold text-gray-700 rounded-tl-xl">
                    {t('comparePage.feature', 'Feature')}
                  </th>
                  {comparisonProperties.map((property, index) => (
                    <th
                      key={property.id}
                      className={`align-top border-l border-gray-100 p-4 text-left bg-white ${index === comparisonProperties.length - 1 ? 'rounded-tr-xl' : ''}`}
                    >
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => removeProperty(property.id)}
                          className="absolute right-0 top-0 text-red-600 hover:text-red-800 cursor-pointer"
                          aria-label={`Remove ${property.title}`}
                        >
                          <FaTimes />
                        </button>
                        <Link to={`/property/${property.id}`} className="block pr-8">
                          <img
                            src={getPropertyImage(property)}
                            alt={property.title}
                            className="w-full h-44 object-cover rounded-lg mb-3"
                            onError={(event) => applyFallbackImage(event, property)}
                          />
                          <h3 className="font-semibold text-base text-gray-900">{property.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{property.location}</p>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.key}>
                    <td className="border-t border-gray-100 bg-gray-50 p-4 font-semibold text-gray-800">
                      {row.label}
                    </td>
                    {comparisonProperties.map((property) => (
                      <td key={property.id} className="border-t border-l border-gray-100 p-4 align-top">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-gray-800">{row.render(property)}</span>
                          {row.isBest(property) ? <FaCheckCircle className="shrink-0 text-green-600" /> : null}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="border-t border-gray-100 bg-gray-50 p-4 font-semibold text-gray-800">Quick summary</td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="border-t border-l border-gray-100 p-4">
                      <div className="space-y-2 text-sm text-gray-700">
                        <p className="flex items-center gap-2"><FaBed className="text-green-600" /> {property.beds || 'N/A'} bedrooms</p>
                        <p className="flex items-center gap-2"><FaBath className="text-green-600" /> {property.baths || 'N/A'} bathrooms</p>
                        <p className="flex items-center gap-2"><FaRulerCombined className="text-green-600" /> {property.area || 'N/A'}</p>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center">
            <p className="text-gray-500">
              {t('comparePage.empty', 'No properties selected for comparison. Add properties above to start comparing.')}
            </p>
            <button
              type="button"
              onClick={() => navigate('/properties')}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Browse properties
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
