import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Clock, Send } from 'lucide-react'
import './Pedidos.css'

const API_URL = 'https://sapore-italiano-backend.vercel.app/api'

function Pedidos({ cliente }) {
  const [platos, setPlatos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [loading, setLoading] = useState(false)
  const [pedidoEnviado, setPedidoEnviado] = useState(false)
  const [horaRecogida, setHoraRecogida] = useState('')
  const [notas, setNotas] = useState('')

  const categorias = ['Pizza', 'Pasta', 'Hamburguesa', 'Antipasto/Entrante', 'Ensalada', 'Pollo', 'Patatas/Guarnición', 'Risotto']
  const [categoriaActual, setCategoriaActual] = useState('Pizza')

  const cargarPlatos = async (cat) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/carta/792`)
      const data = await response.json()
      const filtrados = data.filter(p => p.Categoria?.value === cat)
      setPlatos(filtrados)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useState(() => {
    cargarPlatos(categoriaActual)
  }, [])

  const addToCart = (plato) => {
    const existe = carrito.find(item => item.id === plato.id)
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === plato.id ? {...item, cantidad: item.cantidad + 1} : item
      ))
    } else {
      setCarrito([...carrito, {...plato, cantidad: 1}])
    }
  }

  const removeFromCart = (platoId) => {
    const existe = carrito.find(item => item.id === platoId)
    if (existe.cantidad > 1) {
      setCarrito(carrito.map(item => 
        item.id === platoId ? {...item, cantidad: item.cantidad - 1} : item
      ))
    } else {
      setCarrito(carrito.filter(item => item.id !== platoId))
    }
  }

  const getTotal = () => {
    return carrito.reduce((acc, item) => acc + parseFloat(item.Precio) * item.cantidad, 0)
  }

  const enviarPedido = async () => {
    if (!cliente) {
      alert('Debes iniciar sesión para hacer un pedido')
      return
    }
    if (carrito.length === 0) {
      alert('Añade platos al carrito')
      return
    }
    if (!horaRecogida) {
      alert('Indica la hora de recogida')
      return
    }

    try {
      const platosTexto = carrito.map(item => `${item.cantidad}x ${item.Plato}`).join(', ')
      
      await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Cliente: [cliente.id],
          Platos: platosTexto,
          Total: getTotal(),
          Hora_recogida: horaRecogida,
          Notas: notas
        })
      })
      
      setPedidoEnviado(true)
      setCarrito([])
    } catch (error) {
      alert('Error al enviar pedido')
    }
  }

  if (!cliente) {
    return (
      <div className="pedidos-page">
        <div className="login-required">
          <ShoppingCart size={64} />
          <h2>Debes iniciar sesión</h2>
          <p>Para hacer pedidos online necesitas estar registrado</p>
          <a href="/login" className="btn-primary">Iniciar Sesión</a>
        </div>
      </div>
    )
  }

  if (pedidoEnviado) {
    return (
      <div className="pedidos-page">
        <div className="pedido-confirmado">
          <div className="confirm-icon">✅</div>
          <h2>¡Pedido Enviado!</h2>
          <p>Tu pedido ha sido recibido</p>
          <p>Recogida: {horaRecogida}</p>
          <p className="total-display">Total: {getTotal().toFixed(2)}€</p>
          <button className="btn-primary" onClick={() => setPedidoEnviado(false)}>
            Nuevo Pedido
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pedidos-page">
      <h1>🛒 Pedidos Online - Take Away</h1>
      <p className="subtitle">Selecciona tus platos y recógelos cuando quieras</p>

      <div className="pedidos-container">
        {/* Menú */}
        <div className="menu-section">
          <div className="categorias-tabs">
            {categorias.map(cat => (
              <button 
                key={cat}
                className={categoriaActual === cat ? 'active' : ''}
                onClick={() => {
                  setCategoriaActual(cat)
                  cargarPlatos(cat)
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="platos-lista">
            {platos.map(plato => (
              <div key={plato.id} className="plato-item">
                <div className="plato-info">
                  <h3>{plato.Plato}</h3>
                  {plato.Ingredientes && <p>{plato.Ingredientes}</p>}
                </div>
                <div className="plato-actions">
                  <span className="precio">{parseFloat(plato.Precio).toFixed(2)}€</span>
                  <button className="btn-add" onClick={() => addToCart(plato)}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div className="carrito-section">
          <h2><ShoppingCart size={24} /> Tu Pedido</h2>
          
          {carrito.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="carrito-items">
                {carrito.map(item => (
                  <div key={item.id} className="carrito-item">
                    <div className="item-info">
                      <span className="item-nombre">{item.Plato}</span>
                      <span className="item-cantidad">x{item.cantidad}</span>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => removeFromCart(item.id)}><Minus size={16} /></button>
                      <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                      <span className="item-subtotal">
                        {(parseFloat(item.Precio) * item.cantidad).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="carrito-total">
                <span>Total</span>
                <span className="total-precio">{getTotal().toFixed(2)}€</span>
              </div>

              <div className="recogida-info">
                <label>
                  <Clock size={18} /> Hora de recogida:
                  <input 
                    type="time" 
                    value={horaRecogida}
                    onChange={e => setHoraRecogida(e.target.value)}
                  />
                </label>
                <label>
                  Notas adicionales:
                  <textarea 
                    value={notas}
                    onChange={e => setNotas(e.target.value)}
                    placeholder="Sin cebolla, poco picante..."
                  />
                </label>
              </div>

              <button className="btn-pedir" onClick={enviarPedido}>
                <Send size={20} />
                Enviar Pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pedidos
