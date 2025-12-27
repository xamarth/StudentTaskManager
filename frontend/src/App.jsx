import { useState, useEffect } from "react";
import { Dashboard, Landing } from "@/pages";

const App = () => {
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const handleStorage = () => setIsAuth(Boolean(localStorage.getItem("token")));
    const handleAuthChange = () => setIsAuth(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", handleStorage);
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <main>
      {isAuth ? (
        <Dashboard />
      ) : (
        <Landing onAuth={() => setIsAuth(true)} />
      )}
    </main>
  );
};

export default App;
