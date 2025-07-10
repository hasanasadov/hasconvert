import { Rent } from "@/types";

export type GetRentByIdResponse = {
  item: Rent;
  message: string;
};

export type GetAllRentsResponse = {
  items: Rent[];
  count: number;
  skip: number;
  take: number;
  message: string;
};

export type RentPayload = {
  title: string;
  gear: string;
  price: number;
  fuelPricePerKm: number;
  unlimitedKmPrice: number;
  maxKmAllowedPerDay: number;
  passangers: number;
  capacityBag: number;
  capacitySuitcase: number;
  doors: number;
  minAgeToDrive: number;
  currency: string;
  category: string;
  dropOffLocations: string[];
  pickUpLocations: string[];
  images: File[] | null;
};

export type RentResponse = {
  item?: Rent;
  message: string;
};

export type GetAllRentPayload = {
  skip?: number;
  take?: number;
  search?: string | null;
  gear?: string[] | null;
  passangers?: string | null;
  dropOffLocation?: string | null;
  pickUpLocation?: string | null;
  categories?: string[];
  minAgeToDrive?: string | null;
  pickUpDate?: string | null;
  dropOffDate?: string | null;
  sort?: string | null;
};
