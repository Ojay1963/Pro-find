// Footer component
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="site-footer w-full bg-gray-900 text-white pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-green-400 mb-2 block">PROFIND</span>
            <p className="text-gray-400 mb-4 text-sm">Your trusted partner in finding the perfect property. Making dreams come true since 2009.</p>
            <div className="flex gap-3 mt-3">
              <a
                href="https://facebook.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:text-green-400 hover:bg-gray-700 focus:text-green-400 focus:outline-none transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Home</Link></li>
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Properties</Link></li>
              <li><Link to="/about" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">About Us</Link></li>
              <li><Link to="/services" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Services</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Contact</Link></li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Buy Property</Link></li>
              <li><Link to="/create-listing" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Sell Property</Link></li>
              <li><Link to="/properties" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Rent Property</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Property Management</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 focus:text-green-400 focus:outline-none transition-colors block py-1">Consulting</Link></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-2">Subscribe to get the latest property updates</p>
            <form className="flex flex-col sm:flex-row gap-2 w-full">
              <input type="email" className="px-3 py-2 rounded bg-gray-800 text-white text-sm border-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto" placeholder="Your email" />
              <button className="btn-primary px-4 py-2 text-sm w-full sm:w-auto mt-2 sm:mt-0">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
          © 2026 Profind. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
}


