import { useEffect, useMemo, useState } from 'react';
import logo from '../assets/Untitled design.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkedAlt,
  FaMoon,
  FaSearch,
  FaSun,
  FaThLarge,
  FaTimes,
  FaTwitter,
  FaUserCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { promptInstall, subscribeInstallState } from '../utils/installPrompt';
import { useI18n } from '../contexts/I18nContext';

export default function Header() {
  const { t, language, setLanguage, languages } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('profind_user_name')));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('profind_user_role') || 'seeker');
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false
  );

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('profind_user_name')));
      setUserRole(localStorage.getItem('profind_user_role') || 'seeker');
    };

    syncAuthState();
    window.addEventListener('profind-auth-changed', syncAuthState);
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('focus', syncAuthState);

    return () => {
      window.removeEventListener('profind-auth-changed', syncAuthState);
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('focus', syncAuthState);
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('profind_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  useEffect(() => subscribeInstallState((state) => {
    setCanPrompt(state.canPrompt);
    setIsInstalled(state.isInstalled);
    setShowIosHint(state.isIos && !state.isInstalled);
  }), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncMobileView = (event) => {
      setIsMobileView(event.matches);
      document.body.classList.toggle('profind-mobile-shell', event.matches);
      if (!event.matches) {
        setMenuOpen(false);
      }
    };

    syncMobileView(mediaQuery);
    mediaQuery.addEventListener('change', syncMobileView);

    return () => {
      document.body.classList.remove('profind-mobile-shell');
      mediaQuery.removeEventListener('change', syncMobileView);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileView) {
      document.body.style.removeProperty('overflow');
      return undefined;
    }

    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isMobileView, menuOpen]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('profind_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleGetStarted = (event) => {
    event.preventDefault();
    navigate('/register');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleInstallApp = async () => {
    if (isInstalled) return;
    if (showIosHint && !canPrompt) {
      toast(t('install.iosHint'));
      return;
    }
    const result = await promptInstall();
    if (result.status === 'unavailable') {
      toast(t('install.unavailable'));
      return;
    }
    if (result.status === 'dismissed') {
      toast(t('install.dismissed'));
    }
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/properties', label: t('nav.properties') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/contact', label: t('nav.contact') },
    ...(isLoggedIn && (userRole === 'agent' || userRole === 'owner') ? [{ to: '/upgrade', label: t('nav.upgrade') }] : []),
  ];

  const mobileTabs = useMemo(() => [
    { to: '/', label: t('nav.home'), icon: FaHome, match: (path) => path === '/' },
    { to: '/properties', label: t('nav.properties'), icon: FaSearch, match: (path) => path.startsWith('/properties') || path.startsWith('/property/') },
    { to: '/properties/map', label: t('propertiesPage.mapView', 'Map'), icon: FaMapMarkedAlt, match: (path) => path.startsWith('/properties/map') },
    {
      to: isLoggedIn ? '/messages' : '/services',
      label: isLoggedIn ? t('nav.messages', 'Messages') : t('nav.services'),
      icon: FaThLarge,
      match: (path) => (isLoggedIn ? path.startsWith('/messages') : path.startsWith('/services'))
    },
    {
      to: isLoggedIn ? '/dashboard' : '/login',
      label: isLoggedIn ? t('nav.dashboard') : t('nav.login', 'Login'),
      icon: FaUserCircle,
      match: (path) => (isLoggedIn ? path.startsWith('/dashboard') : path.startsWith('/login'))
    }
  ], [isLoggedIn, t]);

  const routeMeta = getMobileRouteMeta(location.pathname, {
    t,
    isLoggedIn,
    userRole
  });

  const toLanguageShort = (code) => code.toUpperCase();

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/60 bg-white/88 shadow-sm backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/88">
        <div className="container mx-auto hidden h-20 items-center justify-between gap-4 px-4 lg:flex">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" onClick={closeMenu}>
            <img src={logo} alt="Profind Logo" className="h-9 w-9 rounded-full object-contain shadow" />
            <span className="text-xl font-bold tracking-wide text-green-700">
              PROFIND
            </span>
          </Link>

          <nav className="flex gap-5 text-sm font-medium text-gray-700 xl:gap-7 xl:text-base">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="transition-colors hover:text-green-700 focus:text-green-700 focus:outline-none"
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <div className="relative inline-flex items-center">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="appearance-none rounded-md border border-gray-300 bg-white py-1 pl-2 pr-7 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-600"
                aria-label={t('language.label')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {toLanguageShort(item.code)}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </nav>

          <div className="hidden items-center gap-3 shrink-0 2xl:hidden lg:flex">
            {!isInstalled && (canPrompt || showIosHint) && (
              <button
                type="button"
                onClick={handleInstallApp}
                className="h-10 rounded-full border border-green-600 bg-white px-3 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
              >
                {t('nav.installApp')}
              </button>
            )}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} />
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn-primary whitespace-nowrap px-4 py-2 text-center text-sm">
                {t('nav.dashboard')}
              </Link>
            ) : (
              <button type="button" className="btn-primary whitespace-nowrap px-4 py-2 text-center text-sm" onClick={handleGetStarted}>
                {t('nav.getStarted')}
              </button>
            )}
          </div>

          <div className="hidden items-center justify-end gap-3 shrink-0 2xl:flex">
            {!isInstalled && (canPrompt || showIosHint) && (
              <button
                type="button"
                onClick={handleInstallApp}
                className="h-10 rounded-full border border-green-600 bg-white px-3 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
              >
                {t('nav.installApp')}
              </button>
            )}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} />
            <div className="hidden items-center gap-2 text-gray-500 xl:flex">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-green-50 hover:text-green-600"
                >
                  <item.icon className="text-sm" />
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-2 text-sm text-gray-600 xl:flex">
              <PhoneIcon />
              <span>+234 (708-220-6013)</span>
            </div>
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn-primary px-4 py-2 text-center text-sm lg:px-5">
                {t('nav.dashboard')}
              </Link>
            ) : (
              <button type="button" className="btn-primary px-4 py-2 text-center text-sm lg:px-5" onClick={handleGetStarted}>
                {t('nav.getStarted')}
              </button>
            )}
          </div>
        </div>

        <div className="container mx-auto flex h-[4.75rem] items-center justify-between gap-3 px-4 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to={routeMeta.leadingAction?.to || '/'}
              onClick={closeMenu}
              className="mobile-app-icon-button"
              aria-label={routeMeta.leadingAction?.label || t('nav.home')}
            >
              {routeMeta.leadingAction?.icon ? <routeMeta.leadingAction.icon className="text-base" /> : <FaHome className="text-base" />}
            </Link>
            <div className="min-w-0">
              <p className="truncate text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-green-600/90">
                {routeMeta.eyebrow}
              </p>
              <h1 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                {routeMeta.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {routeMeta.quickAction ? (
              <Link
                to={routeMeta.quickAction.to}
                className="mobile-app-icon-button"
                aria-label={routeMeta.quickAction.label}
                onClick={closeMenu}
              >
                <routeMeta.quickAction.icon className="text-base" />
              </Link>
            ) : null}
            <button
              type="button"
              className="mobile-app-icon-button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? t('header.closeMenu', 'Close menu') : t('header.openMenu', 'Open menu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes className="text-base" /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && isMobileView ? (
          <div className="lg:hidden">
            <button
              type="button"
              className="absolute inset-0 top-[4.75rem] h-[calc(100dvh-4.75rem)] w-full bg-slate-950/35 backdrop-blur-[1px]"
              onClick={closeMenu}
              aria-label={t('header.closeMenu', 'Close menu')}
            />
            <nav
              className="absolute inset-x-3 top-[5.25rem] z-50 flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/96 p-4 shadow-2xl backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-950/96"
              aria-label={t('header.mobileNavigation', 'Mobile navigation')}
            >
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 px-4 py-4 text-white shadow-lg">
                <img src={logo} alt="Profind Logo" className="h-11 w-11 rounded-2xl bg-white/20 p-1 object-contain" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/75">{t('nav.installApp')}</p>
                  <p className="truncate text-sm font-semibold">{t('header.mobileNavigation', 'Mobile navigation')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {!isInstalled && (canPrompt || showIosHint) && (
                  <button
                    type="button"
                    onClick={handleInstallApp}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-600 px-4 py-3 text-sm font-medium text-green-700 transition-colors hover:bg-green-50 disabled:opacity-60"
                    title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
                  >
                    <FaHome className="text-sm" />
                    <span>{t('nav.installApp')}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900"
                  aria-label={isDark ? t('header.switchToLight', 'Switch to light mode') : t('header.switchToDark', 'Switch to dark mode')}
                >
                  {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600 dark:text-slate-200" />}
                  <span>{isDark ? t('header.lightMode', 'Light mode') : t('header.darkMode', 'Dark mode')}</span>
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-gray-200 bg-slate-50/85 p-3 dark:border-slate-700 dark:bg-slate-900/80">
                <div className="relative inline-flex w-full items-center">
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    aria-label={t('language.label')}
                  >
                    {languages.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label || toLanguageShort(item.code)}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
                {navLinks.map(({ to, label }) => {
                  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'bg-transparent text-slate-700 hover:bg-green-50 dark:text-slate-200 dark:hover:bg-slate-900'
                      }`}
                      onClick={closeMenu}
                    >
                      <span>{label}</span>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>Open</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-slate-800">
                {isLoggedIn ? (
                  <Link to="/dashboard" className="btn-primary block w-full py-3 text-center text-sm" onClick={closeMenu}>
                    {t('nav.dashboard')}
                  </Link>
                ) : (
                  <button type="button" className="btn-primary w-full py-3 text-center text-sm" onClick={handleGetStarted}>
                    {t('nav.getStarted')}
                  </button>
                )}
                <div className="mt-4 flex items-center justify-center gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-green-50 hover:text-green-600 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                      <item.icon className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <div className="h-[4.75rem] w-full shrink-0 lg:h-20" aria-hidden="true" />

      <div className="mobile-bottom-nav lg:hidden">
        <div className="mobile-bottom-nav__inner">
          {mobileTabs.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `mobile-bottom-nav__item ${
                  isActive || item.match(location.pathname) ? 'mobile-bottom-nav__item--active' : ''
                }`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

function ThemeToggle({ isDark, toggleTheme, t }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:border-green-400"
      aria-label={isDark ? t('header.switchToLight', 'Switch to light mode') : t('header.switchToDark', 'Switch to dark mode')}
      title={isDark ? t('header.lightMode', 'Light mode') : t('header.darkMode', 'Dark mode')}
    >
      {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
    </button>
  );
}

function getMobileRouteMeta(pathname, { t, isLoggedIn, userRole }) {
  if (pathname.startsWith('/properties/map')) {
    return {
      eyebrow: 'Profind',
      title: t('propertiesPage.mapView', 'Map view'),
      leadingAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch },
      quickAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch }
    };
  }

  if (pathname.startsWith('/properties') || pathname.startsWith('/property/')) {
    return {
      eyebrow: 'Profind',
      title: t('nav.properties'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/properties/map', label: t('propertiesPage.mapView', 'Map'), icon: FaMapMarkedAlt }
    };
  }

  if (pathname.startsWith('/dashboard')) {
    return {
      eyebrow: userRole === 'agent' || userRole === 'owner' ? 'Workspace' : 'Account',
      title: t('nav.dashboard'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/messages', label: t('nav.messages', 'Messages'), icon: FaThLarge }
    };
  }

  if (pathname.startsWith('/messages')) {
    return {
      eyebrow: 'Inbox',
      title: t('nav.messages', 'Messages'),
      leadingAction: { to: isLoggedIn ? '/dashboard' : '/', label: isLoggedIn ? t('nav.dashboard') : t('nav.home'), icon: isLoggedIn ? FaUserCircle : FaHome },
      quickAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch }
    };
  }

  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/verify-otp') || pathname.startsWith('/reset-password')) {
    return {
      eyebrow: 'Account',
      title: pathname.startsWith('/login') ? t('nav.login', 'Login') : t('nav.getStarted'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch }
    };
  }

  if (pathname.startsWith('/services')) {
    return {
      eyebrow: 'Profind',
      title: t('nav.services'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/contact', label: t('nav.contact'), icon: FaThLarge }
    };
  }

  if (pathname.startsWith('/contact')) {
    return {
      eyebrow: 'Support',
      title: t('nav.contact'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch }
    };
  }

  if (pathname.startsWith('/about')) {
    return {
      eyebrow: 'Profind',
      title: t('nav.about'),
      leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
      quickAction: { to: '/services', label: t('nav.services'), icon: FaThLarge }
    };
  }

  if (pathname.startsWith('/upgrade')) {
    return {
      eyebrow: 'Pro',
      title: t('nav.upgrade'),
      leadingAction: { to: '/dashboard', label: t('nav.dashboard'), icon: FaUserCircle },
      quickAction: { to: '/create-listing', label: t('nav.createListing', 'Create listing'), icon: FaThLarge }
    };
  }

  return {
    eyebrow: 'Profind',
    title: t('nav.home'),
    leadingAction: { to: '/', label: t('nav.home'), icon: FaHome },
    quickAction: { to: '/properties', label: t('nav.properties'), icon: FaSearch }
  };
}

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
];

const MenuIcon = () => (
  <svg
    className="h-5 w-5 text-green-700 dark:text-emerald-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 text-green-700"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75l9.72 7.29a.75.75 0 00.84 0l9.72-7.29"
    />
  </svg>
);
