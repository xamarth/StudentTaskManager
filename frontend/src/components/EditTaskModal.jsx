import { useState } from "react";
import { api } from "@/services";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100"
      >
        <h2 className="text-xl font-bold mb-4 text-slate-800">Edit Task</h2>
        <input
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          className="w-full p-3 mb-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-violet-700 shadow">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
