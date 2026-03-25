"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allSelected = selected.length === options.length && options.length > 0;

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  return (
    <div className={cn("relative min-w-[200px]", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-left bg-[#1C2333] border border-[#2A3441] hover:border-[#3B4859] rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
      >
        <span>{placeholder}</span>
        <svg
          className={cn(
            "w-4 h-4 ml-2 text-slate-400 transition-transform",
            isOpen && "transform rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full py-2 mt-1 bg-[#1C2333] border border-[#2A3441] rounded-md shadow-lg top-full">
          <label className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2A3441] group transition-colors">
            <div className="relative flex items-center justify-center w-4 h-4 mr-3 border border-slate-500 rounded bg-[#161B28] group-hover:border-slate-400 transition-colors">
              <input
                type="checkbox"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                checked={allSelected}
                onChange={toggleAll}
              />
              {allSelected && (
                <div className="w-2 h-2 bg-slate-400 rounded-sm" />
              )}
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-slate-200">
              Select All
            </span>
          </label>
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <label
                key={option}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#2A3441] group transition-colors"
              >
                <div className="relative flex items-center justify-center w-4 h-4 mr-3 border border-slate-500 rounded bg-[#161B28] group-hover:border-slate-400 transition-colors">
                  <input
                    type="checkbox"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    checked={isSelected}
                    onChange={() => toggleOption(option)}
                  />
                  {isSelected && (
                    <div className="w-2 h-2 bg-slate-400 rounded-sm" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-slate-200">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
