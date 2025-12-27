import { useState } from "react";
import {
  PlanetIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  TrophyIcon,
  PlusIcon,
  ConfettiIcon,
  CheckIcon
} from "@phosphor-icons/react";
import {
  LoginModal,
  SignupModal
} from "@/components";

const initialTasks = [
  {
    text: "Finish Calculus Set 3",
    due: "Today",
    xp: 50,
    color: "red-400",
    completed: false,
  },
  {
    text: "Read Hamlet Act IV",
    due: "Tomorrow",
    xp: 30,
    color: "orange-400",
    completed: false,
  },
];

export default function Landing({ onAuth }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [xp, setXp] = useState(10);
  const [level, setLevel] = useState(1);
  const maxXp = 100;
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleAddTask = () => {
    if (!input.trim()) return;
    const randomXp = Math.floor(Math.random() * 30) + 20;
    setTasks([
      {
        text: input,
        due: "Soon",
        xp: randomXp,
        color: "slate-400",
        completed: false,
      },
      ...tasks,
    ]);
    setInput("");
  };

  const handleToggleTask = (idx) => {
    if (tasks[idx].completed) return;
    const newTasks = [...tasks];
    newTasks[idx].completed = true;
    setTasks(newTasks);
    handleUpdateXp(newTasks[idx].xp);
  };

  const handleUpdateXp = (amount) => {
    let newXp = xp + amount;
    let newLevel = level;
    if (newXp >= maxXp) {
      newXp = 0;
      newLevel++;
      setShowLevelUp(true);
    }
    setXp(newXp);
    setLevel(newLevel);
  };

  const handleCloseLevelUp = () => setShowLevelUp(false);

  const handleAuthSwitch = (modal) => {
    setShowLogin(modal === "login");
    setShowSignup(modal === "signup");
  };

  const handleAuthCallback = (modal) => {
    if (modal === "signup") {
      handleAuthSwitch("signup");
      return;
    }

    if (modal === "login") {
      handleAuthSwitch("login");
      return;
    }
    setShowLogin(false);
    onAuth?.();
  };

  return (
    <div className="bg-slate-50 text-slate-900 overflow-hidden selection:bg-violet-200 selection:text-violet-900 min-h-dvh min-w-dvw">

      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div
                className="rounded-lg"
              >
                <PlanetIcon size={32} weight="fill" className="text-violet-600 drop-shadow-lg" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Orbit</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#features"
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
              >
                Methodology
              </a>
              <a
                href="#reviews"
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
              >
                Stories
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                className="text-slate-600 font-medium hover:text-violet-600"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    // navigate("/dashboard");
                    console.log("Navigate to dashboard");
                  } else {
                    setShowLogin(true);
                  }
                }}
              >
                Log in
              </button>
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-0.5"
                onClick={() => setShowSignup(true)}
              >
                Get Started
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-0.5"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    // navigate("/dashboard");
                    console.log("Navigate to dashboard");
                  } else {
                    setShowLogin(true);
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-22 pb-0 lg:pt-30 lg:pb-16 overflow-hidden bg-grid">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-700 font-medium text-sm mb-6 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                v2.0 is in development! Stay tuned.
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                Master your <br />
                <span className="gradient-text">
                  Academic <br className="sm:hidden" />Orbit
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stop juggling deadlines in your head. <br className="sm:hidden" /> Orbit gamifies your study
                schedule,<br className="sm:hidden" /> turning assignments into quests and<br className="sm:hidden" /> exams into boss
                battles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-violet-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-2xl hover:shadow-violet-300 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  onClick={() => setShowSignup(true)}
                >
                  Start Your Journey <ArrowRightIcon weight="bold" />
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <PlayCircleIcon weight="bold" className="text-violet-600" /> Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=1"
                    alt="User"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=2"
                    alt="User"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=3"
                    alt="User"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">
                    +2k
                  </div>
                </div>
                <p>Trusted by 2,000+ students</p>
              </div>
            </div>
            <div className="hidden md:block relative perspective-1000 group">

              <div className="glass-panel rounded-3xl p-6 shadow-2xl animate-float transform transition-transform duration-500 relative bg-white/80">

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">
                      My Quests
                    </h3>
                    <p className="text-sm text-slate-500">Today's Focus</p>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full">
                    <TrophyIcon weight="fill" className="text-yellow-500 text-lg" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700 leading-none">
                        Lvl <span id="level-display">{level}</span>
                      </span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div
                          id="xp-bar"
                          className="xp-fill h-full bg-yellow-500"
                          style={{ width: `${(xp / maxXp) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    id="new-task-input"
                    placeholder="Add a new assignment..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  />
                  <button
                    onClick={handleAddTask}
                    className="bg-violet-600 text-white rounded-xl w-10 h-10 flex items-center justify-center hover:bg-violet-700 transition-colors"
                  >
                    <PlusIcon weight="bold" />
                  </button>
                </div>

                <div id="task-list" className="space-y-3">
                  {tasks.length === 0 && (
                    <div id="empty-state" className="text-center py-8">
                      <ConfettiIcon weight="duotone" className="text-4xl text-violet-300 mb-2" />
                      <p className="text-slate-500 text-sm">
                        All clear! Enjoy your free time.
                      </p>
                    </div>
                  )}
                  {tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className={`task-item flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-violet-100 hover:shadow-sm transition-all cursor-pointer group ${task.completed ? "completed" : ""}`}
                      onClick={() => handleToggleTask(idx)}
                    >
                      <div
                        className={`check-circle w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center group-hover:border-violet-400 ${task.completed ? "bg-emerald-500 border-emerald-500 scale-110" : ""}`}
                      >
                        <CheckIcon weight="bold" className={`text-white text-xs ${task.completed ? "" : "opacity-0"}`} />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`font-medium text-slate-700 text-sm block transition-all ${task.completed ? "line-through text-slate-400" : ""}`}
                        >
                          {task.text}
                        </span>
                        <span
                          className={`text-xs text-${task.color} font-medium`}
                        >
                          Due {task.due}
                        </span>
                      </div>
                      <div className="bg-violet-50 text-violet-600 px-2 py-1 rounded text-xs font-bold">
                        +{task.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
                {showLevelUp && (
                  <div
                    id="level-up-modal"
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl text-center p-6 level-up-badge"
                  >
                    <PlanetIcon size={40} weight="fill" className="text-yellow-400 mb-3 drop-shadow-lg" />
                    <h4 className="text-2xl font-bold text-slate-800 mb-1">
                      Level Up!
                    </h4>
                    <p className="text-slate-500 text-sm mb-4">
                      You are now a Productivity Apprentice.
                    </p>
                    <button
                      onClick={handleCloseLevelUp}
                      className="bg-violet-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-violet-700 transition-colors"
                    >
                      Keep Grinding
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleAuthCallback}
      />
      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        onSignup={(modal) => {
          // if signup requests login view, open it; otherwise close
          if (modal === "login") {
            setShowSignup(false);
            setShowLogin(true);
            return;
          }
          setShowSignup(false);
        }}
      />
    </div>
  );
}
