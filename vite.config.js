import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],

    // Base path configuration
    base: isDev ? '/' : '/React_platform_front/',

    // Build optimization
    build: {
      // Output directory
      outDir: 'dist',

      // Generate sourcemaps for production debugging (optional, disable for smaller builds)
      sourcemap: false,

      // Chunk size warning limit (KB)
      chunkSizeWarningLimit: 500,

      // Minification using esbuild (Vite's default, faster than terser)
      minify: 'esbuild',

      // Rollup options for advanced bundling
      rollupOptions: {
        output: {
          // Manual chunks - split vendors for better caching
          manualChunks: {
            // React core libraries
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],

            // Ant Design libraries
            'antd-vendor': ['antd', '@ant-design/icons', '@ant-design/pro-components'],

            // Utility libraries
            'utils-vendor': ['axios', 'lucide-react']
          },

          // Asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            } else if (/woff|woff2/.test(extType)) {
              extType = 'fonts';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },

          // Chunk file naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    },

    // Esbuild options for minification
    esbuild: {
      drop: isDev ? [] : ['console', 'debugger'],
    },

    // Server configuration for development
    server: {
      port: 5173,
      open: false,
      // Enable CORS if needed
      cors: true
    },

    // Preview server configuration
    preview: {
      port: 4173,
      open: false
    }
  }
})