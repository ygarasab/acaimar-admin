import vue from '@vitejs/plugin-vue'
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [vue()],
    define:{
        __API_URL__: JSON.stringify(env.VITE_API_BASE_URL)
	},
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL || 'http://localhost:7072',
        changeOrigin: true
      }
    }
  }
}})
