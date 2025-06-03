import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }): any => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // 公共配置
  const commonConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // 可以添加更多别名
        '@/components': path.resolve(__dirname, './src/components'),
        '@/assets': path.resolve(__dirname, './src/assets'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: require('sass'),
        },
      },
    },
    // 其他公共配置...
  }

  // 开发/测试环境代理配置
  if (mode === 'development' || mode === 'test') {
    return {
      ...commonConfig,
      server: {
        // proxy: {
        //   '^/(?!assets|public)': {
        //     target: env.VITE_API_BASE_URL,
        //     changeOrigin: true,
        //     rewrite: (path: string) => path.replace(/^\/api/, ''),
        //     secure: false, // 如果是https且证书不受信任，需要设置此项
        //   },
        // },
        port: 8080, // 设置你想要的端口号
        strictPort: true, // 如果端口被占用，直接退出而不是尝试其他端口
      },
      // 开发环境特定配置...
    }
  }

  // 生产环境配置
  return {
    ...commonConfig,
    // 生产环境特定配置...
    base: '/your-base-path/', // 生产环境基础路径
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      // 其他生产构建配置...
    },
  }
})
