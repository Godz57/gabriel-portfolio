import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile (e.g. C:\Users\Gabriel\package-lock.json)
  turbopack: {
    root: path.join(__dirname),
  },
  // Heavy/CJS packages stay external on the server (cleaner SSR under Turbopack)
  serverExternalPackages: ['react-markdown', 'remark-gfm'],
}

export default nextConfig
