"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Option = {
  label: string;
  value: string;
};

interface SearchableDropdownProps<T>  {
  options: T[];
  selectedValue?: string ;
  handleChange: (item: T | null) => void;
  placeholder?: string;
};

const SearchableDropdown = <T extends Record<string, any>>({
  options,
  selectedValue,
  handleChange,
  placeholder = "Select an option...",
}: SearchableDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  const hasExactMatch = options.some(
    (o) => o.label.toLowerCase() === search.toLowerCase(),
  );

  const showAddNew =
    search.trim().length > 0 && !hasExactMatch && filtered.length === 0;
  const showAddNewAtBottom =
    search.trim().length > 0 && !hasExactMatch && filtered.length > 0;

  const open = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
  }, []);

  const select = (value: string, label: string) => {
    const item = { value } as unknown as T;
    handleChange(item);
    close();
  };

  const handleAddNew = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    const item = { new_category: trimmed } as unknown as T;
    handleChange(item);
    close();
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  return (
    <div
      ref={containerRef}
      className="relative w-full text-gray-800 font-semibold"
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => (isOpen ? close() : open())}
        className={`
          w-full flex items-center justify-between gap-2
          px-3.5 py-2.5 rounded-2xl border border-zinc-800 bg-zinc-950/70 text-sm
          transition-all duration-150 outline-none
          ${
            isOpen
              ? "border-indigo-500 ring-2 ring-indigo-100 shadow-sm"
              : "border-gray-300 hover:border-gray-400 shadow-sm"
          }
        `}
      >
        <span
          className={
            selectedOption
              ? "text-gray-200 font-normal"
              : "text-gray-400 font-normal"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-500">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl border border-zinc-800 bg-zinc-950/70 focus-within:border-indigo-400 focus-within:bg-zinc-900/70 transition-all">
              <svg
                className="w-3.5 h-3.5 text-gray-300 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or add new..."
                className="w-full text-sm outline-none text-gray-300 placeholder-gray-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Options list */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => select(option.value, option.label)}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2 text-sm text-left
                      transition-colors duration-100
                      ${
                        isSelected
                          ? "bg-gray-400 text-indigo-700 font-medium"
                          : "text-gray-300 hover:bg-gray-400/70 hover:text-gray-900"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-indigo-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}

            {/* "Add New" at bottom when there are partial matches */}
            {showAddNewAtBottom && (
              <li>
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-left text-gray-100 hover:text-gray-900 hover:bg-gray-400/70 border-t border-gray-400 transition-colors duration-100"
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>
                    Add New:{" "}
                    <span className="">&ldquo;{search.trim()}&rdquo;</span>
                  </span>
                </button>
              </li>
            )}

            {/* "Add New" as the only option when no results */}
            {showAddNew && (
              <li>
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-left text-gray-100 hover:text-gray-900 hover:bg-gray-400/70 transition-colors duration-100"
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>
                    Add New:{" "}
                    <span className="font-medium">
                      &ldquo;{search.trim()}&rdquo;
                    </span>
                  </span>
                </button>
              </li>
            )}

            {/* No search input, no options at all */}
            {!search && options.length === 0 && (
              <li className="px-3.5 py-3 text-sm text-gray-400 text-center">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
