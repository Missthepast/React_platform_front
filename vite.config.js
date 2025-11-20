import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    // 智能判断：
    // 如果是开发环境 (npm run dev)，使用根路径 '/'
    // 如果是生产构建 (npm run build/deploy)，使用仓库路径 '/React_platform_front/'
    base: isDev ? '/' : '/React_platform_front/',
  }
})