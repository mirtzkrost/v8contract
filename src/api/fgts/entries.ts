import { z } from "zod";

const createSimulation = z.object({
  documentNumber: z.string(),
  desiredInstallments: z.array(
    z.object({
      totalAmount: z.number(),
      dueDate: z.string(),
    })
  ),
  balanceId: z.string(),
});

const createDocumentUploud = z.object({
  type: z.string(),
  file: z.array(z.instanceof(FormData)),
});
const TedRefusalSchema = z.object({
  type: z.string().regex(/^ted_refusal$/),
  data: z.object({
    bankId: z.string(),
    bankAccountNumber: z.string(),
    bankAccountBranch: z.string(),
    bankAccountDigit: z.string(),
    bankAccountType: z.string(),
  }),
});

const PixRefusalSchema = z.object({
  type: z.string().regex(/^pix_refusal$/),
  data: z.object({
    pix: z.string(),
  }),
});

const InvalidDocumentSchema = z.object({
  type: z.string().regex(/^invalid_document$/),
  data: z.object({
    documents: z.array(
      z.object({
        type: z.enum([
          "1",
          "2",
          "501",
          "502",
          "3",
          "4",
          "401",
          "402",
          "403",
          "503",
          "504",
          "505",
          "506",
          "5",
          "6",
          "7",
          "8",
          "9",
          "12",
          "13",
          "14",
          "20",
          "21",
          "22",
          "24",
          "25",
          "107",
          "112",
          "114",
          "115",
          "300",
          "301",
          "302",
          "303",
          "600",
          "601",
        ]),
        key: z.string(),
      })
    ),
  }),
});
const solvePendencyData = z.union([
  TedRefusalSchema,
  PixRefusalSchema,
  InvalidDocumentSchema,
]);
const solvePendencies = z.object({
  id: z.string(),
  solvePendencyData,
});
const bankPaymentSchema = z.object({
  bank: z.string().optional(),
  agency: z.string(),
  account: z.string(),
  accountType: z.string(),
  digit: z.string(),
  bankId: z.string(),
});

// Esquema para "pix"
const pixPaymentSchema = z.object({
  pix: z.string(),
});

export const postCreateFGTSProposal = z.object({
  city: z.string(),
  birthDate: z.string().date(),
  email: z.string(),
  maritalStatus: z.string(),
  nationality: z.string(),
  motherName: z.string(),
  name: z.string(),
  neighborhood: z.string(),
  personType: z.string(),
  phoneCountryCode: z.string(),
  phoneRegionCode: z.string(),
  phone: z.string(),
  postalCode: z.string(),
  isPEP: z.boolean(),
  state: z.string(),
  street: z.string(),
  complement: z.string().optional(),
  addressNumber: z.string(),
  payment: z.object({
    type: z.string(),
    data: z.union([bankPaymentSchema, pixPaymentSchema]),
  }),
  documentIdentificationNumber: z.string(),
  fgtsProposalsPeriods: z.array(
    z.object({
      amount: z.number(),
      dueDate: z.string(),
    })
  ),
  fgtsSimulationId: z.string(),
  individualDocumentNumber: z.string(),
  qrCodeId: z.string().optional(),
  formalizationLink: z.string(),
});

const postCreateBalance = z.object({
  documentNumber: z.string(),
});

const getBalance = z.object({
  search: z.string(),
  page: z.number(),
  limit: z.number(),
});
const getProposal = z.object({
  search: z.string(),
  page: z.number(),
  limit: z.number(),
});

export const entriesMutateSchemas = z.object({
  createSimulation,
  postCreateFGTSProposal,
  postCreateBalance,
  createDocumentUploud,
  solvePendencies,
});
export const entriesQueriesSchemas = z.object({
  getBalance,
  getProposal,
});
export type TFgtsMutateEntries = z.infer<typeof entriesMutateSchemas>;
export type TFgtsQueriesEntries = z.infer<typeof entriesQueriesSchemas>;
