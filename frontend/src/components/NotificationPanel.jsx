import { useEffect, useRef } from "react";

export default function NotificationPanel({
  isOpen,
  onClose,
  overdueTasks,
  onTaskClick,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const getDaysOverdue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = now - due;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 max-h-96 overflow-hidden flex flex-col"
    >
      <div className="px-4 py-3 border-b border-violet-100 bg-violet-50/60">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-violet-700">Overdue Tasks</h3>
          <span className="text-xs font-bold text-violet-700 bg-violet-100 px-2 py-1 rounded-full">
            {overdueTasks.length}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {overdueTasks.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-slate-500">No overdue tasks! 🎉</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {overdueTasks.map((task) => {
              const daysOverdue = getDaysOverdue(task.dueDate);
              return (
                <div
                  key={task._id}
                  onClick={() => onTaskClick(task)}
                  className="px-4 py-3 hover:bg-violet-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      <span className="inline-block mt-1 text-xs font-bold text-violet-600">
                        {daysOverdue === 0
                          ? "Due today"
                          : `${daysOverdue} day${daysOverdue > 1 ? "s" : ""} overdue`}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full shrink-0 font-bold ${task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {overdueTasks.length > 0 && (
        <div className="px-4 py-2 border-t border-violet-100 bg-violet-50/60">
          <p className="text-xs text-slate-500 text-center">
            Click on a task to view or edit it
          </p>
        </div>
      )}
    </div>
  );
}
