"use client";
import { useState } from "react";

export default function CategoryDropdown() {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [selected, setSelected] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "__add_new__") {
      setIsAdding(true);
    } else {
      setSelected(e.target.value);
    }
  };

  const handleAdd = () => {
    if (!newOption.trim()) return;
    const updatedOptions = [...options, newOption.trim()];
    setOptions(updatedOptions);
    setSelected(newOption.trim());
    setNewOption("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewOption("");
  };

  return (
    <div className="flex flex-col bg-transparent gap-2 w-64">
      {!isAdding ? (
        <select
          value={selected}
          onChange={handleSelect}
          className="w-full p-2 border border-gray-300 rounded-3xl outline-none bg-transparent text-black"
        >
          <option value="" className="" disabled>
            -- Select an option --
          </option>
          {options.map((opt, idx) => (
            <option className="bg-black/20" key={idx} value={opt}>
              {opt}
            </option>
          ))}
          <option value="__add_new__">➕ Add New</option>
        </select>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Enter new option"
            className="flex-1 p-2 border rounded"
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleAdd}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-red-600/80 text-white rounded"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        {selected && (
          <p className="px-2 text-sm text-gray-800 font-semibold rounded-3xl bg-yellow-300/70">
            Selected: {selected}
          </p>
        )}
      </div>
    </div>
  );
}
