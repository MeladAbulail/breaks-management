import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const SelectComponent = ({
  options,
  placeholder = "Select",
  onChange,
  className = "",
}) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    setSelected(null);
    if (onChange) onChange(null);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-white" : "bg-gray-100"
        } w-full flex justify-between items-center p-2 border border-gray-300 shadow-sm text-gray-900 font-semibold relative`}
      >
        <span>
          {selected
            ? options.find((opt) => opt.label === selected)?.label
            : placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selected && (
            <FiX
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleClear}
            />
          )}
          <FiChevronDown
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.label)}
              className="p-4 bg-gray-100 cursor-pointer text-gray-900"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
