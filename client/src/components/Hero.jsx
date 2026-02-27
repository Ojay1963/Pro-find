// Hero section component

import { Link } from 'react-router-dom';
import { FaBolt, FaCheckCircle, FaChartLine, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950" />
      </div>
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-500/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl animate-float-slower" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-28 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6 text-left animate-fade-left" style={{ animationDelay: '60ms' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-green-100 animate-pop-in" style={{ animationDelay: '120ms' }}>
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Nigeria&apos;s verified property network
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight animate-fade-left" style={{ animationDelay: '160ms' }}>
            Find your next <span className="text-green-300">dream home</span> with confidence.
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-xl animate-fade-left" style={{ animationDelay: '220ms' }}>
            Browse trusted listings, compare neighborhoods, and connect with verified agents across
            Nigeria — all from one intelligent marketplace.
          </p>

          <div className="flex flex-wrap gap-3 animate-pop-in" style={{ animationDelay: '280ms' }}>
            <Link to="/properties" className="btn-primary">
              Explore Listings
            </Link>
            <Link to="/contact" className="btn-secondary text-white border-white/40 hover:bg-white/10">
              Talk to an Advisor
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-100">
            {[
              { label: 'Verified Listings', value: '1,200+' },
              { label: 'Active Buyers', value: '9,000+' },
              { label: 'Trusted Agents', value: '340+' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 animate-pop-in"
                style={{ animationDelay: `${320 + index * 120}ms` }}
              >
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg shadow-2xl animate-fade-right" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/20 text-green-200">
              <FaBolt />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-100">AI Match</p>
              <p className="text-lg font-semibold">Personalized listings in seconds</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            {[
              { icon: FaCheckCircle, text: 'Verified agents and transparent pricing data.' },
              { icon: FaMapMarkedAlt, text: 'Neighborhood insights and commute scoring.' },
              { icon: FaChartLine, text: 'Market pulse with real-time demand trends.' },
              { icon: FaShieldAlt, text: 'Secure scheduling and vetted property tours.' }
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon className="mt-0.5 text-green-300" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Popular Searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Lekki', 'Ikoyi', 'Wuse 2', 'Enugu GRA'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
