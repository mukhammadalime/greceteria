import { useCallback, useState } from "react";

const FilterOptions = ({
  options,
  title,
  onSelect,
  onToggle,
  open,
  defaultValue,
  query,
  forOrderDetails,
}: FilterOptionsProps) => {
  // If there is query in state, we remember it and show the before set query option when the user comes back to it again.
  defaultValue = query
    ? options.find((i) => i.id === query)?.name
    : defaultValue;
  const [option, setOption] = useState<string | null>(defaultValue || title);

  const setOptionHandler = useCallback(
    (name: string, id: string) => {
      setOption(name);
      onSelect(id);
      onToggle();
    },
    [onSelect, onToggle]
  );

  // If there is query, we show the 'Clear' option. (not in OrderDetails page)
  if (!forOrderDetails)
    options = options.slice(0, query ? options.length : options.length - 1);

  return (
    <div className={`choose${open ? " options-open" : ""}`}>
      <div className="chosen" onClick={onToggle}>
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

interface FilterOptionsProps {
  options: { name: string; id: string }[];
  title: string;
  onSelect: (id: string) => void;
  onToggle: () => void;
  open: boolean;
  defaultValue?: string;
  query?: string;
  forOrderDetails?: boolean;
}

export default FilterOptions;
