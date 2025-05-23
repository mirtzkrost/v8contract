import { z } from "zod";

const banksData = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  ispb: z.string(),
  isTurbo: z.boolean(),
  createdAt: z.string(),
  updateAt: z.string(),
  deleteAt: z.string(),
  test: z.boolean(),
});

const banks = z.object({
  data: z.array(banksData),
});

export const bankSchema = z.object({
  banks,
});

export type TBanksData = z.infer<typeof banksData>;
export type TBanksQueriesResponses = z.infer<typeof bankSchema>;
