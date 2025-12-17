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
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl"
      >
        <h2 className="mb-4 text-lg font-semibold">Add Task</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-2 mb-3 border rounded"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full p-2 mb-3 border rounded"
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
          className="w-full p-2 mb-4 border rounded"
          required
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
