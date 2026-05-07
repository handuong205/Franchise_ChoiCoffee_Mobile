import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "@/config";
import type { CustomerAuthProfile } from "@/models/account.model";
import axios from "axios";

interface CustomerAuthState {
  customer: CustomerAuthProfile | null;
  customerId: string | null;
  isInitialized: boolean;
  isLoggingOut: boolean;

  setCustomer: (customer: CustomerAuthProfile | null) => void;
  clearCustomer: () => void;
  setInitialized: (initialized: boolean) => void;
  setLoggingOut: (isLoggingOut: boolean) => void;
  refreshAccessToken: () => Promise<void>;
  hydrate: () => void;
}

export const  useCustomerAuthStore = create<CustomerAuthState>()(
  persist(
    (set) => ({
      customer: null,
      customerId: null,
      isInitialized: false,
      isLoggingOut: false,

      setCustomer: (customer) =>
        set({
          customer,
          customerId: customer ? String(customer.id) : null,
          isInitialized: true,
        }),

      clearCustomer: () =>
        set({
          customer: null,
          customerId: null,
          isInitialized: true,
        }),

      setInitialized: (initialized) =>
        set({
          isInitialized: initialized,
        }),

      hydrate: () => {
        set((state) => ({ ...state, isInitialized: true }));
      },

      setLoggingOut: (isLoggingOut) =>
        set({
          isLoggingOut,
        }),

      refreshAccessToken: async () => {
        await axios.get(`${ENV.API_URL}/api/customer-auth/refresh-token`, {
          withCredentials: true,
          timeout: 300000,
        });
      },
    }),
    {
      name: "customer-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        customer: state.customer,
        customerId: state.customerId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    },
  ),
);
