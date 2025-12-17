import TaskCard from "./TaskCard";

export default function TaskList({ tasks, refresh, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-gray-500 mb-2">
          No tasks yet
        </p>
        <p className="text-sm text-gray-400">
          Click “Add Task” to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} refresh={refresh} onEdit={onEdit} />
      ))}
    </div>
  );
}
