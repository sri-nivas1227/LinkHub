"use client";

import { useState } from "react";

interface ToggleProps {
  /** Initial checked state */
  defaultChecked?: boolean;
  /** Controlled checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Sub-label / description */
  description?: string;
  /** Disable the toggle */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    translate: "translate-x-4",
    label: "text-xs",
    desc: "text-[10px]",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-4 h-4",
    translate: "translate-x-5",
    label: "text-sm",
    desc: "text-xs",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-5 h-5",
    translate: "translate-x-7",
    label: "text-base",
    desc: "text-sm",
  },
};

export function Toggle({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const s = sizeMap[size];

  function handleClick() {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label ?? "toggle"}
      disabled={disabled}
      onClick={handleClick}
      className={[
        "group flex items-center gap-3 rounded-sm text-left",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/60",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      ].join(" ")}
    >
      {/* Track */}
      <span
        className={[
          s.track,
          "relative flex-shrink-0 rounded-full border transition-all duration-200",
          checked
            ? "border-indigo-500 bg-indigo-500/20 "
            : "border-zinc-600 bg-zinc-800",
          !disabled && !checked ? "group-hover:border-zinc-400" : "",
        ].join(" ")}
      >
        {/* Thumb */}
        <span
          className={[
            s.thumb,
            "absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full transition-all duration-200",
            checked
              ? `${s.translate} bg-indigo-500`
              : "translate-x-0 bg-zinc-400",
          ].join(" ")}
        />
      </span>

      {/* Label area */}
      {(label || description) && (
        <span className="flex flex-col leading-tight">
          {label && (
            <span
              className={[
                s.label,
                "font-mono font-medium tracking-tight transition-colors duration-150",
                checked ? "text-indigo-400" : "text-zinc-300",
              ].join(" ")}
            >
              {label}
            </span>
          )}
          {description && (
            <span className={`${s.desc} font-mono text-zinc-500`}>
              {description}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
