import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // we want to use css modules
  css: {  // because if two css files have the same style with the same name they usually
    modules: {  // overwrite each other but "CSS modules" allows us to have multiple css files
      localsConvention: "camelCase"
    } // using the same class names but the styles won't overwrite each other as long
  } // as they are imported into seperate react files.
  // we also rename the src/App.css to src/App.module.css to use "CSS module"
})
