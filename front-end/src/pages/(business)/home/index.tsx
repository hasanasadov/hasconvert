import YoutubeServices from "../youtube";
import InfoSection from "../youtube/components/info";
// import PDFservices from "./components/PDFservices";

export default function Home() {
  return (
    <div>
      <div className=" text-red-400 text-[40px] text-center font-extrabold p-10 bg-black pb-32 ">
        <div className="container mx-auto">
          Has Convert YT
        </div>
      </div>
      <div className="translate-y-[-80px]">
        <YoutubeServices />
        <div className="bg-white flex justify-center py-6 container mx-auto">
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
