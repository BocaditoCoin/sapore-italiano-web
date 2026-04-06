import { useState, useEffect } from 'react'
import { Heart, Trash2, Loader } from 'lucide-react'
import './ListaDeseos.css'

const API_URL = 'https://sapore-italiano-backend.vercel.app/api'

function ListaDeseos({ cliente }) {
  const [deseos, setDeseos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cliente) {
      loadDeseos()
    }
  }, [cliente])

  const loadDeseos = async () => {
    try {
      const response = await fetch(`${API_URL}/deseos`)
      const data = await response.json()
      // Filtrar por cliente
      const misDeseos = data.filter(d => 
        d.Cliente && d.Cliente.some(c => c.id === cliente.id)
      )
      setDeseos(misDeseos)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const eliminarDeseo = async (id) => {
    try {
      await fetch(`${API_URL}/deseos/${id}`, { method: 'DELETE' })
      setDeseos(deseos.filter(d => d.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (!cliente) {
    return (
      <div className="deseos-page">
        <div className="login-required">
          <Heart size={64} />
          <h2>Inicia sesión</h2>
          <p>Para ver tu lista de deseos necesitas estar registrado</p>
          <a href="/login" className="btn-primary">Iniciar Sesión</a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" size={40} />
        <p>Cargando lista...</p>
      </div>
    )
  }

  return (
    <div className="deseos-page">
      <div className="deseos-header">
        <h1>❤️ Mi Lista de Deseos</h1>
        <p>Platos que quieres probar. ¡Muéstrale esta lista al camarero!</p>
      </div>

      {deseos.length === 0 ? (
        <div className="empty-deseos">
          <Heart size={64} />
          <h2>Tu lista está vacía</h2>
          <p>Añade platos desde la carta para recordarlos</p>
          <a href="/carta" className="btn-primary">Ver Carta</a>
        </div>
      ) : (
        <div className="deseos-grid">
          {deseos.map(deseo => (
            <div key={deseo.id} className="deseo-card">
              <div className="deseo-content">
                <h3>{deseo.Plato?.[0]?.value || 'Plato'}</h3>
                {deseo.Plato?.[0]?.Ingredientes && (
                  <p>{deseo.Plato[0].Ingredientes}</p>
                )}
                <span className="deseo-precio">
                  {deseo.Plato?.[0]?.Precio ? `${parseFloat(deseo.Plato[0].Precio).toFixed(2)}€` : ''}
                </span>
              </div>
              <button 
                className="btn-delete"
                onClick={() => eliminarDeseo(deseo.id)}
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="deseos-footer">
        <p>💡 <strong>Tip:</strong> Muestra esta lista al camarero para pedir tus platos favoritos</p>
      </div>
    </div>
  )
}

export default ListaDeseos
