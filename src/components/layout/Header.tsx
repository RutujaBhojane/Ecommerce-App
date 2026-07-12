import { useLocation } from 'react-router-dom';
import { useTheme } from '../../app/ThemeContext';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
};

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] ?? 'Dashboard';

  return (
    <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <h2 className="text-base font-medium dark:text-white">{pageTitle}</h2>
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