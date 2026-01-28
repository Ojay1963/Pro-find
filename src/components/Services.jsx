// Our Services component
const services = [
  {
    icon: (
      <svg className="w-10 h-10 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h3.75v-4.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.5h3.75c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>
    ),
    title: 'Buy a Home',
    desc: 'Find your perfect home from our extensive collection of premium properties.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21v-2.25A2.25 2.25 0 0017.25 16.5h-10.5A2.25 2.25 0 004.5 18.75V21M12 17.25v-6m0 0l3 3m-3-3l-3 3m9-9.75v2.25m0 0A2.25 2.25 0 0117.25 7.5h-10.5A2.25 2.25 0 014.5 5.25V3" /></svg>
    ),
    title: 'Sell Property',
    desc: 'Get the best value for your property with our expert marketing and sales team.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m-7.5 0h7.5m-7.5 0a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 018.25 5.25h7.5A2.25 2.25 0 0118 7.5v11.25a2.25 2.25 0 01-2.25 2.25m-7.5 0h7.5" /></svg>
    ),
    title: 'Rent a Property',
    desc: 'Discover rental properties that suit your lifestyle and budget perfectly.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
    ),
    title: 'Property Management',
    desc: 'Professional property management services to maximize your investment returns.'
  },
];

export default function Services() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Services</h2>
        <p className="text-center text-gray-500 mb-10">Comprehensive real estate solutions tailored to your needs</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
              {service.icon}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
