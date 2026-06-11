import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold text-white tracking-wide">La Tavola</span>
            <span className="text-[10px] tracking-[0.35em] text-gold uppercase">Fine Dining</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200"
                style={{ color: pathname === l.to ? '#C9A84C' : '#d1d5db' }}
                onMouseEnter={e => e.target.style.color = '#C9A84C'}
                onMouseLeave={e => e.target.style.color = pathname === l.to ? '#C9A84C' : '#d1d5db'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin" className="text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors mr-2">
              Admin
            </Link>
            <Link
              to="/reservations"
              className="text-xs tracking-widest uppercase font-semibold px-5 py-2.5 border transition-all duration-200"
              style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0D0D0D' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
            >
              Reserve a Table
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-6 pt-2 border-t border-white/10">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="block py-3 text-sm tracking-widest uppercase font-medium"
                style={{ color: pathname === l.to ? '#C9A84C' : '#d1d5db' }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/admin" className="block py-3 text-sm tracking-widest uppercase text-gray-500">Admin</Link>
            <Link
              to="/reservations"
              className="mt-3 block text-center py-3 text-xs tracking-widest uppercase font-semibold"
              style={{ background: '#C9A84C', color: '#0D0D0D' }}
            >
              Reserve a Table
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
