import api from "../services/api";

export default function TaskCard({ task, refresh, onEdit, dragHandleProps }) {
  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const toggleComplete = async () => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    refresh();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    refresh();
  };

  const isOverdue =
    !task.completed &&
    new Date(task.dueDate) < new Date();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col justify-between relative group">
      <div
        {...dragHandleProps}
        className="absolute top-1/2 -translate-y-1/2 right-3 md:opacity-0 group-hover:opacity-100 transition text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing select-none touch-none"
        title="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
      >
        ☰
      </div>
      <div>
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {task.title}
          </h2>

          <span
            className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          {task.description || "No description"}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span
          className={`text-sm ${isOverdue ? "text-red-600 font-medium" : "text-gray-500"
            }`}
        >
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleComplete}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${task.completed
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </button>

          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              Edit
            </button>
          )}

          <button
            onClick={deleteTask}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
