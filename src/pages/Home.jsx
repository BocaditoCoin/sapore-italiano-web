import { Link } from 'react-router-dom'
import { Utensils, ShoppingCart, MapPin, Phone, Clock } from 'lucide-react'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <span className="hero-badge">🌟 Auténtica cocina italiana</span>
          <h1>Sapore Italiano</h1>
          <p>Donde cada plato cuenta una historia de tradición, pasión y sabores auténticos de Italia</p>
          <div className="hero-buttons">
            <Link to="/carta" className="btn-hero primary">
              <Utensils size={24} />
              Ver la Carta
            </Link>
            <Link to="/pedidos" className="btn-hero secondary">
              <ShoppingCart size={24} />
              Pedir Online
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🍕</div>
            <h3>Pizzas Artesanales</h3>
            <p>Masa fresca horneada al momento con ingredientes importados directamente de Italia</p>
          </div>
          
          <div className="feature-card fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="feature-icon">🍝</div>
            <h3>Pastas Caseras</h3>
            <p>Recetas tradicionales italianas preparadas con amor y los mejores ingredientes</p>
          </div>
          
          <div className="feature-card fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="feature-icon">🍷</div>
            <h3>Ambiente Acogedor</h3>
            <p>Disfruta de una experiencia única en el corazón de Coín con terraza exterior</p>
          </div>
          
          <div className="feature-card fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="feature-icon">🛵</div>
            <h3>Take Away</h3>
            <p>Pide online y recoge tu pedido cuando quieras. ¡Sabor italiano a domicilio!</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>📍 Encuéntranos</h2>
        <div className="map-container">
          <div className="map-info">
            <h3>Plaza la Alameda 32, Coín</h3>
            <p>
              <MapPin size={18} style={{display: 'inline', marginRight: '8px'}} />
              En el corazón de Coín, Málaga
            </p>
            <p>
              <Phone size={18} style={{display: 'inline', marginRight: '8px'}} />
              <a href="tel:637068182">637 06 81 82</a>
            </p>
            <p>
              <Clock size={18} style={{display: 'inline', marginRight: '8px'}} />
              Lun-Jue: 12:00-23:00 | Vie-Sáb: 12:00-00:00
            </p>
            <p style={{marginTop: '1.5rem'}}>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Plaza+la+Alameda+32+Coin+Malaga" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-hero primary"
                style={{display: 'inline-flex'}}
              >
                🚀 Cómo llegar
              </a>
            </p>
          </div>
          <div className="map-frame">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.123456789!2d-4.75!3d36.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM5JzM2LjAiTiA0wrA0NScwMC4wIlc!5e0!3m2!1ses!2ses!4v1234567890"
              allowFullScreen="" 
              loading="lazy"
              title="Ubicación Sapore Italiano"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>¿Listo para disfrutar?</h2>
        <p>Haz tu pedido online y ten tu comida lista cuando llegues</p>
        <Link to="/pedidos" className="btn-hero primary">
          <ShoppingCart size={24} />
          Hacer Pedido Online
        </Link>
      </section>
    </div>
  )
}

export default Home
