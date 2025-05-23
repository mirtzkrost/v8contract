import { z } from "zod";

const getBanks = z.object({
  page: z.number(),
  limit: z.number(),
});

export const banksQueriesEntriesSchemas = z.object({
  getBanks,
});

export type TbanksQueriesEntries = z.infer<typeof banksQueriesEntriesSchemas>;
