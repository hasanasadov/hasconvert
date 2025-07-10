// import SeacrhIcon from "@/assets/icons/searchIcon.svg";
// import SettingsIcon from "@/assets/icons/settings.svg";
// import HeartIcon from "@/assets/icons/heart.svg";
// import ChartIcon from "@/assets/icons/chart.svg";
import {
  AmpersandIcon,
  CarFrontIcon,
  Currency,
  LogOut,
  User2Icon,
  UserIcon,
  UserRoundCogIcon,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
// import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logoutAsync, selectAuth } from "@/store/auth";
import { RenderIf } from "../RenderIf";
import { useTranslation } from "react-i18next";

export const NavbarActions = ({ isHomePage }: { isHomePage?: boolean }) => {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logoutAsync());
  }

  const location = window.location.pathname;
  const isDetailPage = location.includes("detail");

  return (
    <div className="flex  items-center gap-9 lg:gap-9 ml-2 ">
      <RenderIf condition={!!isHomePage}>
        <Button
          className=" !p-0 overflow-visible  bg-transparent hoverUnderline  !font-bold !text-white border-0 hover:bg-transparent "
          onClick={() => navigate(paths.RESERVATIONS)}
        >
          <div className="w-6 h-6">
            <CarFrontIcon className="!w-full !h-full" size={32} />
          </div>
          <span className="hidden lg:inline-block">{t("Manage Bookings")}</span>
        </Button>
      </RenderIf>
      <Button
        variant={"custom"}
        onClick={() => openDialog(DialogTypeEnum.LANGUAGE)}
        className={`!p-0 bg-transparent hoverUnderline  !font-bold !text-white border-0 hover:bg-transparent `}
      >
        <div className="w-6 h-6">
          <Currency className="!w-full !h-full" size={32} />
        </div>
        <span className="font-sans hidden xl:inline-block">{t("EN | $")}</span>
      </Button>
      <RenderIf condition={!loading}>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white scale-150 flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.avatar}
                        alt="user"
                      />
                    ) : (
                      <h1 className="font-extrabold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </h1>
                    )}
                  </div>
                </div>
                <div>
                  <span className="hidden lg:inline-block hoverUnderline text-white text-sm font-bold ">
                    {user.name} {user.surname}
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[20vw] mt-4 font-helvetica ">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.role === UserRole.Admin && (
                <DropdownMenuItem asChild>
                  <Link to={paths.DASHBOARD.MAIN} className="!text-lg py-3">
                    <div>
                      <AmpersandIcon />
                    </div>
                    {t("Dashboard")}
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to={paths.PROFILE.MAIN} className="!text-lg py-3">
                  <div>
                    <UserIcon />
                  </div>
                  {t("Personal Details")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={paths.FAVORITES} className="!text-lg py-3">
                  <div>
                    <img src={HeartFilledImg} alt="" />
                  </div>
                  {t("Favorite Cars")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={paths.RESERVATIONS} className="!text-lg py-3">
                  <div>
                    <UserRoundCogIcon />
                  </div>
                  {t("Reservations")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <div>
                  <LogOut />
                </div>
                <span className="!text-lg !py-2">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant={"custom"}
            disabled={isDetailPage}
            className={`!p-0 bg-transparent hoverUnderline  !font-bold !text-white border-0 hover:bg-transparent
              `}
            onClick={() => openDialog(DialogTypeEnum.LOGIN)}
          >
            <div className="w-6 h-6">
              <User2Icon className="!w-full !h-full" size={32} />
            </div>
            <span className="hidden md:inline-block ">
              {t("Log in | Register")}
            </span>
          </Button>
        )}
      </RenderIf>
    </div>
  );
};
