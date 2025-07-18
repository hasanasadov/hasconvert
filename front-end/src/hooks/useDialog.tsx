import { create } from "zustand";

export enum DialogTypeEnum {
  LOGIN = "login",
  REGISTER = "register",
  FORGOT = "forgot",
  RESET = "reset",
  FILTER = "filter",
  AVAILABILITY = "availability",
  PRICE = "price",
  LANGUAGE = "language",
}

interface DialogState {
  type: DialogTypeEnum | null;
  isOpen: boolean;
  openDialog: (type: DialogTypeEnum) => void;
  closeDialog: () => void;
}

export const useDialog = create<DialogState>((set) => ({
  type: null,
  isOpen: false,
  openDialog: (type: DialogTypeEnum) => set({ type, isOpen: true }),
  closeDialog: () => set({ isOpen: false, type: null }),
}));
