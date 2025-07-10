import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deductibles } from "@/constants/deductibles";
import { RenderIf } from "../RenderIf";
import { bookingOptions } from "@/constants/bookOptions";

export const PriceDialog = () => {
  const { isOpen, closeDialog, type } = useDialog();

  const days = Number(localStorage.getItem("days")) || 0;

  const unlimitedKm = parseFloat(Number(localStorage.getItem("unlimitedKm")).toFixed(2)) || 0;
  const perDayPrice =
    parseFloat(Number(localStorage.getItem("pricePerDay")).toFixed(2)) || 0;
  const selectedOption =
    Number(localStorage.getItem("selectedDeductible")) || 1;
  const currency = localStorage.getItem("currency") || "$";

  const selectedBookingOptions = localStorage.getItem("selectedBookingOptions");
  const selectedOptions = selectedBookingOptions
    ? selectedBookingOptions.split(",").map(Number)
    : [];

  const totalDeductible = (
    deductibles.find((d) => d.option === selectedOption)?.price! * days
  ).toFixed(2);

  const totalBooking = selectedOptions.reduce((acc, idx) => {
    const foundOption = bookingOptions.find((d) => d.option === idx);
    const optionPrice =
      foundOption?.price! * (foundOption?.per === "day" ? days : 1);
    return acc + optionPrice;
  }, 0);

  const totalRentalPrice = (days * perDayPrice).toFixed(2);

  if (isOpen && type !== DialogTypeEnum.PRICE) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-[20px] p-12  z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl boldedSpan">
            PRICE DETAILS
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Rental charges</h3>
            <div className="flex justify-between">
              <div>
                {days} Rental days x {perDayPrice}
                {currency}
              </div>

              <div>
                {totalRentalPrice} {currency}
              </div>
            </div>
            <RenderIf condition={!!unlimitedKm}>
              <div className="flex justify-between">
                <div>
                  Unlimited Kilometers {days} x {unlimitedKm}
                </div>
                <div>
                  {days * unlimitedKm}  {currency}
                </div>
              </div>
            </RenderIf>
          </div>
          <RenderIf condition={selectedOption !== 1}>
            <div className="h-[2px] bg-gray-200"></div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Deductible options</span>
              <div className="flex justify-between">
                <span>
                  Loss Damage Waiver: {days} x{" "}
                  {deductibles.find((d) => d.option === selectedOption)?.price}
                  {currency}
                </span>

                <span>
                  {totalDeductible} {currency}
                </span>
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={selectedOption !== 1}>
            <div className="h-[2px] bg-gray-200"></div>
            <div className="flex flex-col gap-2">
              <div className="flex  justify-between">
                <div className="flex flex-col gap-1">
                  {selectedOptions.length > 0 && (
                    <span className="font-bold">Boooking options</span>
                  )}
                </div>
              </div>
              {selectedOptions.map((option) => (
                <div className="flex justify-between">
                  <span key={option}>
                    {bookingOptions.find((d) => d.option === option)?.title}
                    {bookingOptions.find((d) => d.option === option)?.per ===
                    "day"
                      ? `  ${days} x ${
                          bookingOptions.find((d) => d.option === option)?.price
                        }`
                      : ""}
                  </span>
                  <span>
                    {(
                      bookingOptions.find((d) => d.option === option)?.price! *
                      (bookingOptions.find((d) => d.option === option)?.per ===
                      "day"
                        ? days
                        : 1)
                    ).toFixed(2)}
                    {currency}
                  </span>
                </div>
              ))}
            </div>
          </RenderIf>

          <div className="h-[2px] bg-gray-200"></div>
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="boldedSpan">
              {(
                parseFloat(totalRentalPrice) +
                parseFloat(totalDeductible) +
                totalBooking +
                (unlimitedKm ? days * unlimitedKm : 0)
              ).toFixed(2)}{" "}
              {currency}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
