import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("VITE_NEWS_API_KEY:", process.env.VITE_NEWS_API_KEY); // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
