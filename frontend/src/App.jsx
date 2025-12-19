import { useEffect, useState, useCallback } from "react";
import api from "./services/api";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
// import FilterBar from "./components/FilterBar";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import FilterDropdown from "./components/FilterDropdown";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  // const [activeFilter, setActiveFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    const res = await api.get("/tasks", { params });
    setTasks(res.data);
    setLoading(false);
  }, []);

  const visibleTasks = tasks
    .filter((task) => {
      if (statusFilter === "pending") return !task.completed;
      if (statusFilter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      }

      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      return 0;
    });

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      const res = await api.get("/tasks");
      if (!ignore) {
        setTasks(res.data);
        setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    // <div className="min-h-screen bg-gray-100">
    <div className="bg-gray-100 max-h-dvh">
      <Header onAdd={() => setShowAddModal(true)} />

      {/* <main className="max-w-5xl px-4 py-6 mx-auto"> */}
      <main className="max-w-6xl px-4 py-6 mx-auto sm:px-6 sm:py-10">

        {/* <FilterBar onApply={fetchTasks} active={activeFilter} setActive={setActiveFilter} /> */}

        <div className="flex justify-end">
          <FilterDropdown
            status={statusFilter}
            setStatus={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {loading ? (
          <p className="mt-6 text-center text-gray-500">Loading tasks...</p>
        ) : (
          <TaskList
            // tasks={tasks}
            tasks={visibleTasks}
            refresh={fetchTasks}
            onEdit={setEditingTask}
          />
        )}
      </main>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdded={fetchTasks}
        />
      )}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={fetchTasks}
        />
      )}
    </div>
  );
}
