import React, { useRef, useState } from "react";

const FilterOptions = ({
  options,
  title,
  orderNumber,
}: {
  options: string[];
  title: string;
  orderNumber?: number;
}) => {
  const [option, setOption] = useState<string | null>(title);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showOptions, setShowOptions] = useState<boolean>(() => false);

  const [optionsCoordinates, setOptionsCoordinates] = useState({
    left: 0,
    top: 0,
  });

  const setOptionHandler = (e: React.MouseEvent) => {
    setOption((e.target as HTMLElement).textContent);
    setShowOptions(false);
  };

  const onOpenOptionsHandler = () => {
    setShowOptions((prevState) => !prevState);

    if (showOptions) return;
    const chooseBox = document.querySelector(
      `.choose-order-${orderNumber}`
    ) as HTMLDivElement;

    const chooseBoxPosition = chooseBox.getBoundingClientRect();
    const coordinates = {
      left: chooseBoxPosition.left,
      top: chooseBoxPosition.top,
    };
    setOptionsCoordinates(coordinates);
  };

  return (
    <div
      className={`choose choose-order-${orderNumber}${
        showOptions ? " options-open" : ""
      }`}
    >
      <div className="chosen" onClick={onOpenOptionsHandler} ref={btnRef}>
        {option}
        <img src="/assets/icons/arrow-down-icon.svg" alt="" ref={imgRef} />
      </div>
      <ul
        className="options"
        style={{
          left: optionsCoordinates.left,
          top: optionsCoordinates.top + 42,
        }}
      >
        {options.map((item) => (
          <li key={item} className="options__item" onClick={setOptionHandler}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(FilterOptions);
