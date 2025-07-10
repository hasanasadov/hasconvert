// services/youtube.ts
import axiosInstance from "../axiosInstance";

async function getLinks(url: string) {
  console.log("Fetching video info for URL:", url);
  const { data } = await axiosInstance.post(
    `/youtube/get-video-info`,
    { url },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Received video info:", data);
  return data;
}
const youtubeService = { getLinks };
export default youtubeService;
