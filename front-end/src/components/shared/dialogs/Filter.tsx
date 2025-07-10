import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeftIcon, Car } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/services/category";
import { QUERY_KEYS } from "@/constants/query-keys";

export const FilterDialog = () => {
  const { isOpen, closeDialog, type } = useDialog();

  const [searchParams, setSearcParams] = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>();
  const [selectedGear, setSelectedGear] = useState<string[]>([]);
  const [selectedPassanger, setSelectedPassanger] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  useEffect(() => {
    setSelectedTypes(searchParams.getAll("vehicleType"));
    setSelectedSort(searchParams.get("sort") ?? "");
    setSelectedGear(searchParams.getAll("gear"));
    setSelectedPassanger(searchParams.get("passanger") ?? "");
    setSelectedAge(searchParams.get("minAgeToDrive") ?? "");
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: categoryService.getAll,
  });

  const vehicleTypes = data?.data?.items.map((category) => ({
    value: category._id,
    label: category.title,
    count: category.rents.length,
  }));

  const sortTypes = [
    { label: "Price low to high", value: "price_low_to_high" },
    { label: "Price high to low", value: "price_high_to_low" },
  ];

  const gearTypes = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ];

  const passangerTypes = [
    { label: "2+", value: "2" },
    { label: "4+", value: "4" },
    { label: "5+", value: "5" },
    { label: "7+", value: "7" },
  ];

  const ageTypes = [
    { label: "18+", value: "18" },
    { label: "21+", value: "21" },
    { label: "25+", value: "25" },
  ];

  const handleTypeChange = (type: string) => {
    const params = searchParams.getAll("vehicleType");
    const paramIndex = params.indexOf(type);
    if (paramIndex !== -1) {
      params.splice(paramIndex, 1);
    } else {
      params.push(type);
    }
    searchParams.delete("vehicleType");
    params.forEach((param) => {
      searchParams.append("vehicleType", param);
    });
    setSearcParams(searchParams);
    setSelectedTypes(params);
  };

  const handleSortChange = (type: string) => {
    if (selectedSort === type) {
      searchParams.delete("sort");
      setSearcParams(searchParams);
      setSelectedSort("");
    } else {
      searchParams.delete("sort");
      searchParams.append("sort", type);
      setSearcParams(searchParams);
      setSelectedSort(type);
    }
  };

  const handleGearChange = (type: string) => {
    const params = searchParams.getAll("gear");
    const paramIndex = params.indexOf(type);
    if (paramIndex !== -1) {
      params.splice(paramIndex, 1);
    } else {
      params.push(type);
    }
    searchParams.delete("gear");
    params.forEach((param) => {
      searchParams.append("gear", param);
    });
    setSearcParams(searchParams);
    setSelectedGear(params);
  };

  const handlePassangerChange = (type: string) => {
    if (selectedPassanger === type) {
      searchParams.delete("passanger");
      setSearcParams(searchParams);
      setSelectedPassanger("");
    } else {
      searchParams.delete("passanger");
      searchParams.append("passanger", type);
      setSearcParams(searchParams);
      setSelectedPassanger(type);
    }
  };

  const handleAgeChange = (type: string) => {
    if (selectedAge === type) {
      searchParams.delete("minAgeToDrive");
      setSearcParams(searchParams);
      setSelectedAge("");
    } else {
      searchParams.delete("minAgeToDrive");
      searchParams.append("minAgeToDrive", type);
      setSearcParams(searchParams);
      setSelectedAge(type);
    }
  };

  if (isOpen && type !== DialogTypeEnum.FILTER) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !p-3 !h-screen overflow-scroll !rounded-none ">
        <div className="w-full p-1  duration-500 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Button
              variant={"ghost"}
              className="!p-0 bg-transparent"
              onClick={closeDialog}
            >
              <ArrowLeftIcon size={36} />
            </Button>
            <DialogTitle className="text-xl lg:text-3xl">
              Filters & Sort
            </DialogTitle>
            <Button
              variant={"ghost"}
              className="hoverUnderlineAnti hover:bg-transparent !w-fit !p-0 !bg-white"
              onClick={() => {
                setSearcParams(new URLSearchParams());
              }}
            >
              Clear
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="boldedSpan !text-sm">Sort by</span>
            <div className="flex flex-wrap gap-2">
              {sortTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={
                    selectedSort?.includes(type.value)
                      ? "blacked"
                      : "antiBlacked"
                  }
                  onClick={() => handleSortChange(type.value)}
                >
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="boldedSpan !text-sm">Vehicle type</span>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes?.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      selectedTypes.includes(type.value)
                        ? "blacked"
                        : "antiBlacked"
                    }
                    onClick={() => handleTypeChange(type.value)}
                  >
                    <Car size={24} />
                    <span>
                      {type.label}
                      {/* ({type.count}) */}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="boldedSpan !text-sm">Gear</span>
              <div className="flex flex-wrap gap-2">
                {gearTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      selectedGear.includes(type.value)
                        ? "blacked"
                        : "antiBlacked"
                    }
                    onClick={() => handleGearChange(type.value)}
                  >
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="boldedSpan !text-sm">Passanger</span>
              <div className="flex flex-wrap gap-2">
                {passangerTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      selectedPassanger === type.value
                        ? "blacked"
                        : "antiBlacked"
                    }
                    onClick={() => handlePassangerChange(type.value)}
                  >
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="boldedSpan !text-sm">Age</span>
              <div className="flex flex-wrap gap-2">
                {ageTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      selectedAge === type.value ? "blacked" : "antiBlacked"
                    }
                    onClick={() => handleAgeChange(type.value)}
                  >
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant={"blacked"}
              className="!w-full font-bold !bg-orange-600"
              onClick={closeDialog}
            >
              Show Offers
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
