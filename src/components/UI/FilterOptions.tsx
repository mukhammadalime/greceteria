import { useCallback, useState } from "react";

const FilterOptions = ({
  options,
  title,
  onSelect,
  onToggle,
  open,
  defaultValue,
  query,
  clearOption,
  addSelectedNotAllowed,
}: FilterOptionsProps) => {
  // If there is query in state, we remember it and show the before set query option when the user comes back to it again.
  defaultValue = query
    ? options.find((i) => i._id === query)?.name
    : defaultValue;
  const [option, setOption] = useState<string | null>(defaultValue || title);

  const setOptionHandler = useCallback(
    (name: string, id: string) => {
      if (!addSelectedNotAllowed) setOption(name);
      onSelect(id);
      onToggle();
    },
    [onSelect, onToggle, addSelectedNotAllowed]
  );

  // If there is query, we show the 'Clear' option (in OrderHistory and Customers pages).
  if (clearOption)
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
            key={item._id}
            className="options__item"
            onClick={setOptionHandler.bind(null, item.name, item._id)}
            children={item.name}
          />
        ))}
      </ul>
    </div>
  );
};

interface FilterOptionsProps {
  options: { name: string; _id: string }[];
  title: string;
  onSelect: (id: string) => void;
  onToggle: () => void;
  open: boolean;
  defaultValue?: string;
  query?: string;
  clearOption?: boolean;
  addSelectedNotAllowed?: boolean;
}

export default FilterOptions;
