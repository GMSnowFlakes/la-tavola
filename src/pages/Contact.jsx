import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Camera, Globe, X } from 'lucide-react'

const GOLD = '#C9A84C'
const DARK = '#0D0D0D'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div style={{ background: DARK, paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0D0D0D)' }}>
        <div className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-2">
          Home <span className="mx-1">›</span> <span style={{ color: GOLD }}>Contact</span>
        </div>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Get In Touch</h1>
        <div style={{ width: 50, height: 2, background: GOLD, margin: '0 auto' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">We'd Love to Hear From You</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Whether you have a question about our menu, want to plan a special event, or simply need directions — we're here to help.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: MapPin, label: 'Address', value: '123 Culinary Street, Gastronome City, GC 53345' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: Mail, label: 'Email', value: 'info@latavola.com' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-none" style={{ border: `1px solid rgba(201,168,76,0.3)` }}>
                    <Icon size={16} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest uppercase text-gray-500 mb-0.5">{label}</div>
                    <div className="text-sm text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="p-6 mb-8" style={{ background: '#111', border: '1px solid #222' }}>
              <div className="flex items-center gap-2 mb-4"><Clock size={16} style={{ color: GOLD }} /><h3 className="font-semibold text-white text-sm tracking-wide">Hours of Operation</h3></div>
              <div className="space-y-2 text-sm">
                {[['Monday – Friday', '12:00 PM – 11:00 PM'], ['Saturday', '11:00 AM – 11:00 PM'], ['Sunday', '11:00 AM – 10:00 PM']].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between text-gray-400">
                    <span>{day}</span><span>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative overflow-hidden" style={{ height: 200, background: '#111', border: '1px solid #222' }}>
              <iframe
                title="map"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=New+York,+NY&z=13&output=embed"
              />
            </div>

            <div className="flex gap-3 mt-6">
              {[Camera, Globe, X].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center border transition-all duration-200" style={{ borderColor: '#333', color: '#888' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="p-8" style={{ background: '#111', border: '1px solid #222' }}>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Send a Message</h3>

              {sent ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,168,76,0.15)', border: `2px solid ${GOLD}` }}>
                    <Send size={24} style={{ color: GOLD }} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="text-xs tracking-widest uppercase font-semibold" style={{ color: GOLD }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
                    { key: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?', required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs tracking-widest uppercase text-gray-500 block mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none"
                        style={{ background: '#1A1A1A', border: '1px solid #333' }}
                        onFocus={e => e.target.style.borderColor = GOLD}
                        onBlur={e => e.target.style.borderColor = '#333'}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs tracking-widest uppercase text-gray-500 block mb-2">Message</label>
                    <textarea
                      required rows={5}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none resize-none"
                      style={{ background: '#1A1A1A', border: '1px solid #333' }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = '#333'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                    style={{ background: GOLD, color: DARK }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
                    onMouseLeave={e => e.currentTarget.style.background = GOLD}
                  >
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
