// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import SelectReact from "@/components/ui/selectReact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { DateRangePicker } from "@/components/ui/date-picker";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import { QUERY_KEYS } from "@/constants/query-keys";
import locationService from "@/services/location";
import { Location } from "@/types";
import { useTranslation } from "react-i18next";
import { RenderIf } from "../RenderIf";

export const AvailabilityDialog = () => {
  const { t } = useTranslation();
  const { isOpen, closeDialog, type } = useDialog();
  const location = useLocation();
  const navigate = useNavigate();
  const isListPage = location.pathname === "/list";
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropOffSectionClicked, setDropOffSectionClicked] = useState(
    searchParams.get("dropOffLocation") ? true : false
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll,
  });

  const locations =
    data?.data?.items.map((item: Location) => ({
      label: item.title,
      value: item._id,
    })) || [];

  const handleSubmit = () => {
    if (searchParams.get("pickUpDate") && searchParams.get("dropOffDate")) {
      localStorage.setItem("pickUpDate", searchParams.get("pickUpDate")!);
      localStorage.setItem("dropOffDate", searchParams.get("dropOffDate")!);
    }
    const pickUpLocation = localStorage.getItem("pickUpLocation");
    const dropOffLocation = localStorage.getItem("dropOffLocation");
    const hasDropOffLocation = dropOffLocation !== undefined;
    localStorage.setItem(
      "dropOffLocation",
      hasDropOffLocation ? dropOffLocation! : pickUpLocation!
    );

    searchParams.delete("showAvailabilityFilter");
    setSearchParams(searchParams);
    closeDialog();
    if (!isListPage) {
      navigate(`/list?${searchParams.toString()}`);
    }
  };

  if (isOpen && type !== DialogTypeEnum.AVAILABILITY) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-none min-h-screen p-0 ">
        <DialogHeader className="mt-3">
          <DialogTitle className="text-md font-bold lg:text-3xl">
            {t("Your Rental Details")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[90vh] flex-col gap-10">
          <div className="flex flex-col sm:flex-row justify-between h-fit gap-10">
            <div className="flex flex-col gap-2  md:w-1/2 px-3">
              <p className="font-helvetica text-[17px] ml-0.5 font-bold">
                {!dropOffSectionClicked ? "Pickup & return" : "Pickup"}
              </p>
              <SelectReact
                locationOptions={locations}
                isLoading={isLoading}
                isDropOff={false}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-1/2 items-start justify-end ">
              <div className="flex flex-col px-4">
                <RenderIf condition={dropOffSectionClicked}>
                  <p className="font-helvetica inline-block text-[17px] ml-0.5 font-bold ">
                    {t("Return")}
                  </p>
                </RenderIf>
                <RenderIf condition={!dropOffSectionClicked}>
                  <Button
                    className="border-none bg-transparent text-gray-400  flex rounded-xl  hover:bg-transparent !px-0"
                    variant={"ghost"}
                    onClick={() => {
                      setDropOffSectionClicked(!dropOffSectionClicked);
                    }}
                  >
                    <Plus /> {t("Different return location")}
                  </Button>
                </RenderIf>
              </div>

              <div className="relative w-full px-3">
                <RenderIf condition={dropOffSectionClicked}>
                  <div>
                    <SelectReact
                      locationOptions={locations}
                      isLoading={isLoading}
                      isDropOff={true}
                    />
                  </div>
                </RenderIf>
              </div>
              <div className="h-2 bg-gray-200 w-full mt-5"></div>
            </div>
          </div>

          <div className="-mt-1     flex flex-col  sm:flex-row justify-between h-fit gap-5">
            <div className="h-fit  flex px-3">
              <DateRangePicker
                onChange={(range) => console.log("Selected range:", range)}
              />
            </div>
            <div className="h-2 bg-gray-200 w-full"></div>

            <div className="flex flex-col w-full sm:w-fit items-center gap-4 px-3 ">
              <Button
                className="rounded-xl text-[17px] !font-bold  h-[55px] sm:w-[200px] w-full bg-orange-600 text-white "
                variant={"outline"}
                disabled={
                  (!searchParams.get("pickUpDate") ||
                    !searchParams.get("dropOffDate") ||
                    !searchParams.get("pickUpLocation")) &&
                  (!localStorage.getItem("pickUpDate") ||
                    !localStorage.getItem("dropOffDate") ||
                    !localStorage.getItem("pickUpLocation"))
                }
                onClick={handleSubmit}
              >
                {t("Show Cars")}
              </Button>
              <div className="hoverUnderlineAnti  text-[14px] font-helvetica font-bold w-fit border-b-2">
                {t("Apply corporate rate")}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
