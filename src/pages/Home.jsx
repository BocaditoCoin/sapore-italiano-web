import { Link } from 'react-router-dom'
import { Utensils, ShoppingCart, Phone, MapPin, Clock } from 'lucide-react'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-icon">🍝</div>
          <h1>Sapore Italiano</h1>
          <p className="hero-subtitle">Auténtica cocina italiana en el corazón de Coín</p>
          <div className="hero-divider"></div>
          <div className="hero-buttons">
            <Link to="/carta" className="btn-hero primary">
              <Utensils size={18} />
              Ver Carta
            </Link>
            <Link to="/pedidos" className="btn-hero secondary">
              <ShoppingCart size={18} />
              Pedir Online
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-header">
          <h2>Nuestra Esencia</h2>
          <p>Tradición italiana con pasión mediterránea</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍕</div>
            <h3>Pizza Artesanal</h3>
            <p>Masa fermentada 72 horas, horneada a 450°C con ingredientes de Italia</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🍝</div>
            <h3>Pastas Frescas</h3>
            <p>Elaboradas diariamente con salsas tradicionales de la nonna</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🍷</div>
            <h3>Vinos Selectos</h3>
            <p>Carta de vinos italianos y locales cuidadosamente seleccionados</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛵</div>
            <h3>Take Away</h3>
            <p>Pide online y recoge tu pedido cuando quieras</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="about-content">
          <h2>La Tradición</h2>
          <p>
            En Sapore Italiano, cada plato cuenta una historia. Desde nuestras pizzas artesanales 
            hasta las pastas más tradicionales, todo está preparado con ingredientes frescos 
            y el amor que solo la cocina italiana puede ofrecer.
          </p>
          <p>
            Un rincón de Italia en el corazón de Coín, donde cada visita es un viaje 
            a los sabores auténticos del Mediterráneo.
          </p>
          <Link to="/carta" className="btn-hero primary">
            Descubrir Menú
          </Link>
        </div>
        <div className="about-image">
          <span>🍕</span>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="section-header">
          <h2>Encuéntranos</h2>
          <p>Plaza la Alameda 32, Coín (Málaga)</p>
          <div className="section-divider"></div>
        </div>
        
        <div className="map-container">
          <div className="map-info">
            <h3>Información</h3>
            
            <div className="map-info-item">
              <span className="map-info-icon">📍</span>
              <div>
                <h4>Ubicación</h4>
                <p>Plaza la Alameda 32, 29100 Coín, Málaga</p>
              </div>
            </div>
            
            <div className="map-info-item">
              <span className="map-info-icon">📞</span>
              <div>
                <h4>Teléfono</h4>
                <a href="tel:637068182">637 06 81 82</a>
              </div>
            </div>
            
            <div className="map-info-item">
              <span className="map-info-icon">🕐</span>
              <div>
                <h4>Horario</h4>
                <p>Lun-Jue: 12:00-23:00</p>
                <p>Vie-Sáb: 12:00-00:00</p>
                <p>Domingo: 12:00-23:00</p>
              </div>
            </div>
          </div>
          
          <div className="map-frame">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.1!2d-4.75!3d36.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM5JzM2LjAiTiA0wrA0NScwMC4wIlc!5e0!3m2!1ses!2ses!4v1"
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
        <p>Haz tu pedido online y recoge cuando quieras</p>
        <Link to="/pedidos" className="btn-hero primary">
          <ShoppingCart size={18} />
          Hacer Pedido
        </Link>
      </section>
    </div>
  )
}

export default Home
