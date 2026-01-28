import React from 'react';

const testimonials = [
    {
        name: 'Chinedu Okafor',
        image: 'https://plus.unsplash.com/premium_photo-1692241090972-8ea8f9a5da6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZSUyMG5pZ2VyaWElMjBtZW58ZW58MHx8MHx8fDA%3D',
        text: 'Profind made my house search so easy! I found the perfect home for my family in Lagos. Highly recommended!',
        location: 'Lagos, Nigeria',
    },
    {
        name: 'Ngozi Adeyemi',
        image: 'https://plus.unsplash.com/premium_photo-1692873058899-624c0f96c5de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG5pZ2VyaWF8ZW58MHx8MHx8fDA%3D',
        text: 'The agents on Profind are very professional and trustworthy. I felt safe throughout the process.',
        location: 'Abuja, Nigeria',
    },
    {
        name: 'Emeka Uche',
        image: 'https://images.unsplash.com/photo-1544813813-2c73bec209ca?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        text: 'I was able to compare properties and get the best deal. Profind is the best property platform in Nigeria!',
        location: 'Port Harcourt, Nigeria',
    },
];

export default function Testimonials() {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-green-700">What People Say About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-black bg-black"
                                style={{ backgroundColor: '#000' }}
                            />
                            <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                            <span className="font-semibold text-green-600">{t.name}</span>
                            <span className="text-sm text-gray-500">{t.location}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
