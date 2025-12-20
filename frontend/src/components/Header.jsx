export default function Header({ onAdd }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-5xl px-4 py-4 mx-auto">
        <h1 className="text-xl font-semibold text-gray-800">
          Student Task Manager
        </h1>

        <button
          onClick={onAdd}
          className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
