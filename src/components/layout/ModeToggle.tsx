import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  // Simple toggle logic: If dark, go light. If light (or system), go dark.
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none active:scale-95"
      title="Toggle Theme"
    >
      {/* Show Moon if Dark, Sun if Light */}
      <div className="relative">
        <Sun 
          className={`h-5 w-5 text-orange-500 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-90 scale-0 absolute' : 'rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`h-5 w-5 text-indigo-400 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0 absolute'
          }`} 
        />
      </div>
    </button>
  )
}