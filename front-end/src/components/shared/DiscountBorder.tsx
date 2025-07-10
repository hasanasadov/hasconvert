const DiscountBorder = ({ discount }: { discount: number }) => {
  return (
    <div className="w-[180px] relative ml-5">
      <div className="rightUpper absolute bottom-0 -left-5"></div>
      <div className="rightUpper absolute bottom-0 -right-5 rotate-180"></div>

      <div className="flex gap-3 items-center -mb-3">
        <div className="w-[30%] h-[2px] bg-white"></div>
        <div className="w-[30%] ">UP TO</div>
        <div className="w-[30%] h-[2px] bg-white"></div>
      </div>
      <div className="flex flex-col items-center !text-[35px] font-bold text-white">
        <span className="text-[44px]">{discount}%</span>
        <span className="text-[30px] leading-6">DISCOUNT</span>
      </div>
      <div className="mt-2">
        <div className="w-[100%] h-[2px] bg-white"></div>
      </div>
    </div>
  );
};

export default DiscountBorder;
