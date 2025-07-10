import axiosInstance from "../axiosInstance";
import {
  ChangeReservationStatusPayload,
  CreateReservationPayload,
  GetAllReservationsResponse,
} from "./type";

async function getAll() {
  return await axiosInstance.get<GetAllReservationsResponse>("/reservations");
}

async function changeStatus({
  id,
  data,
}: {
  id: string;
  data: ChangeReservationStatusPayload;
}) {
  return await axiosInstance.put(`/reservations/change-status/${id}`, data);
}

async function create(data: CreateReservationPayload) {
  return await axiosInstance.post("/reservations", data);
}

async function createCheckoutSession(data: any) {
  return await axiosInstance.post("/stripe", data);
}
async function getById({ id }: { id: string }) {
  return await axiosInstance.get(`/reservations/${id}`);
}

const reservationService = {
  getAll,
  changeStatus,
  create,
  createCheckoutSession,
  getById,
};

export default reservationService;
