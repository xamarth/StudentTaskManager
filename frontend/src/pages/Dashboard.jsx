import { AddTaskModal, EditTaskModal, FilterDropdown, Header, NotificationPanel, TaskList } from "@/components";
import api from "@/services/api";
import { useCallback, useEffect, useRef, useState } from "react";

const Dashboard = () => {

  const [isAuth] = useState(Boolean(localStorage.getItem("token")));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [search, setSearch] = useState("");
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const previousOverdueCountRef = useRef(0);

  const fetchTasks = useCallback(async (params = {}) => {
    if (!isAuth) return;
    setLoading(true);
    const res = await api.get("/tasks", { params });
    setTasks(res.data);
    setLoading(false);
  }, [isAuth]);

  const fetchOverdueTasks = useCallback(async () => {
    if (!isAuth) return;
    try {
      const res = await api.get("/tasks/overdue");
      const newOverdueTasks = res.data.tasks || [];
      setOverdueTasks(newOverdueTasks);

      if (newOverdueTasks.length > previousOverdueCountRef.current) {
        const newCount = newOverdueTasks.length - previousOverdueCountRef.current;
        new Notification(`You have ${newCount} new overdue task${newCount > 1 ? "s" : ""}`, {
          body: newOverdueTasks
            .slice(0, 3)
            .map((t) => t.title)
            .join(", "),
          icon: "/favicon.svg",
          badge: "/favicon.svg",
          tag: "overdue-tasks",
        });
      }

      previousOverdueCountRef.current = newOverdueTasks.length;
    } catch (error) {
      console.error("Failed to fetch overdue tasks:", error);
    }
  }, [isAuth]);

  const visibleTasks = tasks
    .filter((task) => {
      if (statusFilter === "pending") return !task.completed;
      if (statusFilter === "completed") return task.completed;
      return true;
    })
    .filter((task) => {
      if (!search.trim()) return true;

      const query = search.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
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
    if (!isAuth) return;

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
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) return;

    const timeoutId = setTimeout(() => {
      fetchOverdueTasks();
    }, 0);

    const interval = setInterval(() => {
      fetchOverdueTasks();
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [isAuth, fetchOverdueTasks]);

  useEffect(() => {
    if (!isAuth) return;

    const timeoutId = setTimeout(() => {
      fetchOverdueTasks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [tasks.length, isAuth, fetchOverdueTasks]);

  const handleNotificationClick = () => {
    setShowNotificationPanel(!showNotificationPanel);
  };

  const handleOverdueTaskClick = (task) => {
    setEditingTask(task);
    setShowNotificationPanel(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-violet-200 selection:text-violet-900">
      <div className="relative">
        <Header
          onAdd={() => setShowAddModal(true)}
          onNotificationClick={handleNotificationClick}
          overdueCount={overdueTasks.length}
        />
        {showNotificationPanel && (
          <div className="absolute right-4 top-full z-50 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-5xl sm:w-full sm:px-4">
            <div className="sm:flex sm:justify-end">
              <NotificationPanel
                isOpen={showNotificationPanel}
                onClose={() => setShowNotificationPanel(false)}
                overdueTasks={overdueTasks}
                onTaskClick={handleOverdueTaskClick}
              />
            </div>
          </div>
        )}
      </div>

      <main className="max-w-6xl px-4 py-6 mx-auto sm:px-6 sm:py-10">
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg sm:max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            tasks={visibleTasks}
            setTasks={setTasks}
            refresh={fetchTasks}
            onEdit={setEditingTask}
          />
        )}
      </main>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            fetchTasks();
            fetchOverdueTasks();
          }}
        />
      )}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => {
            fetchTasks();
            fetchOverdueTasks();
          }}
        />
      )}
    </div>
  )
}

export default Dashboard