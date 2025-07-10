import axiosInstance from "../axiosInstance";
import {
  RentPayload,
  RentResponse,
  GetAllRentsResponse,
  GetRentByIdResponse,
  GetAllRentPayload,
} from "./types";

async function getAll(data: GetAllRentPayload = {}) {
  const params = new URLSearchParams();
  if (data.sort) params.append("sort", data.sort);
  if (data.skip) params.append("skip", data.skip.toString());
  if (data.take) params.append("take", data.take.toString());
  if (data.search) params.append("search", data.search);
  if (data.minAgeToDrive)
    params.append("minAgeToDrive", data.minAgeToDrive.toString());
  if (data.passangers) params.append("passangers", data.passangers.toString());
  if (data.gear) {
    data.gear.forEach((gear, index) => {
      params.append(`gear[${index}]`, gear);
    });
  }
  if (data.dropOffLocation)
    params.append("dropOffLocation", data.dropOffLocation);
  if (data.pickUpLocation) params.append("pickUpLocation", data.pickUpLocation);
  if (data.categories) {
    data.categories.forEach((category, index) => {
      params.append(`categories[${index}]`, category);
    });
  }
  if (data.pickUpDate) params.append("pickUpDate", data.pickUpDate);
  if (data.dropOffDate) params.append("dropOffDate", data.dropOffDate);

  return await axiosInstance.get<GetAllRentsResponse>(
    `/rents?${params.toString()}`
  );
}

async function getPopular() {
  return await axiosInstance.get<GetAllRentsResponse>("/rents/popular");
}

async function getById({ id }: { id: string }) {
  return await axiosInstance.get<GetRentByIdResponse>(`/rents/${id}`);
}

async function create(data: RentPayload) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("gear", data.gear);
  formData.append("price", data.price.toString());
  formData.append("category", data.category);
  formData.append("fuelPricePerKm", data.fuelPricePerKm.toString());
  formData.append("unlimitedKmPrice", data.unlimitedKmPrice.toString());
  formData.append("maxKmAllowedPerDay", data.maxKmAllowedPerDay.toString());
  formData.append("passangers", data.passangers.toString());
  formData.append("capacityBag", data.capacityBag.toString());
  formData.append("capacitySuitcase", data.capacitySuitcase.toString());
  formData.append("doors", data.doors.toString());
  formData.append("minAgeToDrive", data.minAgeToDrive.toString());
  formData.append("currency", data.currency);

  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });
  if (data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.post<RentResponse>("/rents", formData);
}

async function edit({ id, data }: { id: string; data: RentPayload }) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("gear", data.gear);
  formData.append("price", data.price.toString());
  formData.append("category", data.category);
  formData.append("fuelPricePerKm", data.fuelPricePerKm.toString());
  formData.append("unlimitedKmPrice", data.unlimitedKmPrice.toString());
  formData.append("maxKmAllowedPerDay", data.maxKmAllowedPerDay.toString());
  formData.append("passangers", data.passangers.toString());
  formData.append("capacityBag", data.capacityBag.toString());
  formData.append("capacitySuitcase", data.capacitySuitcase.toString());
  formData.append("doors", data.doors.toString());
  formData.append("minAgeToDrive", data.minAgeToDrive.toString());
  formData.append("currency", data.currency);

  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });

  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });

  if (data.images) {
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.put<RentResponse>(`/rents/${id}`, formData);
}

async function remove({ id }: { id: string }) {
  return await axiosInstance.delete(`/rents/${id}`);
}

const rentService = {
  getAll,
  getPopular,
  getById,
  create,
  edit,
  remove,
};

export default rentService;
