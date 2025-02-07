import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/richfood-my-react/', 
  build: {
    outDir: 'dist', // 確保構建輸出到 'dist' 文件夾
  },
  plugins: [react()],
})
