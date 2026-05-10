import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home' // Importando sua página Home
import './index.css' // Importando o Tailwind v4

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)