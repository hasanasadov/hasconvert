import axiosInstance from "../axiosInstance";

async function getLinks(url: string) {
  const { data } = await axiosInstance.post(`/youtube/posts`, { url });
  return data;
}
const youtubeService = { getLinks };
export default youtubeService;
