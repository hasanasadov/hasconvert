import { useEffect, useState } from "react";

import { ArrowLeftIcon, User2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { RenderIf } from "../RenderIf";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getFavAsync, selectAuth } from "@/store/auth";
import { toast } from "sonner";
import { AxiosResponseError } from "@/types";
import favoriteService from "@/services/favorite";

type Props = {
  rentId: string;
};

export const QuickRentCardMD = ({ rentId }: Props) => {
  const { openDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.RENT_BY_ID, rentId],
    queryFn: () => rentService.getById({ id: rentId }),
  });

  const {
    title,
    category,
    gear,
    imageUrls,
    passangers,
    capacityBag,
    capacitySuitcase,
    doors,
    currency,
    minAgeToDrive,
    maxKmAllowedPerDay,
    price,
    fuelPricePerKm,
    unlimitedKmPrice,
  } = data?.data.item ?? {};

  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useAppSelector(selectAuth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsLiked(favorites.includes(rentId!));
    }
  }, [favorites, rentId]);
  const onError = (error: AxiosResponseError) => {
    toast.error(error.response?.data.message ?? "Something went wrong!");
    setIsLiked(!isLiked);
  };
  const { mutate } = useMutation({
    mutationFn: favoriteService.toggle,
    onSuccess: () => {
      toast.success("Favorite updated successfully.");
      dispatch(getFavAsync());
    },
    onError,
  });
  const [selectedOption, setSelectedOption] = useState(1);
  const days = Number(localStorage.getItem("days"));
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("unlimitedKm");
    setSelectedOption(1);
  }, [rentId]);
  return (
    <div className=" w-full flex flex-col sticky ">
      <div
        className="cursor-pointer absolute top-4 left-4 z-[100]"
        onClick={() => {
          searchParams.delete("scrollTo");
          searchParams.delete("rentId");
          setSearchParams(searchParams);
        }}
      >
        <ArrowLeftIcon className="text-white" />
      </div>
      <div className="relative text-white w-full  h-full flex flex-col  justify-between items-start ">
        <div className="!relative h-[40vh] w-full">
          <button
            onClick={() => {
              mutate({ id: rentId! });
              setIsLiked(!isLiked);
            }}
            className="h-fit absolute top-4 right-4 z-[100] "
          >
            <img
              src={isLiked ? HeartFilledImg : HeartOutlinedImg}
              alt="heart"
            />
          </button>
          <img
            className=" absolute top-0 left-0 -z-[1] w-full h-full object-cover"
            src="https://img.sixt.com/1600/6f09b0e8-6820-4ac0-bedd-5797e9814c18.jpg"
            alt="Background"
          />
          <RenderIf condition={isLoading}>
            <div className="absolute w-full h-fit top-[90%] left-0  object-cover  translate-y-[-50%] bg-black bg-opacity-40 animate-pulse"></div>
          </RenderIf>
          <img
            className=" w-full h-full  top-0 left-0  object-contain "
            src={imageUrls?.[0]}
            alt=""
          />
        </div>

        <div className="flex text-black bg-gray-100 p-4 flex-col gap-2 justify-between h-full w-full z-50 ">
          <div className="flex flex-col">
            <RenderIf condition={isLoading}>
              <span className="lg:w-48 w-24 h-6 rounded-lg bg-white animate-pulse"></span>
            </RenderIf>
            <div className="text-[20px] font-extrabold">
              {title}
              <span
                className={`${
                  isLoading ? "hidden " : ""
                } !text-[16px] !font-normal`}
              >
                {" "}
                or similar
              </span>
            </div>
            <RenderIf condition={isLoading}>
              <span className="lg:w-24 w-12 h-4 mt-3 rounded-md bg-white animate-pulse"></span>
            </RenderIf>
            <div className=" text-[14px] font-bold mt-1">{category?.title}</div>
          </div>

          <div className="w-full mb-2  grid grid-cols-2 items-center  justify-center">
            <div className="flex gap-3 items-center  w-fit p-1 px-3 rounded-full">
              <User2 size={16} />
              <div className="text-[14px]">{passangers} Seats</div>
            </div>
            <div className="flex gap-3 items-center  p-1 px-3 rounded-full">
              <div className="w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="w-fit max-w-10 h-6 flex "
                >
                  <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 18H8V9h1.5v9zm3.25 0h-1.5V9h1.5v9zm.75-12h-3V3.5h3V6zM16 18h-1.5V9H16v9z"></path>
                </svg>
              </div>
              <div
                className={`${
                  isLoading ? "animate-pulse  bg-white rounded-md" : ""
                } text-[14px] `}
              >
                {capacitySuitcase} Suit cases
              </div>
            </div>
            <div className="flex gap-3 items-center   w-fit max-w-10 p-1 px-3 rounded-full">
              <div className="w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="w-fit max-w-10 h-6 flex "
                >
                  <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"></path>
                </svg>
              </div>
              <div
                className={`${
                  isLoading ? "animate-pulse  bg-white rounded-md" : ""
                } text-[14px] `}
              >
                {capacityBag} Bags
              </div>
            </div>
            <div className="flex gap-3 items-center   w-fit max-w-10 p-1 px-3 rounded-full">
              <div className="w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="w-fit max-w-10 h-6 flex "
                >
                  <path d="M9.93 13.5h4.14L12 7.98 9.93 13.5zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.29 15.88l-.9-2.38H9.17l-.89 2.37a.968.968 0 11-1.81-.69l4.25-10.81c.22-.53.72-.87 1.28-.87s1.06.34 1.27.87l4.25 10.81a.968.968 0 01-.9 1.32c-.4 0-.76-.25-.91-.62z"></path>
                </svg>
              </div>
              <div
                className={`${
                  isLoading ? "animate-pulse  bg-white rounded-md" : ""
                } text-[14px] `}
              >
                {gear}
              </div>
            </div>
            <div className="flex gap-3 items-center   w-fit max-w-10 p-1 px-3 rounded-full">
              <div className="w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.281 3.833l2.553 2.553v1.447H5.167v-4H9.28zM5.167 10.5v-.667h2v.667h-2zm0-8c-.737 0-1.333.597-1.333 1.333v9.334c0 .736.596 1.333 1.333 1.333h4.667a3.333 3.333 0 013.333-3.333V6.386c0-.354-.14-.693-.39-.943L10.223 2.89c-.25-.25-.59-.391-.943-.391H5.167z"></path>
                </svg>
              </div>
              <div
                className={`${
                  isLoading ? "animate-pulse  bg-white rounded-md" : ""
                } text-[14px] `}
              >
                {doors} Doors
              </div>
            </div>
            <div className="flex gap-3 items-center   w-fit max-w-10 p-1 px-3 rounded-full">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="w-full h-6 flex "
                  viewBox="0 0 20 20"
                >
                  <path d="M13.834 3.166H3.167c-.74 0-1.327.593-1.327 1.333l-.007 8c0 .74.594 1.334 1.334 1.334h10.666a1.33 1.33 0 001.334-1.334v-8c0-.74-.594-1.333-1.333-1.333zm-8 5.333a1.666 1.666 0 11-.001-3.332 1.666 1.666 0 010 3.332zm0 .834c1.112 0 2.666.558 2.666 1.666v.834H3.167v-.834c0-1.108 1.554-1.666 2.667-1.666zm3.333-4.167h4a.667.667 0 110 1.333h-4a.667.667 0 010-1.333zm0 3.333c0-.368.298-.666.667-.666h3.333a.667.667 0 110 1.333H9.834a.667.667 0 01-.667-.667zm1.333 2h2.667a.667.667 0 010 1.334H10.5a.667.667 0 010-1.334z"></path>
                </svg>
              </div>
              <div
                className={`${
                  isLoading ? "animate-pulse  bg-white rounded-md" : ""
                } text-[14px] `}
              >
                Minimum age of the youngest drive: {minAgeToDrive}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-4 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="font-bold">Booking option</div>
            </div>
            <div className="w-full gap-6 border-2  border-black  rounded-lg flex justify-between items-center p-3">
              <div>
                <div className="font-bold">Stay Flexible</div>
                <div className="text-[12px] text-gray-600">
                  Pay at pick-up, free cancellation and rebooking any time
                  before pick-up time
                </div>
              </div>
              <div>Included</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-bold">Mileage</div>
            <div>
              <div
                onClick={() => {
                  localStorage.removeItem("unlimitedKm");

                  setSelectedOption(1);
                }}
                className={`${
                  selectedOption === 1 ? "" : "border-gray-400 border-b-0"
                } w-full cursor-pointer gap-6 border-2 rounded-b-none border-black  rounded-lg flex justify-between items-center p-3 `}
              >
                <div className="flex gap-4 items-center w-[70%]">
                  <div
                    className={`${
                      selectedOption === 1 ? "bg-black" : ""
                    } rounded-full w-6 h-6 min-w-fit  flex items-center justify-center border border-gray-600`}
                  >
                    <div className="rounded-full w-3 h-3 bg-white"></div>
                  </div>
                  <div className="w-[70%] ">
                    <div className="font-bold">
                      {days * maxKmAllowedPerDay!}km
                    </div>
                    <div className="text-[12px] text-gray-600">
                      +${fuelPricePerKm} / for every additional km
                    </div>
                  </div>
                </div>

                <div>Included</div>
              </div>
              <div
                onClick={() => {
                  localStorage.setItem(
                    "unlimitedKm",
                    unlimitedKmPrice!.toString()
                  );
                  setSelectedOption(2);
                }}
                className={`${
                  selectedOption === 2 ? " border-t-2" : "border-gray-400"
                } w-full cursor-pointer gap-6 border-2 rounded-t-none border-t-0 border-black  rounded-lg flex justify-between items-center p-3 `}
              >
                <div className="flex gap-4 items-center !w-[70%]">
                  <div
                    className={`${
                      selectedOption === 2 ? "bg-black" : ""
                    } rounded-full w-6 h-6 min-w-6 max-h-6 flex items-center justify-center border border-gray-600`}
                  >
                    <div className="rounded-full w-3 h-3 bg-white"></div>
                  </div>
                  <div>
                    <div className="font-bold">Unlimited Kilometers</div>
                    <div className="text-[10px] text-gray-600">
                      All kilometers are included in the price
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    isLoading
                      ? "animate-pulse  h-6 w-24 bg-black  rounded-md"
                      : ""
                  } text-nowrap `}
                >
                  {" "}
                  + {currency == "USD" ? "$" : "₼"} {unlimitedKmPrice} / day
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 font-bold items-end justify-between">
              {/* <FormattedPrice
                price={price + (selectedOption == 2 ? unlimitedKmPrice : 0)}
              /> */}
              <div className="text-xl">Total</div>

              <div
                className={`${
                  isLoading
                    ? "animate-pulse  h-5 w-20 bg-black  rounded-md !text-black "
                    : ""
                }  text-gray-600 text-[14px]`}
              >
                {currency === "USD" ? "$" : "₼"}
                {price! * days +
                  (selectedOption! == 2 ? unlimitedKmPrice! : 0) * days}{" "}
              </div>
            </div>
            <div
              aria-disabled={isLoading}
              onClick={() => {
                openDialog(DialogTypeEnum.PRICE);
              }}
              className="hoverUnderlineAnti  w-fit font-bold text-[13px]"
            >
              Price Details
            </div>
          </div>
          <Button
            disabled={isLoading}
            onClick={() => {
              localStorage.setItem(
                "initialPrice",
                (
                  price! * days +
                  (selectedOption == 2 ? unlimitedKmPrice! : 0) * days
                ).toString()
              );
              localStorage.setItem("currency", currency!);
              navigate(`/detail/${rentId}`);
            }}
            className="w-full !py-4 rounded-xl text-[16px] !font-bold bg-orange-600 hover:bg-orange-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
