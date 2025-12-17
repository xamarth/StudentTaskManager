export default function FilterBar({ onApply, active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {["All", "Pending", "Completed"].map((label) => {
        const isActive = active === label;

        return (
          <button
            key={label}
            onClick={() => {
              setActive(label);
              onApply(
                label === "All"
                  ? {}
                  : { status: label.toLowerCase() }
              );
            }}
            className={`px-4 py-2 text-sm rounded-lg shadow-sm transition
              ${isActive
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
