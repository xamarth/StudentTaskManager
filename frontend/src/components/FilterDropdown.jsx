import { useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  status,
  setStatus,
  sortBy,
  setSortBy,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Active badge text */
  const activeBadge =
    status !== "all"
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : sortBy !== "none"
        ? sortBy === "dueDate"
          ? "Due Date"
          : "Priority"
        : null;

  return (
    <div
      ref={dropdownRef}
      className="relative w-full mb-4 sm:w-auto"
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full gap-2 px-4 py-2 text-sm font-medium transition bg-white shadow-sm border/10 sm:w-auto rounded-xl hover:bg-gray-100"
      >
        <span className="flex items-center gap-2">
          Filter
          {activeBadge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {activeBadge}
            </span>
          )}
        </span>
        <span
          className={`text-xs transition-transform ${open ? "rotate-180" : ""
            }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute left-0 sm:right-0 sm:left-auto
          mt-2 w-full sm:w-64
          bg-white rounded-2xl shadow-xl border/10
          p-4 z-30
          transform transition-all duration-200 ease-out
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        {/* Status */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-gray-500 uppercase">
            Status
          </p>

          {[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 text-sm py-1.5 cursor-pointer"
            >
              <input
                type="radio"
                name="status"
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px my-3 bg-gray-100" />

        {/* Sort */}
        <div>
          <p className="mb-2 text-xs font-semibold text-gray-500 uppercase">
            Sort by
          </p>

          {[
            { label: "None", value: "none" },
            { label: "Priority", value: "priority" },
            { label: "Due Date", value: "dueDate" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 text-sm py-1.5 cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                checked={sortBy === opt.value}
                onChange={() => setSortBy(opt.value)}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
