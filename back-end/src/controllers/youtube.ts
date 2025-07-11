import axios from "axios";
import { exec } from "child_process";
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

const YTDLP_PATH = "yt-dlp";

function groupFormats(formats: any[]) {
  const audio: any[] = [];
  const video: any[] = [];
  const videoOnly: any[] = [];

  formats.forEach((f) => {
    if (f.vcodec === "none" && f.acodec !== "none") {
      audio.push({
        url: f.url,
        ext: f.ext,
        format_id: f.format_id,
        format_note: f.format_note,
        acodec: f.acodec,
        filesize: f.filesize || f.filesize_approx || null,
        abr: f.abr || null,
      });
    } else if (f.vcodec !== "none" && f.acodec !== "none") {
      video.push({
        url: f.url,
        ext: f.ext,
        format_id: f.format_id,
        format_note: f.format_note,
        vcodec: f.vcodec,
        acodec: f.acodec,
        height: f.height || null,
        filesize: f.filesize || f.filesize_approx || null,
        tbr: f.tbr || null,
      });
    } else if (f.vcodec !== "none" && f.acodec === "none") {
      // Video-only (DASH, higher quality)
      videoOnly.push({
        url: f.url,
        ext: f.ext,
        format_id: f.format_id,
        format_note: f.format_note,
        vcodec: f.vcodec,
        height: f.height || null,
        filesize: f.filesize || f.filesize_approx || null,
        tbr: f.tbr || null,
      });
    }
  });

  video.sort((a, b) => (b.height || 0) - (a.height || 0));
  audio.sort((a, b) => (b.abr || 0) - (a.abr || 0));

  return { audio, video, videoOnly };
}

const myOwn = async (req: Request, res: Response) => {
  const { url } = req.body;
  exec(`${YTDLP_PATH} -j "${url}"`, (err, stdout, stderr) => {
    if (err) {
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to fetch info." });
      }
      return;
    }
    let info;
    try {
      info = JSON.parse(stdout);
    } catch (e) {
      console.error("Error parsing yt-dlp output:", e);
      if (!res.headersSent) {
        res.status(500).json({ error: "Could not parse yt-dlp output." });
      }
      return;
    }
    if (!res.headersSent) {
      const { audio, video } = groupFormats(info.formats || []);
      res.json({
        title: info.title,
        thumbnail:
          info.thumbnail ||
          (info.thumbnails && info.thumbnails.length > 0
            ? info.thumbnails[0].url
            : null),
        duration: info.duration,
        audio,
        video,
      });
    }
    return;
  });
};

const youtubeController = {
  getAll,
  myOwn,
};

export default youtubeController;
