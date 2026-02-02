import { useTheme } from '../context/ThemeContext.jsx'
import { FiSun, FiMoon } from 'react-icons/fi'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}
