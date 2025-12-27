import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginModal({ open, onClose, onLogin }) {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalClass = `fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setError("");
      onLogin?.();
      onClose();
      // navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password");
    }
  };
  return (
    <div className={modalClass}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 glass-panel shadow-2xl rounded-2xl border border-slate-100 bg-white/90"
      >
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Login</h2>
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex gap-2 justify-end mb-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="py-3 px-6 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 shadow transition">
            Login
          </button>
        </div>
        <p className="mt-2 text-sm text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-violet-600 hover:underline font-bold"
            onClick={() => {
              onClose();
              onLogin("signup");
            }}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
