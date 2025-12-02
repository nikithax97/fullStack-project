import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    environment: "jsdom",              // so DOM APIs like document/window exist
    setupFiles: "./src/setupTests.js",  // the file you created earlier
  },
});
