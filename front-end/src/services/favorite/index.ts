import axiosInstance from "../axiosInstance";
import { GetAllRentPayload, GetAllRentsResponse } from "../rent/types";
import { FavoriteGetAllWOPResponse, FavoriteResponse } from "./types";

async function getAllWOPagination() {
  return await axiosInstance.get<FavoriteGetAllWOPResponse>(
    `/favorites/without-pagination`
  );
}

async function getAll(data: GetAllRentPayload) {
  const params = new URLSearchParams();

  if (data.skip) params.append("skip", data.skip.toString());
  if (data.take) params.append("take", data.take.toString());
  if (data.search) params.append("search", data.search);
  if (data.dropOffLocation)
    params.append("dropOffLocation", data.dropOffLocation);
  if (data.pickUpLocation) params.append("pickUpLocation", data.pickUpLocation);
  if (data.categories) {
    data.categories.forEach((category, index) => {
      params.append(`categories[${index}]`, category);
    });
  }
  if (data.gear) {
    data.gear.forEach((gear, index) => {
      params.append(`gear[${index}]`, gear);
    });
  }
  if (data.passangers) params.append("passangers", data.passangers);
  if (data.minAgeToDrive) params.append("minAgeToDrive", data.minAgeToDrive);

  return await axiosInstance.get<GetAllRentsResponse>(
    `/favorites?${params.toString()}`
  );
}

async function toggle({ id }: { id: string }) {
  return await axiosInstance.post<FavoriteResponse>(`/favorites/${id}`);
}

const favoriteService = {
  getAllWOPagination,
  getAll,
  toggle,
};

export default favoriteService;
