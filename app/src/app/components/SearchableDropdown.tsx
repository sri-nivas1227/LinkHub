import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  useMemo,
} from "react";

interface SearchableDropdownProps<T> {
  options: T[];
  label: keyof T;
  id: string;
  selectedVal: string | null;
  handleChange: (item: T | null) => void;
  placeholder?: string;
}

const SearchableDropdown = <T extends Record<string, any>>({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  placeholder = "Select...",
}: SearchableDropdownProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Filter options based on query
  const filteredOptions = options.filter((option) =>
    String(option[label]).toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset focused index when dropdown opens or filter changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [isOpen, query]);

  // Scroll focused element into view
  useEffect(() => {
    if (focusedIndex !== -1 && optionsRef.current) {
      const focusedElement = optionsRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex]);

  const selectOption = (option: T) => {
    setQuery("");
    handleChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") setIsOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex !== -1 && filteredOptions[focusedIndex]) {
          selectOption(filteredOptions[focusedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };
  const selectedCategoryName = useMemo(() => {
    return options.find((category) => category.value === selectedVal)?.label;
  }, [options, selectedVal]);

  return (
    <div className="relative text-gray-800 font-sans" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query || selectedCategoryName || ""}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 pr-12 text-base bg-white border border-gray-300 rounded-sm cursor-default outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange(null);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
        />
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div
          ref={optionsRef}
          className="absolute top-full left-0 z-[1000] w-full mt-1 max-h-52 overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-sm"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = option[label] === selectedVal;
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={`${id}-${index}`}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => selectOption(option)}
                  className={`px-3 py-2 cursor-pointer transition-colors ${
                    isSelected || isFocused
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option[label]}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-gray-400 italic">No results</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
