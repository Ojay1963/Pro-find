import { Link } from 'react-router-dom'
import { FaBolt, FaCheckCircle, FaChartLine, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa'
import { useI18n } from '../contexts/I18nContext'

export default function Hero() {
  const { t } = useI18n()
  const aiBullets = t('hero.aiBullets', [])
  const bulletList = Array.isArray(aiBullets) ? aiBullets : []
  const heroImage = 'https://images.unsplash.com/photo-1594538756542-8c88bda491c5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/20 to-slate-950/55" />
      </div>
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-500/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl animate-float-slower" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-28 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6 text-left animate-fade-left" style={{ animationDelay: '60ms' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-green-100 animate-pop-in"
            style={{ animationDelay: '120ms' }}
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            {t('hero.badge')}
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight animate-fade-left"
            style={{ animationDelay: '160ms' }}
          >
            {t('hero.titleBefore')} <span className="text-green-300">{t('hero.titleHighlight')}</span>{' '}
            {t('hero.titleAfter')}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-xl animate-fade-left" style={{ animationDelay: '220ms' }}>
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-3 animate-pop-in" style={{ animationDelay: '280ms' }}>
            <Link to="/properties" className="btn-primary">
              {t('hero.explore')}
            </Link>
            <Link to="/contact" className="btn-secondary text-white border-white/40 hover:bg-white/10">
              {t('hero.advisor')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-100">
            {[
              { label: t('hero.stats.verifiedListings'), value: '1,200+' },
              { label: t('hero.stats.activeBuyers'), value: '9,000+' },
              { label: t('hero.stats.trustedAgents'), value: '340+' }
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

        <div
          className="space-y-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg shadow-2xl animate-fade-right"
          style={{ animationDelay: '140ms' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/20 text-green-200">
              <FaBolt />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-100">{t('hero.aiMatch')}</p>
              <p className="text-lg font-semibold">{t('hero.aiTitle')}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            {[
              { icon: FaCheckCircle, text: bulletList[0] || '' },
              { icon: FaMapMarkedAlt, text: bulletList[1] || '' },
              { icon: FaChartLine, text: bulletList[2] || '' },
              { icon: FaShieldAlt, text: bulletList[3] || '' }
            ]
              .filter((item) => item.text)
              .map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 text-green-300" />
                  <p>{item.text}</p>
                </div>
              ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{t('hero.popularSearches')}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Lekki', 'Ikoyi', 'Wuse 2', 'Enugu GRA'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
