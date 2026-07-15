import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile (e.g. C:\Users\Gabriel\package-lock.json)
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
