// Header/Navbar component
import { useEffect, useState } from 'react';
import logo from '../assets/Untitled design.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMoon, FaSun } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { promptInstall, subscribeInstallState } from '../utils/installPrompt';
import { useI18n } from '../contexts/I18nContext';

export default function Header() {
  const { t, language, setLanguage, languages } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('profind_user_name')));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('profind_user_role') || 'seeker');
  const navigate = useNavigate();

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

  useEffect(() => {
    return subscribeInstallState((state) => {
      setCanPrompt(state.canPrompt);
      setIsInstalled(state.isInstalled);
      setShowIosHint(state.isIos && !state.isInstalled);
    });
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('profind_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
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
  const toLanguageShort = (code) => code.toUpperCase();

  return (
    <>
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenu}>
          <img src={logo} alt="Profind Logo" className="h-9 w-9 object-contain rounded-full shadow" />
          <span className="text-xl md:text-2xl font-bold text-green-700 tracking-wide">
            PROFIND
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-5 xl:gap-7 text-gray-700 font-medium text-sm xl:text-base">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-green-700 transition-colors focus:text-green-700 focus:outline-none"
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
            <svg
              className="pointer-events-none absolute right-2 h-3 w-3 text-gray-500"
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
          </div>
        </nav>

        {/* Desktop Contact & CTA */}
        <div className="hidden lg:flex 2xl:hidden items-center gap-3 shrink-0">
          {!isInstalled && (canPrompt || showIosHint) && (
            <button
              type="button"
              onClick={handleInstallApp}
              className="h-10 px-3 rounded-full border border-green-600 text-green-700 bg-white hover:bg-green-50 transition-colors text-sm font-medium"
              title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
            >
              {t('nav.installApp')}
            </button>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-green-400 transition-colors"
            aria-label={isDark ? t('header.switchToLight', 'Switch to light mode') : t('header.switchToDark', 'Switch to dark mode')}
            title={isDark ? t('header.lightMode', 'Light mode') : t('header.darkMode', 'Dark mode')}
          >
            {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
          </button>
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="btn-primary text-sm px-4 py-2 text-center whitespace-nowrap"
            >
              {t('nav.dashboard')}
            </Link>
          ) : (
            <button
              type="button"
              className="btn-primary text-sm px-4 py-2 text-center whitespace-nowrap"
              onClick={handleGetStarted}
            >
              {t('nav.getStarted')}
            </button>
          )}
        </div>

        <div className="hidden 2xl:flex items-center gap-3 flex-nowrap justify-end shrink-0">
          {!isInstalled && (canPrompt || showIosHint) && (
            <button
              type="button"
              onClick={handleInstallApp}
              className="h-10 px-3 rounded-full border border-green-600 text-green-700 bg-white hover:bg-green-50 transition-colors text-sm font-medium"
              title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
            >
              {t('nav.installApp')}
            </button>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-green-400 transition-colors"
            aria-label={isDark ? t('header.switchToLight', 'Switch to light mode') : t('header.switchToDark', 'Switch to dark mode')}
            title={isDark ? t('header.lightMode', 'Light mode') : t('header.darkMode', 'Dark mode')}
          >
            {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
          </button>
          <div className="hidden xl:flex items-center gap-2 text-gray-500">
            {[
              { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
              { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
              { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
              { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <item.icon className="text-sm" />
              </a>
            ))}
          </div>
          <div className="hidden xl:flex items-center gap-2 text-sm text-gray-600">
            <PhoneIcon />
            <span>+234 (708-220-6013)</span>
          </div>
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="btn-primary text-sm px-4 lg:px-5 py-2 text-center"
            >
              {t('nav.dashboard')}
            </Link>
          ) : (
            <button
              type="button"
              className="btn-primary text-sm px-4 lg:px-5 py-2 text-center"
              onClick={handleGetStarted}
            >
              {t('nav.getStarted')}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t('header.closeMenu', 'Close menu') : t('header.openMenu', 'Open menu')}
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Navigation */}
        {menuOpen && (
          <nav
            className="lg:hidden bg-white shadow-lg absolute top-20 left-0 w-full flex flex-col py-4 px-6 z-50 animate-fade-in"
          aria-label={t('header.mobileNavigation', 'Mobile navigation')}
          >
          {!isInstalled && (canPrompt || showIosHint) && (
            <button
              type="button"
              onClick={handleInstallApp}
              className="mb-3 inline-flex items-center justify-center gap-2 px-4 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-60"
              title={showIosHint ? t('header.iosInstallTitle', 'Use your browser Share menu and choose Add to Home Screen.') : t('header.installAppTitle', 'Install app')}
            >
              <span className="text-sm font-medium">{t('nav.installApp')}</span>
            </button>
          )}
          <div className="mb-3 px-2">
            <div className="relative inline-flex items-center">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-600"
                aria-label={t('language.label')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {toLanguageShort(item.code)}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2 h-3 w-3 text-gray-500"
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
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="mb-3 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label={isDark ? t('header.switchToLight', 'Switch to light mode') : t('header.switchToDark', 'Switch to dark mode')}
          >
            {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
            <span className="text-sm font-medium">{isDark ? t('header.lightMode', 'Light mode') : t('header.darkMode', 'Dark mode')}</span>
          </button>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="py-2 px-2 rounded hover:bg-green-50 focus:bg-green-50 focus:outline-none"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="btn-primary text-sm w-full mt-4 text-center py-2"
              onClick={closeMenu}
            >
              {t('nav.dashboard')}
            </Link>
          ) : (
            <button
              type="button"
              className="btn-primary text-sm w-full mt-4 text-center py-2"
              onClick={handleGetStarted}
            >
              {t('nav.getStarted')}
            </button>
          )}
          <div className="flex items-center gap-3 mt-4">
            {[
              { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
              { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
              { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
              { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <item.icon className="text-sm" />
              </a>
            ))}
          </div>
          </nav>
        )}
      </header>
      <div className="h-20 w-full shrink-0" aria-hidden="true" />
    </>
  );
}

// Icon Components
const MenuIcon = () => (
  <svg
    className="w-7 h-7 text-green-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
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
    className="w-5 h-5 text-green-700"
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
