import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, Table2, Users, BarChart3, Settings, LogOut,
  Bell, Search, ChevronUp, ChevronDown, Eye, Check, X, TrendingUp, Clock
} from 'lucide-react'

const GOLD = '#C9A84C'
const DARK = '#0D0D0D'

const initialReservations = [
  { id: 1, name: 'John Doe', date: 'Jun 6, 2025', time: '7:00 PM', guests: 2, status: 'Confirmed', email: 'john@example.com' },
  { id: 2, name: 'Sarah Johnson', date: 'Jun 6, 2025', time: '6:00 PM', guests: 4, status: 'Confirmed', email: 'sarah@example.com' },
  { id: 3, name: 'Mike Rivera', date: 'Jun 6, 2025', time: '8:30 PM', guests: 6, status: 'Confirmed', email: 'mike@example.com' },
  { id: 4, name: 'Emma Lee', date: 'Jun 6, 2025', time: '7:30 PM', guests: 2, status: 'Confirmed', email: 'emma@example.com' },
  { id: 5, name: 'David Smith', date: 'Jun 6, 2025', time: '8:00 PM', guests: 5, status: 'Pending', email: 'david@example.com' },
  { id: 6, name: 'Lisa Chen', date: 'Jun 7, 2025', time: '6:30 PM', guests: 3, status: 'Pending', email: 'lisa@example.com' },
  { id: 7, name: 'Robert Kim', date: 'Jun 7, 2025', time: '9:00 PM', guests: 2, status: 'Cancelled', email: 'robert@example.com' },
  { id: 8, name: 'Maria Garcia', date: 'Jun 8, 2025', time: '7:00 PM', guests: 8, status: 'Confirmed', email: 'maria@example.com' },
]

