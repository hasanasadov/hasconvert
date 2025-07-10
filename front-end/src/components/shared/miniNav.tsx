import { useLocation } from "react-router-dom";
import { RenderIf } from "./RenderIf";
import { paths } from "@/constants/paths";
import { useTranslation } from "react-i18next";

const MiniNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const years = new Date().getFullYear() - 1913;
  const condition =
    location.pathname === paths.HOME ||
    location.pathname === paths.TRUCKS ||
    location.pathname === paths.DISCOUNTS ||
    location.pathname === paths.BUSINESS;
  return (
    <RenderIf condition={condition}>
      <div className="bg-orange-600 text-center font-bold text-sm leading-6 font-sans  text-gray-900">
        {years} {t("years of SIXT")}. {years} {t("years of tradition")}.
        <div className="availability -z-40"></div>
      </div>
    </RenderIf>
  );
};

export default MiniNav;
