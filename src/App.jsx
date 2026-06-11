import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/menu" element={<><Navbar /><Menu /><Footer /></>} />
          <Route path="/reservations" element={<><Navbar /><Reservations /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
