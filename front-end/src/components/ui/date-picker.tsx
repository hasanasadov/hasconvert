import { useEffect, useState } from "react";
import { format, addMonths } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import "react-day-picker/dist/style.css"; // Ensure default styles are imported
import { Calendar } from "./calendar";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RenderIf } from "../shared/RenderIf";

type Props = {
  onChange: (range: { startDate?: Date; endDate?: Date }) => void;
  defaultStartDate?: string | null;
  defaultEndDate?: string | null;
  disabledDates?: (date: Date) => boolean;
};

export function DateRangePicker({
  onChange,
  // defaultStartDate,
  // defaultEndDate,
  disabledDates,
}: Props) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.get("pickUpDate")
      ? new Date(searchParams.get("pickUpDate")!)
      : new Date(localStorage.getItem("pickUpDate")!)
      ? new Date(new Date().setDate(new Date().getDate() + 1))
      : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.get("dropOffDate")
      ? new Date(
          localStorage.getItem("dropOffDate") ??
            searchParams.get("dropOffDate")!
        )
      : new Date(localStorage.getItem("dropOffDate")!)
      ? new Date(new Date().setDate(new Date().getDate() + 3))
      : undefined
  );

  localStorage.setItem("pickUpDate", startDate?.toString()!);
  localStorage.setItem("dropOffDate", endDate?.toString()!);
  searchParams.set("pickUpDate", startDate?.toString()!);
  searchParams.set("dropOffDate", endDate?.toString()!);

  disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  useEffect(() => {
    const pickUpDateSearch = searchParams.get("pickUpDate") ? startDate : null;
    const dropOffDateSearch = searchParams.get("dropOffDate") ? endDate : null;

    if (pickUpDateSearch) {
      localStorage.setItem("pickUpDate", pickUpDateSearch.toString());
    } else {
      localStorage.setItem("pickUpDate", new Date().toString());
    }

    if (dropOffDateSearch) {
      localStorage.setItem("dropOffDate", dropOffDateSearch.toString());
    } else {
      localStorage.setItem(
        "dropOffDate",
        new Date(new Date().setDate(new Date().getDate() + 2)).toString()
      );
    }

    const dayDifferece = Math.ceil(
      (new Date(dropOffDateSearch!).getTime() -
        new Date(pickUpDateSearch!).getTime()) /
        (1000 * 60 * 60 * 24) +
        1
    );
    if (dayDifferece > 1) {
      localStorage.setItem("days", dayDifferece.toString());
    }
  }, [searchParams]);

  const handleSelectDate = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      // Set start date if none is selected or both are already selected
      setStartDate(date);
      setEndDate(undefined);
      onChange({ startDate: date, endDate: undefined });
      updateSearchParams(date, undefined);
    } else if (date && startDate && date < startDate) {
      // If selecting before the start date, update start date
      setStartDate(date);
      onChange({ startDate: date, endDate });
      updateSearchParams(date, endDate);
    } else {
      // Otherwise, set the end date
      setEndDate(date);
      onChange({ startDate, endDate: date });
      updateSearchParams(startDate, date);
    }
  };

  const updateSearchParams = (startDate?: Date, endDate?: Date) => {
    const params = new URLSearchParams(searchParams.toString());

    if (startDate) {
      params.set("pickUpDate", format(startDate, "yyyy MMM dd"));
    } else {
      params.delete("pickUpDate");
    }

    if (endDate) {
      params.set("dropOffDate", format(endDate, "yyyy MMM dd"));
    } else {
      params.delete("dropOffDate");
    }

    setSearchParams(params);
  };
  const [clicked, setClicked] = useState(false);

  return (
    <Popover>
      <RenderIf condition={clicked}>
        <div
          onMouseDown={() => {
            setClicked(!clicked);
          }}
          className="absolute duration-500 z-50 bg-black bg-opacity-40 w-screen h-[200vh] p-4 -top-[50%] left-0"
        ></div>
      </RenderIf>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-md bg-white hover:bg-white text-sm font-medium !p-0",
            !startDate && !endDate && "text-muted-foreground"
          )}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <div className="flex items-center text-black gap-10">
            <div className="flex flex-col gap-2 items-start">
              <div className="font-helvetica text-[12px] ml-0.5 font-bold">
                {t("Pick-up Date")}
              </div>
              <div className="text-sm p-4 rounded-xl m-[2px] border bg-transparent border-gray-300 hover:border-orange-600 hover:border-[3px] hover:m-0">
                {startDate
                  ? format(startDate, "EEE, MMM d, yyyy")
                  : "Start Date"}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="font-helvetica text-[12px] ml-0.5 font-bold">
                {t("Return Date")}
              </div>
              <div className="text-sm p-4 rounded-xl m-[2px] border bg-transparent border-gray-300 hover:border-orange-600 hover:border-[3px] hover:m-0">
                {endDate ? format(endDate, "EEE, MMM d, yyyy") : "End Date"}
              </div>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-auto z-[9999999999999]   -translate-y-72 md:translate-y-0 rounded-[16px] flex flex-col md:flex-row gap-4 p-4 bg-white max-h-[70vh] overflow-y-scroll">
        {[0, 1, 2].map((offset) => (
          <Calendar
            key={offset}
            mode="single"
            selected={startDate || endDate}
            onSelect={handleSelectDate}
            className="!text-black"
            fromMonth={new Date()}
            disabled={(date) => disabledDates?.(date) ?? false}
            month={addMonths(new Date(), offset)}
            classNames={{
              day: cn(
                "h-12 w-12 p-2 font-extrabold text-secondary-500/80",
                "hover:bg-accent hover:text-black",
                "focus:bg-gary-200 focus:text-black",
                "aria-selected:opacity-100",
                "aria-selected:bg-primary aria-selected:text-primary-foreground",
                "aria-selected:rounded-xl",
                "aria-selected:rounded-l-xl first:aria-selected:rounded-l-xl",
                "aria-selected:rounded-r-xl last:aria-selected:rounded-r-xl"
              ),
              day_selected: "bg-accent !text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_disabled: "text-muted-foreground opacity-50",
              day_outside: "text-muted-foreground aria-selected:bg-accent/50",
            }}
            modifiers={{
              selected: [startDate, endDate].filter(
                (date): date is Date => date instanceof Date
              ),
              range:
                startDate && endDate ? [{ from: startDate, to: endDate }] : [],
              disabled: [(date) => disabledDates?.(date) ?? false],
            }}
            modifiersClassNames={{
              selected:
                "!bg-black text-white hover:text-white  !font-bold rounded-full",
              range: "bg-gray-200 !font-bold rounded-none",
              disabled: "text-gray-400 opacity-50 !bg-transparent !font-bold",
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
