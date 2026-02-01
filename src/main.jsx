import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Apex300Landing from './pages/Apex300Landing.jsx'
import Apex300Product from './pages/Apex300Product.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/voltnest">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/npex-600" element={<Apex300Landing />} />
        <Route path="/npex-600/product" element={<Apex300Product />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
