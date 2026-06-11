import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, CalendarDays, Clock, Users, MessageSquare } from 'lucide-react'

const GOLD = '#C9A84C'
const DARK = '#0D0D0D'

const TIMES = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM']
const UNAVAILABLE = ['6:00 PM', '8:00 PM']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function Reservations() {
  const today = new Date()
  const [step, setStep] = useState(1)
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [guests, setGuests] = useState('2')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [confirmed, setConfirmed] = useState(false)
  const [resNum] = useState('LT-' + Date.now().toString().slice(-8))

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const isPast = (day) => new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmed(true)
  }

  const selectedDateStr = selectedDate
    ? `${MONTHS[month]} ${selectedDate}, ${year}`
    : null

  if (confirmed) {
    return (
      <div style={{ background: DARK, paddingTop: 80, minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(201,168,76,0.15)', border: `2px solid ${GOLD}` }}>
            <Check size={36} style={{ color: GOLD }} />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white mb-3">Reservation Confirmed!</h2>
          <p className="text-gray-400 mb-10">Thank you, {form.name}. Your table has been reserved.</p>

          <div className="p-8 mb-8 text-left" style={{ background: '#1A1A1A', border: '1px solid #333' }}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">Reservation Number</div>
                <div className="font-semibold text-white">{resNum}</div>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">Date &amp; Time</div>
                <div className="font-semibold text-white">{selectedDateStr} at {selectedTime}</div>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">Guests</div>
                <div className="font-semibold text-white">{guests} Guests</div>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">Contact</div>
                <div className="font-semibold text-white">{form.email}</div>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-8">A confirmation email has been sent to your email address.</p>
          <button
            onClick={() => { setConfirmed(false); setStep(1); setSelectedDate(null); setSelectedTime(null); setForm({ name:'', email:'', phone:'', notes:'' }) }}
            className="px-8 py-3 text-sm font-semibold tracking-widest uppercase border transition-all duration-200"
            style={{ borderColor: GOLD, color: GOLD }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DARK }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GOLD }}
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: DARK, paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0D0D0D)' }}>
        <div className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-2">
          Home <span className="mx-1">›</span> <span style={{ color: GOLD }}>Reservations</span>
        </div>
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Make a Reservation</h1>
        <div style={{ width: 50, height: 2, background: GOLD, margin: '0 auto' }} />
      </div>

      {/* Steps indicator */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-center gap-0">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                  style={{ background: step >= s ? GOLD : '#1A1A1A', color: step >= s ? DARK : '#555', border: `2px solid ${step >= s ? GOLD : '#333'}` }}
                >
                  {step > s ? <Check size={16} /> : s}
                </div>
                <span className="text-xs mt-1.5 tracking-wider" style={{ color: step >= s ? GOLD : '#555' }}>
                  {['Select', 'Details', 'Confirm'][s - 1]}
                </span>
              </div>
              {i < 2 && <div className="w-20 h-px mx-2 mb-4" style={{ background: step > s ? GOLD : '#333' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-20">
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="p-6" style={{ background: '#111', border: '1px solid #222' }}>
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-1 hover:text-gold text-gray-400 transition-colors"><ChevronLeft size={18} /></button>
                <h3 className="font-semibold text-white">{MONTHS[month]} {year}</h3>
                <button onClick={nextMonth} className="p-1 hover:text-gold text-gray-400 transition-colors"><ChevronRight size={18} /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map(d => <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array(firstDay).fill(null).map((_, i) => <div key={i} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    disabled={isPast(day)}
                    onClick={() => setSelectedDate(day)}
                    className="h-9 w-full text-sm rounded-sm transition-all duration-150 font-medium"
                    style={{
                      background: selectedDate === day ? GOLD : 'transparent',
                      color: isPast(day) ? '#333' : selectedDate === day ? DARK : today.getDate() === day && today.getMonth() === month ? GOLD : '#d1d5db',
                      cursor: isPast(day) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Times + Guests */}
            <div className="space-y-6">
              <div className="p-6" style={{ background: '#111', border: '1px solid #222' }}>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Clock size={16} style={{ color: GOLD }} /> Available Times</h3>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {TIMES.map(t => {
                      const isUnavail = UNAVAILABLE.includes(t)
                      return (
                        <button
                          key={t}
                          disabled={isUnavail}
                          onClick={() => setSelectedTime(t)}
                          className="py-2 text-sm font-medium transition-all duration-150"
                          style={{
                            background: selectedTime === t ? GOLD : isUnavail ? '#111' : '#1A1A1A',
                            color: selectedTime === t ? DARK : isUnavail ? '#333' : '#d1d5db',
                            border: `1px solid ${selectedTime === t ? GOLD : isUnavail ? '#222' : '#333'}`,
                            cursor: isUnavail ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Please select a date first.</p>
                )}
              </div>

              <div className="p-6" style={{ background: '#111', border: '1px solid #222' }}>
                <div className="flex items-center gap-2 mb-4"><Users size={16} style={{ color: GOLD }} /><h3 className="font-semibold text-white">Number of Guests</h3></div>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full py-2.5 px-3 text-sm text-white focus:outline-none"
                  style={{ background: '#1A1A1A', border: '1px solid #333' }}
                  onFocus={e => e.target.style.borderColor = GOLD}
                  onBlur={e => e.target.style.borderColor = '#333'}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                </select>
              </div>

              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="w-full py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                style={{
                  background: selectedDate && selectedTime ? GOLD : '#222',
                  color: selectedDate && selectedTime ? DARK : '#444',
                  cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="p-8" style={{ background: '#111', border: '1px solid #222' }}>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Your Details</h3>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
              ].map(f => (
                <div key={f.key} className="mb-4">
                  <label className="text-xs tracking-widest uppercase text-gray-400 block mb-2">{f.label}{f.required && ' *'}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={{ background: '#1A1A1A', border: '1px solid #333' }}
                    onFocus={e => e.target.style.borderColor = GOLD}
                    onBlur={e => e.target.style.borderColor = '#333'}
                  />
                </div>
              ))}
              <div className="mb-6">
                <label className="text-xs tracking-widest uppercase text-gray-400 block mb-2 flex items-center gap-1"><MessageSquare size={12} /> Special Requests (Optional)</label>
                <textarea
                  placeholder="Any special requests or preferences?"
                  value={form.notes}
                  onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none resize-none"
                  style={{ background: '#1A1A1A', border: '1px solid #333' }}
                  onFocus={e => e.target.style.borderColor = GOLD}
                  onBlur={e => e.target.style.borderColor = '#333'}
                />
              </div>

              {/* Summary */}
              <div className="p-4 mb-6 rounded-sm" style={{ background: '#0D0D0D', border: `1px solid rgba(201,168,76,0.25)` }}>
                <div className="text-xs tracking-widest uppercase mb-3" style={{ color: GOLD }}>Booking Summary</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-500">Date</span><span className="text-white">{selectedDateStr}</span>
                  <span className="text-gray-500">Time</span><span className="text-white">{selectedTime}</span>
                  <span className="text-gray-500">Guests</span><span className="text-white">{guests}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 text-sm font-semibold tracking-widest uppercase border transition-all duration-200" style={{ borderColor: '#333', color: '#888' }}>
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                  style={{ background: GOLD, color: DARK }}
                  onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
                  onMouseLeave={e => e.currentTarget.style.background = GOLD}
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
