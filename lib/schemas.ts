import { z } from 'zod'

export const proofItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const ossRepoSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  blurb: z.string().min(1),
})

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(10),
  github: z.string().url(),
  linkedin: z.string().url().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional(),
  proofItems: z.array(proofItemSchema).min(3),
  ossRepos: z.array(ossRepoSchema).min(3),
  methodSteps: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .length(4),
})

export type SiteConfig = z.infer<typeof siteConfigSchema>

export const caseFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  audience: z.array(z.enum(['recruiter', 'freelance', 'oss'])).min(1),
  stack: z.array(z.string().min(1)).min(1),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  order: z.number().int().positive(),
})

export type CaseFrontmatter = z.infer<typeof caseFrontmatterSchema>

export type CaseDocument = CaseFrontmatter & {
  body: string
}
