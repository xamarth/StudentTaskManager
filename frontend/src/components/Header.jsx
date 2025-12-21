export default function Header({ onAdd, onNotificationClick, overdueCount = 0 }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-5xl px-4 py-4 mx-auto">
        <h1 className="text-xl font-semibold text-gray-800">
          Student Task Manager
        </h1>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 transition hover:text-gray-900 hover:bg-gray-100 rounded-full"
            title="View overdue tasks"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {overdueCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {overdueCount > 99 ? "99+" : overdueCount}
              </span>
            )}
          </button>

          <button
            onClick={onAdd}
            className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add
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
      </div>
    </header>
  );
}
