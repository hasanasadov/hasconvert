import { AxiosError } from "axios";

export type Tool = {
  href: string;
  title: string;
  name: string;
  description: string;
  svg: React.ReactNode;
  isNew?: boolean;
};

export enum YoutubeDownloadTypeEnum {
  MP3 = "MP3",
  MP4 = "MP4",
  MP4_144p = "MP4 144p",
  MP4_240p = "MP4 240p",
  MP4_360p = "MP4 360p",
  MP4_480p = "MP4 480p",
  MP4_720p = "MP4 720p",
  MP4_1080p = "MP4 1080p",
}

export type AxiosResponseError = AxiosError<{
  message: string;
}>;


export type User = {
  _id: string;
  avatar: string | null;
  name: string;
  surname: string;
  email: string;
  favorites: string[];
  isBlocked: boolean;
  createdAt: string;
  role: UserRole;
};

export type Location = {
  _id: string;
  createdAt: string;
  title: string;
};

export type Category = {
  _id: string;
  createdAt: string;
  title: string;
  rents: Rent[] | string[];
};

export type Rent = {
  _id: string;
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
  category: Category;
  dropOffLocations: Location[];
  imageUrls: string[];
  pickUpLocations: Location[];
  createdAt: string;
};

export type Reservation = {
  billing: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    streetAddress: string;
  };
  customer: string;
  createdAt: string;
  dropOffLocation: string;
  dropOffDate: string;
  pickUpLocation: string;
  pickUpDate: string;
  selectedDeductible: string;
  selectedBookingOptions: string;
  unlimitedKm: string;
  rent: Rent | string;
  total: number;
  updatedAt: string;
  user: string;
  _id: string;
  status: ReservationStatus;
  hasReview: boolean;
};

export type Review = {
  author: User;
  content: string;
  createdAt: string;
  id: string;
  rate: number;
  rent: Rent;
  status: ReviewStatus;
  _id: string;
};

export type Conversation = {
  _id: string;
  userName: string;
  userEmail: string;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  text: string;
  userId: string;
  userName: string;
  conversation: string | Conversation;
  createdAt: string;
  updatedAt: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum ReservationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
}

export enum ReviewStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
