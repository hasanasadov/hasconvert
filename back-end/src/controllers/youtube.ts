import axios from "axios";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    function getYouTubeVideoID(url: any) {
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    }

    const videoId = getYouTubeVideoID(url);
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const options = {
      method: "GET",
      url: "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
      params: {
        videoId,
        urlAccess: "normal",
        videos: "auto",
        audios: "auto",
      },
      headers: {
        "x-rapidapi-key": "6858440666msh7f810f0d270e7f2p161a03jsn00650cdf5e07",
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log("----------------", response.data);
    // response.data.result.videos  - video formatları (mp4)
    // response.data.result.audios  - audio formatları (mp3 və s.)
    // response.data.result.title   - başlıq və s.
    console.log("----------------", response.data);

    res.json({
      title: response.data.title,
      thumbnails: response.data.thumbnails,
      videos: response.data.videos.items,
      audios: response.data.audios.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
};

const youtubeController = {
  getAll,
};

export default youtubeController;
