import { z } from "zod";

export const getProvider = z.object({
  provider: z.string(),
});

export type TgetProviderResponse = z.infer<typeof getProvider>;
