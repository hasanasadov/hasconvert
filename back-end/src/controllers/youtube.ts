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
        "x-rapidapi-key": "355c8f6197msh1f95495cb67af3cp1cbee3jsn2d25ac47e9cf",
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

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
