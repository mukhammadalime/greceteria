import React, { useRef, useState } from "react";

const FilterOptions = ({
  options,
  title,
}: {
  options: string[];
  title: string;
}) => {
  const [option, setOption] = useState<string | null>(title);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showOptions, setShowOptions] = useState<boolean>(() => false);

  const setOptionHandler = (e: React.MouseEvent) => {
    setOption((e.target as HTMLElement).textContent);
  };

  return (
    <div className={`choose ${showOptions && "options-open"}`}>
      <div
        className="chosen"
        onClick={() => setShowOptions(!showOptions)}
        ref={btnRef}
      >
        {option}
        <img src="/assets/icons/arrow-down-icon.svg" alt="" ref={imgRef} />
      </div>
      <ul className="options">
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
