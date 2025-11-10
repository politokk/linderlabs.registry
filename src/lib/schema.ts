import { z } from "zod"

export const registryCategorySchema = z.object({
  name: z.string(),
  label: z.string(),
  title: z.string(),
  icon: z.string(),
})

export const registryItemFileSchema = z.object({
  path: z.string(),
  type: z.string(),
  target: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  category: z.string().optional(),
  icon: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  cssVars: z
    .object({
      light: z.record(z.string()).optional(),
      dark: z.record(z.string()).optional(),
    })
    .optional(),
})

export const registrySchema = z.object({
  name: z.string(),
  homepage: z.string().optional(),
  categories: z.array(registryCategorySchema),
  items: z.array(registryItemSchema),
})

export type RegistryCategory = z.infer<typeof registryCategorySchema>
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
export type Registry = z.infer<typeof registrySchema>
