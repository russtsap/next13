"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="text-center">
      <p className="text-slate-700 dark:text-slate-100 mb-4">
        The current theme is: {theme === "dark" ? "Dark" : "Light"} Mode
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => setTheme("light")}
          className={`px-4 py-2 rounded-md ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 hover:text-white"
              : "bg-gray-200 border border-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white"
          } focus:outline-none transition-colors duration-300 ml-2`}
        >
          Light Mode
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`px-4 py-2 rounded-md ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-100 hover:text-white"
              : "bg-gray-200 border border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-white"
          } focus:outline-none transition-colors duration-300 ml-2`}
        >
          Dark Mode
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
