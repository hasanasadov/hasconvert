import YoutubeServices from "../youtube";
import InfoSection from "../youtube/components/info";

import YTlogo from "../../assets/logoYT.png";
export default function Home() {
  return (
    <div>
      <div className=" text-white text-[40px] text-center font-extrabold p-10 bg-black pb-32 ">
        <div className="container mx-auto flex flex-row items-center justify-center gap-4">
          <div>
            <img className="w-[50px] mx-auto" src={YTlogo} alt="YT" />
          </div>
          Has YT
        </div>
      </div>
      <div className="translate-y-[-120px]">
        <YoutubeServices />
        <div className="bg-white flex justify-center py-6 container mx-auto">
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
