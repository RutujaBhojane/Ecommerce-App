import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDashboardData } from "./dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 320 },
  { day: "Tue", sales: 480 },
  { day: "Wed", sales: 210 },
  { day: "Thu", sales: 590 },
  { day: "Fri", sales: 430 },
  { day: "Sat", sales: 670 },
  { day: "Sun", sales: 390 },
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const {
    totalRevenue,
    totalOrders,
    totalCustomers,
    lowStockProducts,
    recentOrders,
    loading,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Revenue
          </p>
          <p className="text-2xl font-semibold dark:text-white">
            ₹ {totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>
          <p className="text-2xl font-semibold dark:text-white">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Customers</p>
          <p className="text-2xl font-semibold dark:text-white">
            {totalCustomers}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Low Stock</p>
          <p className="text-2xl font-semibold text-red-500">
            {lowStockProducts}
          </p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Sales This Week
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                color: "#f9fafb",
              }}
            />
            <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Recent Orders
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="pb-2">Order ID</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr
                key={o.id}
                className="border-t dark:border-gray-700 dark:text-gray-300"
              >
                <td className="py-2">#{o.id.slice(0, 8)}</td>
                <td className="py-2">{o.customerName}</td>
                <td className="py-2">₹ {o.amount.toFixed(2)}</td>
                <td className="py-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
