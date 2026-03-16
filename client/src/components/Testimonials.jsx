import React from 'react'
import { useI18n } from '../contexts/I18nContext'

const testimonials = [
    {
        name: 'Chinedu Okafor',
        image: 'https://plus.unsplash.com/premium_photo-1692241090972-8ea8f9a5da6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZSUyMG5pZ2VyaWElMjBtZW58ZW58MHx8MHx8fDA%3D',
        textKey: 'testimonialsSection.items.0.text',
        locationKey: 'testimonialsSection.items.0.location',
    },
    {
        name: 'Ngozi Adeyemi',
        image: 'https://plus.unsplash.com/premium_photo-1692873058899-624c0f96c5de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG5pZ2VyaWF8ZW58MHx8MHx8fDA%3D',
        textKey: 'testimonialsSection.items.1.text',
        locationKey: 'testimonialsSection.items.1.location',
    },
    {
        name: 'Emeka Uche',
        image: 'https://images.unsplash.com/photo-1544813813-2c73bec209ca?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        textKey: 'testimonialsSection.items.2.text',
        locationKey: 'testimonialsSection.items.2.location',
    },
]

export default function Testimonials() {
    const { t } = useI18n()

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-green-700">{t('testimonialsSection.title', 'What People Say About Us')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center rounded-xl bg-white p-6 shadow dark:border dark:border-slate-700 dark:bg-slate-900">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-black bg-black"
                                style={{ backgroundColor: '#000' }}
                            />
                            <p className="mb-4 italic text-slate-700 dark:text-slate-300">"{t(item.textKey, '') || ''}"</p>
                            <span className="font-semibold text-green-600">{item.name}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-300">{t(item.locationKey, '') || ''}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
