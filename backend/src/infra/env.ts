import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    BACKEND_APP_PORT: z.coerce.number(),
    DATABASE_URL: z.coerce.string(),
})

const getEnv = envSchema.safeParse(process.env)

if (!getEnv.success) {
  const errorMessage = 'load environment failed'
  console.error(errorMessage, getEnv.error.format())
  throw new Error(errorMessage)
}

export const env = getEnv.data

