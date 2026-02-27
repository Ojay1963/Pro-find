import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

export default function SocialFloat() {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-3">
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
          className="h-11 w-11 rounded-full bg-white/90 shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
        >
          <item.icon />
        </a>
      ))}
    </div>
  )
}
