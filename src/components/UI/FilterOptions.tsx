import React, { useState } from "react";

const FilterOptions = ({
  options,
  title,
  onSelect,
  onToggle,
  open,
  defaultValue,
}: {
  options: { name: string; id: string }[];
  title: string;
  onSelect: (id: string) => void;
  onToggle: () => void;
  open: boolean;
  defaultValue?: string;
}) => {
  const [option, setOption] = useState<string | null>(defaultValue || title);

  const setOptionHandler = (name: string, id: string) => {
    setOption(name);
    onSelect(id);
    onToggle();
  };

  const onOpenOptionsHandler = () => {
    onToggle();
  };

  return (
    <div className={`choose${open ? " options-open" : ""}`}>
      <div className="chosen" onClick={onOpenOptionsHandler}>
        {option}
        <img src="/assets/icons/arrow-down-icon.svg" alt="" />
      </div>
      <ul className="options">
        {options.map((item) => (
          <li
            key={item.id}
            className="options__item"
            onClick={setOptionHandler.bind(null, item.name, item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(FilterOptions);
