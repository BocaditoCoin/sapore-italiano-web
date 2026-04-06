import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Carta from './pages/Carta'
import Pedidos from './pages/Pedidos'
import ListaDeseos from './pages/ListaDeseos'
import Login from './pages/Login'
import Registro from './pages/Registro'

function App() {
  const [cliente, setCliente] = useState(() => {
    const saved = localStorage.getItem('sapore_cliente')
    return saved ? JSON.parse(saved) : null
  })

  const logout = () => {
    localStorage.removeItem('sapore_cliente')
    setCliente(null)
  }

  return (
    <Router>
      <Layout cliente={cliente} logout={logout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/pedidos" element={<Pedidos cliente={cliente} />} />
          <Route path="/deseos" element={<ListaDeseos cliente={cliente} />} />
          <Route path="/login" element={<Login setCliente={setCliente} />} />
          <Route path="/registro" element={<Registro setCliente={setCliente} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
