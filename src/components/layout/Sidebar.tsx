import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-white border-r border-gray-200 p-4">
      <h1 className="text-lg font-semibold mb-6">Admin</h1>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
        <Link to="/products" className="px-3 py-2 rounded hover:bg-gray-100">Products</Link>
        <Link to="/orders" className="px-3 py-2 rounded hover:bg-gray-100">Orders</Link>
        <Link to="/customers" className="px-3 py-2 rounded hover:bg-gray-100">Customers</Link>
      </nav>
    </div>
  );
};

export default Sidebar;