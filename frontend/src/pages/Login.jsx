import { useState } from "react";
import api from "../services/api";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white shadow-md rounded-xl"
      >
        <h2 className="mb-4 text-xl font-semibold">Login</h2>

        {error && (
          <p className="mb-3 text-sm text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
