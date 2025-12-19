import { useState } from "react";

export default function FilterDropdown({
  status,
  setStatus,
  sortBy,
  setSortBy,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mb-4 sm:w-auto">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full gap-2 px-4 py-2 text-sm font-medium transition bg-white shadow-sm border/10 sm:w-auto rounded-xl hover:bg-gray-100 sm:justify-center"
      >
        <span>Filter</span>
        <span className="text-xs">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 z-30 w-full p-4 mt-2 bg-white shadow-xl border/10 sm:right-0 sm:left-auto sm:w-64 rounded-2xl"
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
      )}
    </div>
  );
}
