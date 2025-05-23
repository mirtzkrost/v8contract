import { api } from "..";
import { TBanksQueriesResponses } from "./response";

export const banksQueries = {
  getBanks: async () => {
    return await api.GET<TBanksQueriesResponses["banks"]>(
      `/contract-link/banks`
    );
  },
};
