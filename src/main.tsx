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

  const audio = new Audio("audio/BACKGROUND.wav");
  audio.loop = true;

const loopBackground = () => {
  audio.play();
}

window.addEventListener("scroll", loopBackground, {passive: true});
window.addEventListener("pointermove", loopBackground, {passive: true});
window.addEventListener("click", loopBackground, {passive: true});
window.addEventListener("touchstart", loopBackground, {passive: true});
