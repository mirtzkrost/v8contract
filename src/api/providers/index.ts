import { api } from "..";
import { TgetProviderResponse } from "./response";

export const providers = {
  getProvider: async () => {
    return await api.GET<TgetProviderResponse>(`contract-link/provider`, {
      headers: {
        "x-contract-link-id": undefined,
      },
    });
  },
};
