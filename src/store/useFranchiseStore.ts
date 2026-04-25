import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Franchise = {
  id: string;
  code: string;
  name: string;
};

type State = {
  selectedFranchise: Franchise | null;
  setSelectedFranchise: (f: Franchise) => void;
  clearFranchise: () => void;
};

export const useFranchiseStore = create<State>()(
  persist(
    (set) => ({
      selectedFranchise: null,

      setSelectedFranchise: (f) => set({ selectedFranchise: f }),

      clearFranchise: () => set({ selectedFranchise: null }),
    }),
    {
      name: 'franchise-storage', 
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);