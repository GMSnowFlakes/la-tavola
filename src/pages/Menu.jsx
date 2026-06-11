import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const GOLD = '#C9A84C'

const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks']

const menuItems = [
  { id: 1, name: 'Burrata Caprese', category: 'Appetizers', desc: 'Fresh burrata, heirloom tomatoes, basil pesto, balsamic glaze.', price: 18, img: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=300&q=80' },
  { id: 2, name: 'Truffle Pasta', category: 'Main Course', desc: 'Handmade pasta with black truffle, parmesan, and creamy sauce.', price: 32, img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300&q=80' },
  { id: 3, name: 'Grilled Salmon', category: 'Main Course', desc: 'Norwegian salmon with lemon butter, asparagus, and roasted potatoes.', price: 36, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80' },
  { id: 4, name: 'Filet Mignon', category: 'Main Course', desc: 'Prime beef tenderloin with mashed potatoes and bordelaise sauce.', price: 58, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80' },
  { id: 5, name: 'Tiramisu', category: 'Desserts', desc: 'Classic Italian dessert with mascarpone cream and espresso.', price: 16, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80' },
  { id: 6, name: 'Chocolate Soufflé', category: 'Desserts', desc: 'Warm soufflé with vanilla ice cream and berry compote.', price: 18, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80' },
  { id: 7, name: 'Wagyu Ribeye', category: 'Main Course', desc: 'Premium wagyu with truffle butter, seasonal vegetables, and red wine jus.', price: 68, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&q=80' },
  { id: 8, name: 'Lobster Bisque', category: 'Appetizers', desc: 'Creamy bisque with fresh lobster, tarragon, and cognac cream.', price: 24, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&q=80' },
  { id: 9, name: 'Aged Negroni', category: 'Drinks', desc: 'Barrel-aged gin, Campari, sweet vermouth, orange peel.', price: 22, img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&q=80' },
  { id: 10, name: 'Barolo 2018', category: 'Drinks', desc: 'Full-bodied Italian red with notes of cherry, rose, and leather.', price: 85, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80' },
  { id: 11, name: 'Scallops', category: 'Appetizers', desc: 'Pan-seared scallops with cauliflower purée, capers, and brown butter.', price: 28, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80' },
  { id: 12, name: 'Panna Cotta', category: 'Desserts', desc: 'Vanilla bean panna cotta with passion fruit coulis and tuile.', price: 14, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80' },
]

export default function Menu() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = menuItems.filter(item => {
    const matchCat = category === 'All' || item.category === category
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ background: '#0D0D0D', paddingTop: 80 }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0D0D0D)' }}>
        <div className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors" style={{ color: 'inherit' }}>Home</Link>
          <span className="mx-2">›</span>
          <span style={{ color: GOLD }}>Menu</span>
        </div>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Our Menu</h1>
        <div style={{ width: 50, height: 2, background: GOLD, margin: '0 auto' }} />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200"
                style={{
                  background: category === cat ? GOLD : 'transparent',
                  color: category === cat ? '#0D0D0D' : '#9ca3af',
                  border: category === cat ? `1px solid ${GOLD}` : '1px solid #333',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              style={{ background: '#1A1A1A', border: '1px solid #333', width: 220 }}
              onFocus={e => e.target.style.borderColor = GOLD}
              onBlur={e => e.target.style.borderColor = '#333'}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
          {filtered.map(item => (
            <div key={item.id} className="flex gap-4 p-5 card-hover" style={{ background: '#0D0D0D' }}>
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-sm flex-none" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-serif text-base font-semibold text-white leading-snug">{item.name}</h3>
                  <span className="text-sm font-semibold flex-none" style={{ color: GOLD }}>${item.price}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{item.desc}</p>
                <span className="text-[10px] tracking-widest uppercase px-2 py-0.5" style={{ color: GOLD, border: `1px solid rgba(201,168,76,0.3)` }}>{item.category}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 py-20 text-center text-gray-500">No dishes found.</div>
          )}
        </div>

        {/* Reserve CTA */}
        <div className="mt-16 py-12 text-center" style={{ border: `1px solid rgba(201,168,76,0.2)`, background: '#111' }}>
          <p className="text-gray-400 mb-2 text-sm">Ready to indulge?</p>
          <h3 className="font-serif text-3xl font-bold text-white mb-6">Reserve Your Table Today</h3>
          <Link
            to="/reservations"
            className="inline-block px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            style={{ background: GOLD, color: '#0D0D0D' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >
            Make a Reservation
          </Link>
        </div>
      </div>
    </div>
  )
}
