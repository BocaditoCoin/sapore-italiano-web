import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Utensils, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import './Layout.css'

function Layout({ cliente, logout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/carta', icon: Utensils, label: 'Carta' },
    { path: '/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { path: '/deseos', icon: Heart, label: 'Mi Lista' },
  ]

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🍝</span>
            <span className="logo-text">Sapore Italiano</span>
          </Link>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {cliente ? (
              <div className="user-menu">
                <span className="user-name">{cliente.nombre}</span>
                <button className="btn-logout" onClick={logout}>Salir</button>
              </div>
            ) : (
              <Link to="/login" className="nav-link primary" onClick={() => setMenuOpen(false)}>
                <User size={16} />
                <span>Entrar</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">🍝 Sapore Italiano</div>
            <p>Auténtica cocina italiana</p>
            <p>en el corazón de Coín, Málaga</p>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <a href="tel:637068182">📞 637 06 81 82</a>
            <a href="mailto:info@saporeitaliano.es">✉ info@saporeitaliano.es</a>
          </div>
          
          <div className="footer-section">
            <h3>Horario</h3>
            <p>Lun - Jue: 12:00 - 23:00</p>
            <p>Vie - Sáb: 12:00 - 00:00</p>
            <p>Domingo: 12:00 - 23:00</p>
          </div>
          
          <div className="footer-section">
            <h3>Ubicación</h3>
            <p>Plaza la Alameda 32</p>
            <p>29100 Coín, Málaga</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Sapore Italiano. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
