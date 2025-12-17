import { useState } from "react";
import api from "../services/api";

export default function EditTaskModal({ task, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.slice(0, 10),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${task._id}`, form);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={form.dueDate}
          onChange={
            (e) => setForm(
              { ...form, dueDate: e.target.value }
            )
          }
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