const weekCalendar = {
  dates: ['May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17'],
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  events: [
    { day: 1, time: '12:00', name: 'John D.', color: '#C9A84C' },
    { day: 2, time: '1:00', name: 'Sarah K.', color: '#6366f1' },
    { day: 3, time: '2:30', name: 'Mike L.', color: '#C9A84C' },
    { day: 4, time: '2:30', name: 'David S.', color: '#6366f1' },
    { day: 3, time: '5:30', name: 'Anna T.', color: '#C9A84C' },
    { day: 4, time: '7:00', name: 'Jason M.', color: '#6366f1' },
    { day: 5, time: '5:00', name: 'Paul D.', color: '#C9A84C' },
    { day: 5, time: '7:00', name: 'Eve C.', color: '#6366f1' },
    { day: 6, time: '7:30', name: 'Omar Y.', color: '#C9A84C' },
  ],
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: CalendarDays, label: 'Reservations', id: 'reservations' },
  { icon: CalendarDays, label: 'Calendar', id: 'calendar' },
  { icon: Table2, label: 'Tables', id: 'tables' },
  { icon: Users, label: 'Customers', id: 'customers' },
  { icon: BarChart3, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const metrics = [
  { label: "Today's Reservations", value: 24, change: '+12% from yesterday', up: true, color: GOLD },
  { label: 'This Week', value: 156, change: '+8% from last week', up: true, color: '#6366f1' },
  { label: 'Available Tables', value: 8, change: 'Right now', up: null, color: '#22c55e' },
  { label: 'Pending Requests', value: 5, change: 'Requires attention', up: false, color: '#ef4444' },
]

const statusColor = {
  Confirmed: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e' },
  Pending: { bg: 'rgba(234,179,8,0.12)', text: '#eab308' },
  Cancelled: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444' },
}

export default function Admin() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [reservations, setReservations] = useState(initialReservations)
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const updateStatus = (id, status) => {
    setReservations(rs => rs.map(r => r.id === id ? { ...r, status } : r))
  }

  const filtered = reservations.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.date.includes(search) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300"
        style={{ width: sidebarOpen ? 220 : 64, background: '#111', borderRight: '1px solid #1e1e1e', flexShrink: 0 }}
      >
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #1e1e1e', height: 64 }}>
          <div className="w-8 h-8 flex items-center justify-center flex-none" style={{ background: GOLD }}>
            <span className="text-xs font-bold text-black">LT</span>
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-semibold text-white font-serif">La Tavola</div>
              <div className="text-[10px] text-gray-500 tracking-wider">Admin Panel</div>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
          {navItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left"
              style={{
                color: activeNav === id ? GOLD : '#9ca3af',
                background: activeNav === id ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderLeft: activeNav === id ? `2px solid ${GOLD}` : '2px solid transparent',
              }}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #1e1e1e' }}>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-4 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 h-16 flex-none" style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(o => !o)} className="text-gray-400 hover:text-white transition-colors">
              <LayoutDashboard size={18} />
            </button>
            <h1 className="text-base font-semibold text-white capitalize">
              {activeNav === 'dashboard' ? 'Dashboard' : activeNav}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                placeholder="Search..."
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveNav('reservations') }}
                className="text-sm text-white placeholder-gray-600 focus:outline-none pl-9 pr-4 py-2"
                style={{ background: '#1A1A1A', border: '1px solid #2a2a2a', width: 220 }}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: GOLD }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: GOLD }}>A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">

          {/* DASHBOARD */}
          {(activeNav === 'dashboard') && (
            <div>
              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map(m => (
                  <div key={m.label} className="p-5" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                    <div className="text-xs text-gray-500 tracking-wide mb-2">{m.label}</div>
                    <div className="text-3xl font-bold mb-1" style={{ color: m.color }}>{m.value}</div>
                    <div className="flex items-center gap-1 text-xs">
                      {m.up !== null && (
                        m.up
                          ? <TrendingUp size={12} className="text-green-400" />
                          : <ChevronDown size={12} className="text-red-400" />
                      )}
                      <span style={{ color: m.up === null ? '#666' : m.up ? '#22c55e' : '#ef4444' }}>{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendar + Recent Reservations */}
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Weekly calendar */}
                <div className="lg:col-span-2 p-5" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">Reservations Overview</h3>
                    <div className="flex gap-2">
                      {['Week', 'Month'].map(v => (
                        <button key={v} className="text-xs px-3 py-1 transition-all" style={{ background: v === 'Week' ? GOLD : 'transparent', color: v === 'Week' ? DARK : '#666', border: '1px solid #333' }}>{v}</button>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">May 11 – May 17, 2025</div>
                  <div className="grid grid-cols-7 gap-1">
                    {weekCalendar.days.map((d, i) => (
                      <div key={d} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{d}</div>
                        <div className="text-xs font-semibold mb-2" style={{ color: i === 4 ? GOLD : 'white' }}>{weekCalendar.dates[i]}</div>
                        <div className="space-y-1 min-h-24">
                          {weekCalendar.events.filter(e => e.day === i).map((ev, j) => (
                            <div key={j} className="text-[10px] px-1.5 py-1 truncate" style={{ background: `${ev.color}20`, color: ev.color, border: `1px solid ${ev.color}40` }}>
                              <div className="text-gray-500">{ev.time}</div>
                              <div className="truncate">{ev.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent reservations mini */}
                <div className="p-5" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                  <h3 className="text-sm font-semibold text-white mb-4">Recent Reservations</h3>
                  <div className="space-y-3">
                    {reservations.slice(0, 6).map(r => (
                      <div key={r.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e1e1e' }}>
                        <div>
                          <div className="text-sm text-white font-medium">{r.name}</div>
                          <div className="text-xs text-gray-500">{r.time} · {r.guests} guests</div>
                        </div>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 tracking-wide"
                          style={{ background: statusColor[r.status].bg, color: statusColor[r.status].text }}
                        >
                          {r.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESERVATIONS TABLE */}
          {(activeNav === 'reservations' || search) && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">All Reservations</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{filtered.length} results</span>
                </div>
              </div>

              <div style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                        {['Name', 'Date & Time', 'Guests', 'Status', 'Action'].map(h => (
                          <th key={h} className="text-left text-xs tracking-widest uppercase text-gray-500 px-4 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(r => (
                        <tr key={r.id} className="transition-colors" style={{ borderBottom: '1px solid #161616' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#161616'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-white">{r.name}</div>
                            <div className="text-xs text-gray-500">{r.email}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-white">{r.date}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} />{r.time}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-white">{r.guests}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2.5 py-1" style={{ background: statusColor[r.status].bg, color: statusColor[r.status].text }}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 hover:text-gold text-gray-400 transition-colors" title="View"><Eye size={14} /></button>
                              {r.status !== 'Confirmed' && (
                                <button onClick={() => updateStatus(r.id, 'Confirmed')} className="p-1.5 text-green-500 hover:text-green-400 transition-colors" title="Approve"><Check size={14} /></button>
                              )}
                              {r.status !== 'Cancelled' && (
                                <button onClick={() => updateStatus(r.id, 'Cancelled')} className="p-1.5 text-red-500 hover:text-red-400 transition-colors" title="Cancel"><X size={14} /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CALENDAR */}
          {activeNav === 'calendar' && !search && (
            <div className="p-6" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
              <h2 className="text-base font-semibold text-white mb-6">Calendar View</h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                  <div key={d} className="text-xs text-gray-500 py-2 font-medium tracking-wider">{d}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6
                  const hasEvent = [3,5,8,12,15,18,22,25,28].includes(day)
                  return (
                    <div key={i} className="min-h-16 p-2 rounded-sm" style={{ background: day >= 1 && day <= 30 ? '#1A1A1A' : 'transparent' }}>
                      {day >= 1 && day <= 30 && (
                        <>
                          <div className="text-sm mb-1" style={{ color: day === 15 ? GOLD : '#9ca3af', fontWeight: day === 15 ? 700 : 400 }}>{day}</div>
                          {hasEvent && <div className="text-[10px] px-1 py-0.5 truncate" style={{ background: 'rgba(201,168,76,0.15)', color: GOLD }}>booking</div>}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TABLES */}
          {activeNav === 'tables' && !search && (
            <div>
              <h2 className="text-base font-semibold text-white mb-5">Table Management</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 16 }, (_, i) => {
                  const statuses = ['Available', 'Occupied', 'Reserved', 'Available']
                  const status = statuses[i % 4]
                  const colors = { Available: '#22c55e', Occupied: '#ef4444', Reserved: GOLD }
                  return (
                    <div key={i} className="p-5 text-center" style={{ background: '#111', border: `1px solid ${colors[status]}30` }}>
                      <div className="text-2xl font-serif font-bold text-white mb-1">T{i + 1}</div>
                      <div className="text-xs mb-2 text-gray-500">{2 + (i % 4) * 2} seats</div>
                      <div className="text-xs font-semibold px-2 py-0.5 inline-block" style={{ color: colors[status], background: `${colors[status]}15` }}>{status}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {activeNav === 'customers' && !search && (
            <div>
              <h2 className="text-base font-semibold text-white mb-5">Customers</h2>
              <div className="space-y-2">
                {[...new Set(reservations.map(r => r.name))].map(name => {
                  const res = reservations.filter(r => r.name === name)
                  return (
                    <div key={name} className="flex items-center justify-between p-4" style={{ background: '#111', border: '1px solid #1e1e1e' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: GOLD }}>{name[0]}</div>
                        <div>
                          <div className="text-sm font-medium text-white">{name}</div>
                          <div className="text-xs text-gray-500">{res[0].email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white">{res.length} visit{res.length > 1 ? 's' : ''}</div>
                        <div className="text-xs" style={{ color: GOLD }}>Regular</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* REPORTS / SETTINGS placeholders */}
          {(activeNav === 'reports' || activeNav === 'settings') && !search && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <BarChart3 size={40} className="mx-auto mb-3 opacity-30" />
                <p className="capitalize">{activeNav} — Coming Soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
