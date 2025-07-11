import { Request, Response } from "express";
import axios from "axios";
import { spawn } from "child_process";

function sanitizeFilename(name: string, ext: string) {
  let safe =
    name
      .replace(/[\u0000-\u001F\u007F<>:"/\\|?*]/g, "")
      .replace(/[\u{0080}-\u{FFFF}]/gu, "")
      .replace(/"/g, "")
      .replace(/[\r\n]/g, "")
      .trim()
      .substring(0, 100) || "media";

  const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "mp4";
  return `${safe}.${safeExt}`;
}

const download = async (req: Request, res: Response) => {
  const { url, ext, title } = req.query;
  if (!url) return res.status(400).send("No URL provided");
  const filename = sanitizeFilename(
    (title as string) || "media",
    (ext as string) || "mp4"
  );
  try {
    const ytStream = await axios.get(url as string, { responseType: "stream" });
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      ytStream.headers["content-type"] || "application/octet-stream"
    );
    ytStream.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    if (!res.headersSent) res.status(500).send("Failed to download.");
  }
};

const YTDLP_PATH = "/opt/homebrew/bin/yt-dlp";

const downloadMerged = async (req: Request, res: Response) => {
  const { url, title } = req.query;
  if (!url) return res.status(400).send("No URL provided");

  const safeTitle = ((title as string) || "video")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/ +/g, " ")
    .trim()
    .substring(0, 100);

  const filename = `${safeTitle}.mp4`;

  const args = [
    "-f",
    "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best",
    "-o",
    "-",
    "--ffmpeg-location",
    "ffmpeg",
    url as string,
  ];

  try {
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "video/mp4");

    const ytdlp = spawn(YTDLP_PATH, args);

    ytdlp.stdout.pipe(res);

    let stderrData = "";
    ytdlp.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    ytdlp.on("error", (err) => {
      console.error("Failed to start yt-dlp:", err);
      if (!res.headersSent) res.status(500).send("Failed to run yt-dlp.");
    });

    ytdlp.on("close", (code) => {
      if (code !== 0) {
        console.error("yt-dlp exited with code:", code);
        console.error("yt-dlp stderr:\n", stderrData);
        if (!res.headersSent)
          res.status(500).send("yt-dlp failed to download/merge video.");
      }
    });
  } catch (err) {
    console.error("Merged download error (outer catch):", err);
    if (!res.headersSent) res.status(500).send("Internal error.");
  }
};

const downloadController = {
  download,
  downloadMerged,
};

export default downloadController;
