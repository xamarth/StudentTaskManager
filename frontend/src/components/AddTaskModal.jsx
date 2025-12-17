import { useState } from "react";
import api from "../services/api";

export default function AddTaskModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          required
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
