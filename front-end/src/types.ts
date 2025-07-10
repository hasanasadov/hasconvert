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
