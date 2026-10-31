import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Font di-bundle sendiri (tanpa request ke domain pihak ketiga) agar tidak ada
// ketergantungan eksternal dan tidak ada FOUT dari luar.
import '@fontsource-variable/newsreader'
import '@fontsource-variable/ibm-plex-sans'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
