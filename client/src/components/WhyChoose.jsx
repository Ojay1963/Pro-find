import { useI18n } from '../contexts/I18nContext'

export default function WhyChoose() {
  const { t } = useI18n()
  const stats = [
    { label: t('whyChoose.stats.propertiesSold', 'Properties Sold'), value: '5,000+' },
    { label: t('whyChoose.stats.happyClients', 'Happy Clients'), value: '10,000+' },
    { label: t('whyChoose.stats.yearsExperience', 'Years Experience'), value: '15+' },
    { label: t('whyChoose.stats.successRate', 'Success Rate'), value: '98%' }
  ]

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{t('whyChoose.title', 'Why Choose Profind?')}</h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            {t(
              'whyChoose.descriptionOne',
              "Profind is your trusted partner in finding the perfect property. With over 15 years of experience in the real estate industry, we've helped thousands of families find their dream homes."
            )}
            <br />
            <br />
            {t(
              'whyChoose.descriptionTwo',
              'Our team of expert agents provides personalized service, comprehensive market knowledge, and dedicated support throughout your property journey.'
            )}
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-700 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
            alt={t('whyChoose.imageAlt', 'Why Choose Profind')}
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  )
}
