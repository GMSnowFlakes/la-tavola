import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Star, Award, Leaf, Users, Sparkles, ArrowRight } from 'lucide-react'

const GOLD = '#C9A84C'
const DARK = '#0D0D0D'

const dishes = [
  { name: 'Wagyu Ribeye', desc: 'Premium wagyu with truffle butter, seasonal vegetables, and red wine jus.', price: '$68', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
  { name: 'Lobster Risotto', desc: 'Creamy arborio rice with fresh lobster, saffron, and parmesan.', price: '$42', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
  { name: 'Chocolate Soufflé', desc: 'Warm chocolate soufflé with vanilla ice cream and berry compote.', price: '$18', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
  { name: 'Truffle Pasta', desc: 'Handmade pasta with black truffle, parmesan, and creamy sauce.', price: '$32', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80' },
  { name: 'Grilled Salmon', desc: 'Norwegian salmon with lemon butter, asparagus, and roasted potatoes.', price: '$36', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80' },
]

const reviews = [
  { name: 'Alexandra B.', rating: 5, text: 'Absolutely outstanding! The food, service, and ambiance are breathtaking. We can\'t wait to come back!', img: 'https://i.pravatar.cc/60?img=47' },
  { name: 'James W.', rating: 5, text: 'The best dining experience I\'ve ever had. Every dish was a work of art. Highly recommend La Tavola!', img: 'https://i.pravatar.cc/60?img=11' },
  { name: 'Sophie L.', rating: 5, text: 'Exceptional in every way. From the moment we walked in, we knew this was something special.', img: 'https://i.pravatar.cc/60?img=25' },
]

const gallery = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
]

const stats = [
  { icon: Award, label: 'Award Winning', sub: 'Chef & Cuisine' },
  { icon: Leaf, label: 'Fresh Ingredients', sub: 'Farm to Table' },
  { icon: Sparkles, label: 'Perfect Ambience', sub: 'For Every Occasion' },
  { icon: Users, label: 'Exceptional Service', sub: 'Always at Your Table' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)

  const prev = () => setSlide(s => (s === 0 ? dishes.length - 3 : s - 1))
  const next = () => setSlide(s => (s >= dishes.length - 3 ? 0 : s + 1))

  useEffect(() => {
    const id = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: DARK }}>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85)', filter: 'brightness(0.55)' }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-xs tracking-[0.4em] uppercase font-medium mb-5 block" style={{ color: GOLD }}>Welcome to La Tavola</span>
          </div>
          <h1
            className="font-serif font-bold text-white mb-6 animate-fade-up leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', animationDelay: '0.2s' }}
          >
            A Culinary Experience<br />Like No Other
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto animate-fade-up leading-relaxed" style={{ animationDelay: '0.35s' }}>
            Exquisite dishes crafted with passion, served in an ambiance of timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link
              to="/reservations"
              className="px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
              style={{ background: GOLD, color: DARK }}
              onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 text-sm font-semibold tracking-widest uppercase border transition-all duration-200"
              style={{ borderColor: '#fff', color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
            >
              View Menu
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#111', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4">
                <Icon size={20} style={{ color: GOLD, flexShrink: 0 }} />
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold block mb-3" style={{ color: GOLD }}>Our Signature Dishes</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Handcrafted with Passion</h2>
          <span className="gold-line block mt-3" style={{ width: 50, height: 2, background: GOLD, margin: '14px auto 0' }} />
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${slide * (100 / 3)}% - ${slide * 8}px))` }}
            >
              {dishes.map(d => (
                <div
                  key={d.name}
                  className="card-hover flex-none rounded-sm overflow-hidden"
                  style={{ width: 'calc(33.333% - 16px)', minWidth: 260, background: '#1A1A1A' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-white mb-2">{d.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{d.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: GOLD }}>{d.price}</span>
                      <Link to="/menu" className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prev} className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-gold bg-dark-100 transition-all duration-200 z-10">
            <ChevronLeft size={18} style={{ color: GOLD }} />
          </button>
          <button onClick={next} className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-gold bg-dark-100 transition-all duration-200 z-10">
            <ChevronRight size={18} style={{ color: GOLD }} />
          </button>
        </div>
      </section>

      {/* About / Story */}
      <section className="py-24" style={{ background: '#111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase font-semibold block mb-3" style={{ color: GOLD }}>Our Story</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Passion for Culinary Excellence</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                La Tavola is more than a restaurant — it's a celebration of flavors, traditions, and memories. Our chef sources the finest ingredients to create dishes that delight all the senses.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Founded in 2010, we have been serving guests from around the world with a commitment to quality, creativity, and warm Italian hospitality.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-colors"
                style={{ color: GOLD }}
                onMouseEnter={e => e.currentTarget.style.color = '#E8C97A'}
                onMouseLeave={e => e.currentTarget.style.color = GOLD}
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80"
                alt="Chef at work"
                className="w-full h-96 object-cover rounded-sm"
              />
              <div
                className="absolute -bottom-6 -left-6 p-6 font-serif text-white text-lg italic"
                style={{ background: '#0D0D0D', border: `1px solid rgba(201,168,76,0.3)` }}
              >
                "Chef Marco Russo"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold block mb-3" style={{ color: GOLD }}>Gallery</span>
          <h2 className="font-serif text-4xl font-bold text-white">A Glimpse of La Tavola</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((src, i) => (
            <div key={i} className="overflow-hidden aspect-square">
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24" style={{ background: '#111' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold block mb-3" style={{ color: GOLD }}>What Our Guests Say</span>
          <h2 className="font-serif text-4xl font-bold text-white mb-14">Memorable Experiences</h2>

          <div className="relative min-h-48">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700 flex flex-col items-center"
                style={{ opacity: i === reviewIdx ? 1 : 0, transform: i === reviewIdx ? 'translateY(0)' : 'translateY(12px)', pointerEvents: i === reviewIdx ? 'auto' : 'none' }}
              >
                <div className="flex gap-1 mb-5">
                  {Array(r.rating).fill(0).map((_, j) => <Star key={j} size={16} fill={GOLD} style={{ color: GOLD }} />)}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic max-w-2xl">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm font-medium text-white">— {r.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)} className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: i === reviewIdx ? GOLD : '#444' }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1200 0%, #0D0D0D 50%, #1a0f00 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold block mb-4" style={{ color: GOLD }}>Visit Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">We'd Love to Welcome You</h2>
          <p className="text-gray-400 mb-10">Book your table today and experience a culinary journey unlike any other.</p>
          <Link
            to="/reservations"
            className="inline-block px-10 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
            style={{ background: GOLD, color: DARK }}
            onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}
          >
            Reserve Your Table
          </Link>
        </div>
      </section>
    </div>
  )
}
