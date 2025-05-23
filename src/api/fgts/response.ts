import { z } from "zod";

export const createSimulation = z.object({
  cet: z.number(),
  tacType: z.string(),
  provider: z.string(),
  annualCet: z.number(),
  availableBalance: z.number(),
  emissionAmount: z.number(),
  iof: z.number(),
  tax: z.number(),

  tc: z.number(),
  totalBalance: z.number(),
  totalInstallments: z.number(),
  installments: z.array(
    z.object({
      amount: z.number(),
      dueDate: z.string(),
    })
  ),
  insuranceAmount: z.number(),
  id: z.string(),
});

export const createProposal = z.object({
  formalizationLink: z.string(),
  id: z.string(),
  contractNumber: z.string(),
});
export const balanceParams = z.object({
  id: z.string(),
  documentNumber: z.string(),
  partnerId: z.string(),
  status: z.string(),
  statusInfo: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  amount: z.number(),
  provider: z.string(),
  periods: z.array(
    z.object({
      amount: z.number(),
      dueDate: z.string(),
    })
  ),
});
export const getBalance = z.object({
  data: z.array(balanceParams),
  page: z.object({
    total: z.number(),
    limit: z.number(),
    current: z.number(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
    totalPages: z.number(),
  }),
});

export const getProposal = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      documentNumber: z.string(),
      clientName: z.string(),
      partnerId: z.string(),
      status: z.string(),
      statusReason: z.string(),
      statusDescription: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      disbursedIssueAmount: z.string(),
      paymentType: z.string(),
      formalizationLink: z.string(),
    })
  ),
  page: z.object({
    total: z.number(),
    limit: z.number(),
    current: z.number(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
    totalPages: z.number(),
  }),
});
const createDocumentUpload = z.array(
  z.object({
    key: z.string(),
    originalFilename: z.string(),
  })
);

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
});
const solvePendency = z.union([
  TedRefusalSchema,
  PixRefusalSchema,
  InvalidDocumentSchema,
]);
export const fgtsResponsesSchema = z.object({
  createProposal,
  createSimulation,
  createDocumentUpload,
  solvePendency,
});

export const fgtsResponseQueriesSchema = z.object({
  getBalance,
  getProposal,
});

export type TFgtsResponsesMutate = z.infer<typeof fgtsResponsesSchema>;
export type TFgtsResponsesQueries = z.infer<typeof fgtsResponseQueriesSchema>;

export type TFgtsResponseBalanceData = z.infer<typeof balanceParams>;
