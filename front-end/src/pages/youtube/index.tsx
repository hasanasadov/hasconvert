import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import youtubeService from "@/services/youtube";
// VITE_APP_API_BASE_URL
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";
type Format = {
  url: string;
  ext: string;
  format_id?: string;
  filesize?: number;
  abr?: number;
  height?: number;
  format_note?: string;
};

function AudioOptions({
  audioList,
  selectedAudio,
  setSelectedAudio,
  handleDownload,
}: {
  audioList: Format[];
  selectedAudio: number;
  setSelectedAudio: (idx: number) => void;
  handleDownload: (format: Format) => void;
}) {
  return (
    <>
      <div className="font-semibold text-gray-700 mb-1">
        Audio Download Options:
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap4 mb-2">
        {audioList.map((audio, idx) => (
          <button
            key={audio.format_id || idx}
            type="button"
            className={`w-full p-2 rounded-md border flex items-center justify-between mb-2 transition-all ${
              selectedAudio === idx
                ? "bg-red-700 text-white border-red-500"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
            onClick={() => setSelectedAudio(idx)}
          >
            <div className="flex gap-3">
              <span className="font-medium uppercase">{audio.ext}</span>
              <span>
                {(audio.filesize ? audio.filesize / 1024 / 1024 : 0).toFixed(1)}{" "}
                MB
              </span>
              {audio.abr && <span>{audio.abr} kbps</span>}
              <span>{audio.format_note || ""}</span>
            </div>
          </button>
        ))}
      </div>
      {audioList.length > 0 && (
        <button
          type="button"
          onClick={() => handleDownload(audioList[selectedAudio])}
          className="block text-center mt-2 py-2 px-4 rounded-md bg-black text-white font-bold transition hover:bg-red-700 w-full"
        >
          Download Selected Audio
        </button>
      )}
    </>
  );
}

function VideoOptions({
  videoList,
  selectedVideo,
  setSelectedVideo,
  handleDownload,
}: {
  videoList: Format[];
  selectedVideo: number;
  setSelectedVideo: (idx: number) => void;
  handleDownload: (format: Format) => void;
}) {
  return (
    <>
      <div className="font-semibold text-gray-700 mb-1">
        Video Download Options:
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap4 mb-2">
        {videoList.map((video, idx) => (
          <button
            key={video.format_id || idx}
            type="button"
            className={`w-full p-2 rounded-md border flex items-center justify-between mb-2 transition-all ${
              selectedVideo === idx
                ? "bg-red-700 text-white border-red-500"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
            onClick={() => setSelectedVideo(idx)}
          >
            <div className="flex gap-3">
              <span className="font-medium uppercase">{video.ext}</span>
              <span>{video.height ? `${video.height}p` : ""}</span>
              <span>
                {(video.filesize ? video.filesize / 1024 / 1024 : 0).toFixed(1)}{" "}
                MB
              </span>
              <span>{video.format_note || ""}</span>
            </div>
          </button>
        ))}
      </div>
      {videoList.length > 0 && (
        <button
          type="button"
          onClick={() => handleDownload(videoList[selectedVideo])}
          className="block text-center mt-2 py-2 px-4 rounded-md bg-black text-white font-bold transition hover:bg-red-700 w-full"
        >
          Download Selected Video
        </button>
      )}
    </>
  );
}

function YoutubeInfo({
  videoInfo,
  activeTab,
  setActiveTab,
  audioList,
  videoList,
  selectedAudio,
  setSelectedAudio,
  selectedVideo,
  setSelectedVideo,
  handleDownload,
}: any) {
  const getBestThumbnail = () => videoInfo?.thumbnail || "";
  return (
    <div className="mt-8 w-full">
      {videoInfo.thumbnail && (
        <img
          src={getBestThumbnail()}
          alt="Video Thumbnail"
          className="w-full rounded-lg mb-3"
          style={{ maxHeight: 200, objectFit: "cover" }}
        />
      )}
      <div className="text-xl font-bold text-gray-900 mb-2">
        {videoInfo.title}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("audio")}
          className={`px-3 py-1 rounded-full font-medium text-sm ${
            activeTab === "audio"
              ? "bg-red-700 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Audio
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("video")}
          className={`px-3 py-1 rounded-full font-medium text-sm ${
            activeTab === "video"
              ? "bg-red-700 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Video
        </button>
      </div>

      {activeTab === "audio" && (
        <AudioOptions
          audioList={audioList}
          selectedAudio={selectedAudio}
          setSelectedAudio={setSelectedAudio}
          handleDownload={handleDownload}
        />
      )}

      {activeTab === "video" && (
        <VideoOptions
          videoList={videoList}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
}

export default function YoutubeServices() {
  const [url, setUrl] = useState("");
  const [selectedAudio, setSelectedAudio] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [activeTab, setActiveTab] = useState<"audio" | "video">("audio");

  const { mutate, data: videoInfo, isPending, isError } = useMutation({
    mutationFn: (url: string) => youtubeService.getLinks(url),
    onSuccess: () => {
      setSelectedAudio(0);
      setSelectedVideo(0);
    },
  });

  const audioList = (videoInfo?.audio || []).filter(
    (a: any) => !!a.filesize && a.filesize > 0
  );
  const videoList = (videoInfo?.video || []).filter(
    (v: any) => !!v.filesize && v.filesize > 0
  );

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(url);
  };

  const handleDownload = (format: Format) => {
    window.open(
      `${BASE_URL}/download?url=${encodeURIComponent(
        format.url
      )}&ext=${format.ext}&title=${encodeURIComponent(videoInfo.title)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col items-center py-12">
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
              className="rounded-md p-1.5 w-full border-2 border-gray-300 focus:border-red-500 focus:ring-red-500 focus:outline-none transition-all"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-black text-white text-nowrap px-4 py-2 rounded-lg transition-all"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Get Links"}
            </button>
          </div>
        </div>
        {isError && (
          <div className="text-red-600 mt-2 text-center">
            Failed to fetch video info.
          </div>
        )}
        {videoInfo && (
          <YoutubeInfo
            videoInfo={videoInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            audioList={audioList}
            videoList={videoList}
            selectedAudio={selectedAudio}
            setSelectedAudio={setSelectedAudio}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            handleDownload={handleDownload}
          />
        )}
      </form>
    </div>
  );
}
