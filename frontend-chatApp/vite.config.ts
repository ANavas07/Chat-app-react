import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cambia al puerto que prefieras
    open: true, // Abre automáticamente el navegador
    host: true, // Asegúrate de que escuche en todas las IPs
  },
})
