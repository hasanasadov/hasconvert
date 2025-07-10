import SearchIcon from "@/assets/icons/search.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useTranslation } from "react-i18next";

let timeoutId: NodeJS.Timeout;
export const Search = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isListingPage = location.pathname.includes("list");

  function handleSearch(searchText: string) {
    clearTimeout(timeoutId);
    if (!searchText) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    timeoutId = setTimeout(() => {
      searchParams.set("search", searchText);
      setSearchParams(searchParams);
      if (!isListingPage) navigate(paths.LIST + `?${searchParams.toString()}`);
    }, 300);
  }

  return (
    <div
      className={`relative hidden !bg-transparent md:block lg:w-[w20px]  ${className}`}
    >
      <img
        src={SearchIcon}
        alt="search icon"
        className="absolute left-5 top-2.5"
      />
      <input
        onChange={(e) => handleSearch(e.target.value.trim())}
        placeholder={t("Search something here")}
        className="!bg-transparent text-white w-full border border-[#c3d4e966] rounded-[70px] py-[11px] pl-12 lg:pl-16 pr-11 placeholder:text-secondary placeholder:text-white text-sm font-medium leading-[20px] tracking-[-0.28px]"
      />
    </div>
  );
};
