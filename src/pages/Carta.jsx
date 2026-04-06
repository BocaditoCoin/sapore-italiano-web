import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Heart, Loader } from 'lucide-react'
import './Carta.css'

const API_URL = 'https://sapore-italiano-backend.vercel.app/api'

function Carta() {
  const [platos, setPlatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({})
  const [cartaTakeAway, setCartaTakeAway] = useState(true) // Toggle entre carta

  useEffect(() => {
    loadCarta()
  }, [cartaTakeAway])

  const loadCarta = async () => {
    try {
      setLoading(true)
      const tableId = cartaTakeAway ? '792' : '791' // Take Away o Carta restaurante
      const response = await fetch(`${API_URL}/carta/${tableId}`)
      const data = await response.json()
      setPlatos(data)
      
      // Expandir primera sección por defecto
      if (data.length > 0) {
        const primeraCategoria = data[0].Categoria?.value
        if (primeraCategoria) {
          setExpandedSections({ [primeraCategoria]: true })
        }
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Agrupar por categoría
  const platosPorCategoria = platos.reduce((acc, plato) => {
    const cat = plato.Categoria?.value || 'Otros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(plato)
    return acc
  }, {})

  const toggleSection = (categoria) => {
    setExpandedSections(prev => ({
      ...prev,
      [categoria]: !prev[categoria]
    }))
  }

  const getEmojiCategoria = (cat) => {
    const emojis = {
      'Antipasto/Entrante': '🥗',
      'Risotto': '🍚',
      'Pizza': '🍕',
      'Pasta': '🍝',
      'Hamburguesa': '🍔',
      'Patatas/Guarnición': '🍟',
      'Pollo': '🍗',
      'Ensalada': '🥬',
      'Carne': '🥩',
      'Pescado': '🐟',
      'Postre': '🍰',
      'Fritos/Acompañamientos': '🍟'
    }
    return emojis[cat] || '🍽️'
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={40} />
        <p>Cargando carta...</p>
      </div>
    )
  }

  return (
    <div className="carta-page">
      <div className="carta-header">
        <h1>📋 Nuestra Carta</h1>
        <p>Descubre todos nuestros platos preparados con ingredientes frescos y auténticos</p>
        
        <div className="carta-toggle">
          <button 
            className={cartaTakeAway ? 'active' : ''} 
            onClick={() => setCartaTakeAway(true)}
          >
            🛵 Take Away
          </button>
          <button 
            className={!cartaTakeAway ? 'active' : ''} 
            onClick={() => setCartaTakeAway(false)}
          >
            🍽️ Restaurante
          </button>
        </div>
      </div>

      <div className="carta-container">
        {Object.entries(platosPorCategoria).map(([categoria, platosCat]) => (
          <div key={categoria} className="categoria-section">
            <button 
              className="categoria-header"
              onClick={() => toggleSection(categoria)}
            >
              <div className="categoria-title">
                <span className="categoria-emoji">{getEmojiCategoria(categoria)}</span>
                <span>{categoria}</span>
                <span className="categoria-count">{platosCat.length} platos</span>
              </div>
              {expandedSections[categoria] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            
            {expandedSections[categoria] && (
              <div className="platos-grid">
                {platosCat.map(plato => (
                  <div key={plato.id} className="plato-card">
                    <div className="plato-header">
                      <h3>{plato.Plato}</h3>
                      <span className="plato-precio">{parseFloat(plato.Precio).toFixed(2)}€</span>
                    </div>
                    {plato.Ingredientes && (
                      <p className="plato-ingredientes">{plato.Ingredientes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="carta-footer">
        <p>📞 Para pedidos llama al <a href="tel:637068182">637 06 81 82</a></p>
        <p>🛵 Hacer pedido online en la sección <a href="/pedidos">Pedidos</a></p>
      </div>
    </div>
  )
}

export default Carta
