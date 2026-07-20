import path from 'node:path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile (e.g. C:\Users\Gabriel\package-lock.json)
  turbopack: {
    root: path.join(__dirname),
  },
  // Heavy/CJS packages stay external on the server (cleaner SSR under Turbopack)
  serverExternalPackages: ['react-markdown', 'remark-gfm'],
}

export default withNextIntl(nextConfig)
