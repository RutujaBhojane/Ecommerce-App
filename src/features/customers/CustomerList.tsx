import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCustomers } from './customersSlice';

const CustomerList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;