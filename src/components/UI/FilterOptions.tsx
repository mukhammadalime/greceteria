import React, { useState } from "react";

const FilterOptions = ({
  options,
  title,
  onOpenHandler,
  open,
}: {
  options: string[];
  title: string;
  onOpenHandler: () => void;
  open: boolean;
}) => {
  const [option, setOption] = useState<string | null>(title);

  const setOptionHandler = (e: React.MouseEvent) => {
    setOption((e.target as HTMLElement).textContent);
    onOpenHandler();
  };

  const onOpenOptionsHandler = () => {
    onOpenHandler();
  };

  return (
    <div className={`choose${open ? " options-open" : ""}`}>
      <div className="chosen" onClick={onOpenOptionsHandler}>
        {option}
        <img src="/assets/icons/arrow-down-icon.svg" alt="" />
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
