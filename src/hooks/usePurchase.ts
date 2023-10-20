import { Purchase } from "@/views/purchases";
import { create } from "zustand";

interface IPurchase {
    purchase: Purchase | null;
  setPurchase: (arg: Purchase) => void;
}

const usePurchase = create<IPurchase>((set) => ({
  purchase: null,
  setPurchase: (purchase) => set({ purchase }),
  clearPurchase: () => set({ purchase: null }),
}));

export default usePurchase;
