import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/800.css"; // Specify weight
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
