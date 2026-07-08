import { useTheme } from '../../app/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <h2 className="text-base font-medium dark:text-white">Overview</h2>
      <button
        onClick={toggleTheme}
        className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};

export default Header;