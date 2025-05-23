import { mutationOptions } from "@/helpers/tanstack";
import { api } from "..";
import { TFgtsMutateEntries, TFgtsQueriesEntries } from "./entries";
import { TFgtsResponsesMutate, TFgtsResponsesQueries } from "./response";

export const fgtsQueries = {
  getBalance: async ({
    search,
    page = 1,
    limit = 10,
  }: TFgtsQueriesEntries["getBalance"]) => {
    return await api.GET<TFgtsResponsesQueries["getBalance"]>(
      `contract-link/fgts/balance?search=${search}&page=${page}&limit=${limit}`
    );
  },
  getProposal: async ({
    limit = 1,
    page = 10,
    search,
  }: TFgtsQueriesEntries["getProposal"]) => {
    return await api.GET<TFgtsResponsesQueries["getProposal"]>(
      `contract-link/fgts/proposal?search=${search}&page=${page}&limit=${limit}`
    );
  },
};

export const fgtsMutations = {
  createSimulationFGTS: mutationOptions({
    mutationFn: async (data: TFgtsMutateEntries["createSimulation"]) => {
      return await api.POST<TFgtsResponsesMutate["createSimulation"]>(
        "/contract-link/fgts/simulations",
        {
          targetAmount: 0,
          documentNumber: data.documentNumber,
          desiredInstallments: data.desiredInstallments,
          balanceId: data.balanceId,
        }
      );
    },
  }),
  createFgtsProposal: mutationOptions({
    mutationFn: async (data: TFgtsMutateEntries["postCreateFGTSProposal"]) => {
      return await api.POST<TFgtsResponsesMutate["createProposal"]>(
        "/contract-link/fgts/proposal",
        data
      );
    },
  }),
  createBalance: mutationOptions({
    mutationFn: (data: { documentNumber: string }) => {
      return api.POST("/contract-link/fgts/balance", {
        documentNumber: data.documentNumber,
      });
    },
  }),
  createDocumentUploud: mutationOptions({
    mutationFn: async (data: FormData) => {
      return await api.POST<TFgtsResponsesMutate["createDocumentUpload"]>(
        `contract-link/file/upload/fgts_proposal`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  }),

  solvePendencies: mutationOptions({
    mutationFn: async (data: TFgtsMutateEntries["solvePendencies"]) => {
      return await api.POST(
        `contract-link/fgts/proposal/${data.id}/solvePendency`,
        {
          type: data.solvePendencyData.type,
          data: data.solvePendencyData.data,
        }
      );
    },
  }),
};
