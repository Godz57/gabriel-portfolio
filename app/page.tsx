import { Hero } from '@/components/Hero'
import { ProofBar } from '@/components/ProofBar'
import { getSiteConfig } from '@/lib/content'

export default function Home() {
  const site = getSiteConfig()

  return (
    <div>
      <Hero name={site.name} tagline={site.tagline} githubUrl={site.github} />
      <ProofBar items={site.proofItems} />
      {/* Remaining home sections: cases, method, OSS, CTA — later tasks */}
    </div>
  )
}
