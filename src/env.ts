import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_API_CONTRACT_LINK: z.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (_env.success === false) {
  console.error("❌ invalid environment!", _env.error.format());

  throw new Error("invalid environment.");
}

export const env = _env.data;
