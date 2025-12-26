import { useEffect, useState, useCallback, useRef } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import api from "./services/api";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import FilterDropdown from "./components/FilterDropdown";
import NotificationPanel from "./components/NotificationPanel";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  // Notification permission state removed
  const previousOverdueCountRef = useRef(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sort") || "none";
  const search = searchParams.get("search") || "";

  const setStatusFilter = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }
    setSearchParams(newParams);
  };

  const setSortBy = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "none") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", value);
    }
    setSearchParams(newParams);
  };

  const [searchInput, setSearchInput] = useState(search);

  const updateSearchInURL = useCallback(
    (value) => {
      const newParams = new URLSearchParams(searchParams);
      if (!value.trim()) {
        newParams.delete("search");
      } else {
        newParams.set("search", value);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== search) {
        updateSearchInURL(searchInput);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, search, updateSearchInURL]);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    const res = await api.get("/tasks", { params });
    setTasks(res.data);
    setLoading(false);
  }, []);

  const fetchOverdueTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks/overdue");
      const newOverdueTasks = res.data.tasks || [];
      setOverdueTasks(newOverdueTasks);
      previousOverdueCountRef.current = newOverdueTasks.length;
    } catch (error) {
      console.error("Failed to fetch overdue tasks:", error);
    }
  }, []);

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchOverdueTasks();
    }, 0);

    const interval = setInterval(
      () => {
        fetchOverdueTasks();
      },
      5 * 60 * 1000,
    );

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [fetchOverdueTasks]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchOverdueTasks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [tasks.length, fetchOverdueTasks]);

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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
  );
}

function ProtectedRoute({ children }) {
  const isAuth = Boolean(localStorage.getItem("token"));
  return isAuth ? children : <Navigate to="/login" replace />;
}

import Landing from "./pages/Landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
