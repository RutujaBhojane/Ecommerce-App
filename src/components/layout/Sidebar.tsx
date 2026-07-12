import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
      <h1 className="text-lg font-semibold mb-6 dark:text-white">Admin</h1>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          Customers
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;