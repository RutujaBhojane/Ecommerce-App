import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOrders, updateOrderStatus } from './ordersSlice';
import type { Order } from '../../types';

const statusStyles: Record<Order['status'], string> = {
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-green-100 text-green-700',
};

const OrderList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">#{o.id}</td>
              <td className="p-2">{o.customerName}</td>
              <td className="p-2">{o.date}</td>
              <td className="p-2">₹{o.amount.toFixed(2)}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[o.status]}`}>
                  {o.status}
                </span>
              </td>
              <td className="p-2">
                <select
                  value={o.status}
                  onChange={(e) =>
                    dispatch(updateOrderStatus({
                      id: o.id,
                      status: e.target.value as Order['status'],
                    }))
                  }
                  className="border rounded px-1 py-0.5 text-sm"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;