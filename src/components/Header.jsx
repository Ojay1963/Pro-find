// Header/Navbar component
import { useEffect, useState } from 'react';
import logo from '../assets/Untitled design.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('profind_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  // Check if user is logged in (in real app, use auth context)
  const isLoggedIn = localStorage.getItem('profind_user_name');

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenu}>
          <img src={logo} alt="Profind Logo" className="h-9 w-9 object-contain rounded-full shadow" />
          <span className="text-2xl font-bold text-green-700 tracking-wide">
            PROFIND
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
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
        </nav>

        {/* Desktop Contact & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-green-400 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
          </button>
          <div className="hidden lg:flex items-center gap-2 text-gray-500">
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
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PhoneIcon />
            <span>+234 (708-220-6013)</span>
          </div>
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="btn-primary text-sm px-5 py-2 text-center"
            >
              Dashboard
            </Link>
          ) : (
            <a
              href="#"
              className="btn-primary text-sm px-5 py-2 text-center"
              onClick={handleGetStarted}
            >
              Get Started
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          className="md:hidden bg-white shadow-lg absolute top-20 left-0 w-full flex flex-col py-4 px-6 z-50 animate-fade-in"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="mb-3 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-600" />}
            <span className="text-sm font-medium">{isDark ? 'Light mode' : 'Dark mode'}</span>
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
          <a
            href="#"
            className="btn-primary text-sm w-full mt-4 text-center py-2"
            onClick={handleGetStarted}
          >
            Get Started
          </a>
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
