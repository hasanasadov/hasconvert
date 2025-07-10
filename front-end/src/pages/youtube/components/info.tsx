
const InfoSection = () => {
  return (
    <div className="flex flex-col items-center text-[#363636] min-w-4/12 md:w-1/2 lg:w-5/12">
      <h1 className="text-[#363636] text-2xl">YouTube to MP3/MP4 Converter</h1>
      <p className="text-[#363636] text-sm my-3.5">
        Our YouTube to MP3 Converter allows you to convert your favorite YouTube
        videos to MP3 (audio) or MP4 (video) files and to download them for
        FREE. Y2Mate works on your desktop, tablet and mobile device without the
        installation of any additional apps. The usage of Y2Mate is free, and
        safe!
      </p>
      <p className="text-lg my-3.5">How to download YouTube videos:</p>
      <p className="text-[#363636] text-sm my-3.5">
        1. Go to YouTube.com and search for a video you would like to download.
        Then copy the video URL from the browser address bar
        (youtube.com/watch?v=id).
      </p>
      <p className="text-[#363636] text-sm my-3.5">
        2. Paste the video URL in our YouTube Converter, and choose your
        preferred download format. You can choose between MP3 or MP4. If you do
        not choose any format the video will be converted by default to MP3.
        Click on the „Convert” button.{" "}
      </p>
      <p className="text-[#363636] text-sm my-3.5">
        3. The conversion of the video will start, and it may take some time.
        Please note that it is only possible to download YouTube videos with a
        maximum length of 45 minutes. As soon as the conversion is completed you
        will be able to download the converted video.
      </p>
      {/* <p className="text-[#363636] text-sm my-3.5">
        With the usage of Y2Mate you are accepting our Terms of Use. Thank you
        for using our MP3 Converter.
      </p>

      <p className="text-[#363636] text-sm my-3.5">
        If you prefer to search for a YouTube video, we recommend you to try our
        Partner MP3Juice.
      </p> */}
    </div>
  );
};

export default InfoSection;
