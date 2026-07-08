import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
      <h1 className="text-lg font-semibold mb-6 dark:text-white">Admin</h1>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Dashboard</Link>
        <Link to="/products" className="px-3 py-2 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Products</Link>
        <Link to="/orders" className="px-3 py-2 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Orders</Link>
        <Link to="/customers" className="px-3 py-2 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Customers</Link>
      </nav>
    </div>
  );
};

export default Sidebar;