import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ToggleSwitch = ({ optionNumber }: { optionNumber: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [switchState, setSwitchState] = useState(true);

  function handleOnChange() {
    setSwitchState(!switchState);
    const selectedIdx = searchParams.getAll("sO").map(Number);
    if (selectedIdx.includes(optionNumber)) {
      searchParams.delete("sO");
      selectedIdx
        .filter((i) => i !== optionNumber)
        .forEach((i) => searchParams.append("sO", i.toString()));
    } else {
      searchParams.append("sO", optionNumber.toString());
    }
    setSearchParams(searchParams);
  }

  useEffect(() => {
    const selectedIdx = searchParams.getAll("sO").map(Number);
    setSwitchState(!selectedIdx.includes(optionNumber));
  }, [searchParams]);

  return (
    <label
      htmlFor={`checkbox-${optionNumber}`}
      className={`relative block w-14 h-8 rounded-full cursor-pointer ${
        switchState ? "bg-gray-500" : "bg-black"
      }`}
    >
      <input
        id={`checkbox-${optionNumber}`}
        type="checkbox"
        checked={switchState}
        onChange={handleOnChange}
        className="sr-only"
      />
      <span
        className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
          switchState ? "left-1" : "left-7"
        }`}
      />
    </label>
  );
};
