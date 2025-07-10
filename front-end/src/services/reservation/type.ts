import { Reservation, ReservationStatus } from "@/types";

export type CreateReservationPayload = {
  rent: string;
  pickUpDate: string;
  dropOffDate: string;
  billing: {
    name: string;
    email: string;
    phoneNumber: string;
    company: string;
    city: string;
    zipCode: string;
    state: string;
    streetAddress: string;
  };
  pickUpLocation: string;
  dropOffLocation: string;
  selectedDeductible: string;
  selectedBookingOptions: string;
  unlimitedKm: string;
};

export type GetAllReservationsResponse = {
  items: Reservation[];
  message: string;
};

export type ChangeReservationStatusPayload = {
  status: ReservationStatus;
};
