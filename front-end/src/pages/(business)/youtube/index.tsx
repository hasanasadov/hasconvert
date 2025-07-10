import { useState } from "react";
import axios from "axios";

export default function YoutubeServices() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedAudio, setSelectedAudio] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"mp3" | "mp4">("mp3");

  const handleConvert = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setVideoInfo(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/get-video-info",
        { url }
      );
      setVideoInfo(response.data);
      setSelectedAudio(0);
      setSelectedVideo(0);
    } catch (err) {
      setVideoInfo(null);
      alert("Link alınmadı");
    } finally {
      setLoading(false);
    }
  };

  const getAudioUrl = () =>
    videoInfo?.audios?.length ? videoInfo.audios[selectedAudio].url : "#";

  const getVideoUrl = () =>
    videoInfo?.videos?.length ? videoInfo.videos[selectedVideo].url : "#";

  // Thumbnail: ən yüksək keyfiyyətli (ən böyüyü) göstər
  const getBestThumbnail = () => {
    if (!videoInfo?.thumbnails?.length) return "";
    return videoInfo.thumbnails.reduce((prev: any, curr: any) =>
      prev.width * prev.height > curr.width * curr.height ? prev : curr
    ).url;
  };

  const extensionGroups: { [key: string]: any[] } = {};
  (videoInfo?.videos ?? []).forEach((video: any) => {
    const ext = video.extension?.toLowerCase() || "other";
    if (!extensionGroups[ext]) extensionGroups[ext] = [];
    extensionGroups[ext].push(video);
  });
  const extensionKeys = Object.keys(extensionGroups);

  const audioExtensionGroups: { [key: string]: any[] } = {};
  (videoInfo?.audios ?? []).forEach((audio: any) => {
    const ext = audio.extension?.toLowerCase() || "other";
    if (!audioExtensionGroups[ext]) audioExtensionGroups[ext] = [];
    audioExtensionGroups[ext].push(audio);
  });
  const audioExtensionKeys = Object.keys(audioExtensionGroups);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-12">
      <form
        className="shadow-xl p-6 rounded-xl min-w-[340px] w-full max-w-lg bg-white border"
        onSubmit={handleConvert}
      >
        <div className="flex flex-col items-start gap-4 w-full">
          <label className="text-gray-900 text-sm font-medium">
            Insert a YouTube video URL to get download links
          </label>
          <div className="flex flex-row items-center gap-4 w-full">
            <input
              placeholder="youtube.com/watch?v=38Yzihno1Vs"
              className="rounded-md p-2 w-full border-2 border-gray-300 focus:border-red-500 focus:ring-red-500"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg transition-all"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Links"}
            </button>
          </div>
        </div>
        {videoInfo && (
          <div className="mt-8 w-full">
            <img
              src={getBestThumbnail()}
              alt="Video Thumbnail"
              className="w-full rounded-lg mb-3"
              style={{ maxHeight: 200, objectFit: "cover" }}
            />
            <div className="text-xl font-bold text-gray-900 mb-2">
              {videoInfo?.title}
            </div>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("mp3")}
                className={`px-3 py-1 rounded-full font-medium text-sm ${
                  activeTab === "mp3"
                    ? "bg-red-700 text-white shadow"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Audio {" ("}
                <span>
                  {videoInfo.audios
                    ?.map((audio: any) => audio.extension)
                    .filter(
                      (ext: string, idx: number, arr: string[]) =>
                        arr.indexOf(ext) === idx
                    )
                    .join(", ") || "MP3"}
                </span>
                {")"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mp4")}
                className={`px-3 py-1 rounded-full font-medium text-sm ${
                  activeTab === "mp4"
                    ? "bg-red-700 text-white shadow"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Video {" ("}
                <span>
                  {videoInfo.videos
                    ?.map((audio: any) => audio.extension)
                    .filter(
                      (ext: string, idx: number, arr: string[]) =>
                        arr.indexOf(ext) === idx
                    )
                    .join(", ") || "MP4"}
                </span>
                {")"}
              </button>
            </div>

            {/* AUDIO */}
            {activeTab === "mp3" && (
              <>
                <div className="font-semibold text-gray-700 mb-1">
                  Audio Download Options:
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-${audioExtensionKeys.length} gap-4 mb-2`}
                >
                  {audioExtensionKeys.map((ext, _) => (
                    <div key={ext}>
                      <div className="font-bold mb-2 uppercase">{ext}</div>
                      {audioExtensionGroups[ext].map((audio, rowIdx) => {
                        const idx = videoInfo.audios.findIndex(
                          (a: any) =>
                            a.extension?.toLowerCase() ===
                              audio.extension?.toLowerCase() &&
                            a.size === audio.size
                        );
                        return (
                          <button
                            key={`${ext}-${rowIdx}`}
                            type="button"
                            className={`w-full p-2 rounded-md border flex items-center justify-between mb-2 transition-all ${
                              selectedAudio === idx
                                ? "bg-red-700 text-white border-red-500"
                                : "bg-gray-100 text-gray-900 border-gray-300"
                            }`}
                            onClick={() => setSelectedAudio(idx)}
                          >
                            <div className="flex gap-3">
                              <span className="font-medium uppercase">
                                {audio.extension}
                              </span>
                              <span>
                                {(Number(audio.size) / 1024 / 1024).toFixed(1)}{" "}
                                MB
                              </span>
                              <span>
                                {(Number(audio.lengthMs) / 1000 / 60).toFixed(
                                  1
                                )}{" "}
                                min
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <a
                  href={getAudioUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-2 py-2 px-4 rounded-md bg-black text-white font-bold transition hover:bg-red-700"
                  download
                >
                  Download Selected Audio
                </a>
              </>
            )}

            {/* VIDEO */}
            {activeTab === "mp4" && (
              <>
                <div className="font-semibold text-gray-700 mb-1">
                  Video Download Options:
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-${extensionKeys.length} gap-4 mb-2`}
                >
                  {extensionKeys.map((ext, _) => (
                    <div key={ext}>
                      <div className="font-bold mb-2 uppercase">{ext}</div>
                      {extensionGroups[ext].map((video, rowIdx) => {
                        const idx = videoInfo.videos.findIndex(
                          (v: any) =>
                            v.extension?.toLowerCase() ===
                              video.extension?.toLowerCase() &&
                            v.quality === video.quality &&
                            v.size === video.size
                        );
                        return (
                          <button
                            key={`${ext}-${rowIdx}`}
                            type="button"
                            className={`w-full p-2 rounded-md border flex items-center justify-between mb-2 transition-all ${
                              selectedVideo === idx
                                ? "bg-red-700 text-white border-red-500"
                                : "bg-gray-100 text-gray-900 border-gray-300"
                            }`}
                            onClick={() => setSelectedVideo(idx)}
                          >
                            <div className="flex gap-3">
                              <span className="font-medium uppercase">
                                {video.extension}
                              </span>
                              <span>{video.quality}</span>
                              <span className="text-nowrap">
                                {(Number(video.size) / 1024 / 1024).toFixed(1)}{" "}
                                MB
                              </span>
                              {/* <span>
                                {(Number(video.lengthMs) / 1000 / 60).toFixed(
                                  1
                                )}{" "}
                                min
                              </span> */}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <a
                  href={getVideoUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-2 py-2 px-4 rounded-md bg-black text-white font-bold transition hover:bg-red-700"
                  download
                >
                  Download Selected Video
                </a>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
