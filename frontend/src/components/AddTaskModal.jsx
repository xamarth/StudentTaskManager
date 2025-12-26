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
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-black/50 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl border border-slate-100"
      >
        <h2 className="mb-4 text-xl font-bold text-slate-800">Add Task</h2>
        <input
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Description"
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
          required
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
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-violet-600 text-white font-bold hover:bg-violet-700 shadow"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
