import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        // target: "https://carentalv-1.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
