import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import './Auth.css'

function Registro({ setCliente }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://sapore-italiano-backend.vercel.app/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nombre: formData.nombre,
          Email: formData.email,
          Telefono: formData.telefono,
          Password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        const clienteData = {
          id: data.id,
          nombre: formData.nombre,
          email: formData.email
        }
        localStorage.setItem('sapore_cliente', JSON.stringify(clienteData))
        setCliente(clienteData)
        window.location.href = '/pedidos'
      } else {
        setError('Error al registrar. Intenta de nuevo.')
      }
    } catch (error) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🍕</span>
          <h1>Crear Cuenta</h1>
          <p>Únete a la familia Sapore Italiano</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <User size={20} />
            <input 
              type="text" 
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={e => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <Mail size={20} />
            <input 
              type="email" 
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <span className="input-icon">📱</span>
            <input 
              type="tel" 
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={e => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          <div className="form-group">
            <Lock size={20} />
            <input 
              type="password" 
              placeholder="Contraseña"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <Lock size={20} />
            <input 
              type="password" 
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro
