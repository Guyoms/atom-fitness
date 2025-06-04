declare module 'next-pwa' {
  import { NextConfig } from 'next'
  
  interface PWAConfig {
    dest?: string
    disable?: boolean
    register?: boolean
    skipWaiting?: boolean
    runtimeCaching?: Array<{
      urlPattern: string | RegExp
      handler: string
      options?: Record<string, unknown>
    }>
  }
  
  function nextPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig

  export default nextPWA
} 