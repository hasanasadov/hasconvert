import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import IconBlack from "@/assets/icons/sixtBlack.svg";
import { XIcon } from "lucide-react";
import { RenderIf } from "../RenderIf";

const HamburgerMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative z-[9999999] ${className}`}>
      <RenderIf condition={isOpen}>
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
      </RenderIf>
      <Button
        className="!px-0 bg-transparent hover:bg-transparent hover:scale-110   "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <HamburgerMenuIcon className="text-white !w-[20px] !h-[20px] " />
      </Button>
      <div
        className={`fixed top-0 left-0 w-[400px] h-full bg-white p-20 pt-10 z-50 ${
          isOpen ? "block  duration-500" : "-translate-x-full duration-500"
        }  `}
      >
        <div className="flex z-10 ">
          <Button
            className="!bg-transparent hover:bg-transparent hover:scale-105 shadow-none"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <XIcon
              color="black"
              className="text-white !w-[20px] !h-[20px] hover:scale-105"
            />
          </Button>
          <Link
            to={paths.HOME}
            className="flex gap-2 items-center   text-white text-[24px] md:text-[32px] font-bold text-primary leading-[36px] md:leading-[48px]"
          >
            <img src={IconBlack} alt="" />
          </Link>
        </div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex flex-col gap-4 mt-10"
        >
          <Link
            to={paths.HOME}
            className="text-black  hover:text-orange-600 text-2xl font-roboto font-bold"
          >
            Rent
          </Link>
          <Link
            to={paths.TRUCKS}
            className="text-black  hover:text-orange-600 text-2xl font-roboto font-bold"
          >
            Trucks
          </Link>
          <Link
            to={paths.HOME}
            className="text-black  hover:text-orange-600 text-2xl font-roboto font-bold"
          >
            Ride
          </Link>
          <Link
            to={paths.HOME}
            className="text-black  hover:text-orange-600 text-2xl font-roboto font-bold"
          >
            SIXT+
            <p className="text-sm font-normal">Car Subscription</p>
          </Link>
          <Link
            to={paths.BUSINESS}
            className="text-black  hover:text-orange-600 text-2xl font-roboto font-bold"
          >
            Bussiness
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
