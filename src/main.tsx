import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Font di-bundle sendiri (tanpa request ke Google Fonts) agar tidak ada
// ketergantungan pihak ketiga dan tidak ada FOUT dari domain eksternal.
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
