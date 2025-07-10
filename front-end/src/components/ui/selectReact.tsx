import { useSearchParams } from "react-router-dom";
import Select from "react-select";

export default function SelectReact({
  locationOptions,
  isLoading,
  isDropOff,
}: {
  locationOptions: { value: string; label: string }[];
  isLoading: boolean;
  isDropOff?: boolean;
}) {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      border: state.isFocused ? "3px solid #ea580c" : "1px solid #d1d5db",
      margin: state.isFocused ? "0px" : "2px",
      padding: "9px",
      borderColor: state.isFocused ? "#ea580c" : "gray",
      boxShadow: state.isFocused ? "0 0 0px #ea580c" : "none",
      "&:hover": { borderColor: "#ea580c" },
      backgroundColor: "transparent",
    }),
    option: (
      base: any,
      { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...base,
      overflow: "hidden",
      backgroundColor: isSelected
        ? "#ea580c"
        : isFocused
        ? "rgba(255, 165, 0, 0.2)"
        : "white",
      color: isSelected ? "white" : "black",
      cursor: "pointer",
      padding: "10px",
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999999,

      borderRadius: "10px",
      overflow: "hidden",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "black",
    }),
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChanges = (e: { value: string; label: string } | null) => {
    if (e) {
      if (isDropOff) {
        localStorage.setItem("dropOffLocation", e.label);
        searchParams.set("dropOffLocation", e.value);
      } else {
        localStorage.setItem("pickUpLocation", e.label);
        searchParams.set("pickUpLocation", e.value);
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <Select
      styles={customStyles}
      isDisabled={false}
      isLoading={isLoading}
      isClearable={false}
      isSearchable={true}
      name="color"
      options={locationOptions}
      onChange={handleChanges}
      value={
        isDropOff
          ? locationOptions.find(
              (opt) => opt.value === searchParams.get("dropOffLocation")
            ) ||
            locationOptions.find(
              (opt) => opt.label === localStorage.getItem("dropOffLocation")
            ) ||
            null
          : locationOptions.find(
              (opt) => opt.value === searchParams.get("pickUpLocation")
            ) ||
            locationOptions.find(
              (opt) => opt.label === localStorage.getItem("pickUpLocation")
            ) ||
            null
      }
    />
  );
}
