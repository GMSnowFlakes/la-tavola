import { Link } from 'react-router-dom'
import { Camera, Globe, X, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-serif text-2xl font-bold text-white mb-1">La Tavola</div>
            <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: '#C9A84C' }}>Fine Dining</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A celebration of flavors, tradition, and memories. Where every dish tells a story.
            </p>
            <div className="flex gap-3">
              {[Camera, Globe, X].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-gold hover:text-gold text-gray-400 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold text-white mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/reservations', 'Reservations'], ['/contact', 'Contact'], ['/admin', 'Admin Dashboard']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold text-white mb-5">Hours</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><Clock size={14} className="mt-0.5 shrink-0" style={{ color: '#C9A84C' }} /><span>Mon–Fri: 12:00 PM – 11:00 PM</span></li>
              <li className="flex items-start gap-2"><Clock size={14} className="mt-0.5 shrink-0" style={{ color: '#C9A84C' }} /><span>Sat–Sun: 11:00 AM – 11:00 PM</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold text-white mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#C9A84C' }} /><span>123 Culinary Street, Gastronome City, GC 53345</span></li>
              <li className="flex items-center gap-2"><Phone size={14} style={{ color: '#C9A84C' }} /><span>+1 (555) 123-4567</span></li>
              <li className="flex items-center gap-2"><Mail size={14} style={{ color: '#C9A84C' }} /><span>info@latavola.com</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© 2025 La Tavola Fine Dining. All rights reserved.</span>
          <span>Crafted with passion for culinary excellence.</span>
        </div>
      </div>
    </footer>
  )
}
