import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts, deleteProduct, setSearchQuery, setSelectedCategory, setSelectedProduct } from './productsSlice';
import ProductForm from './ProductForm';
import EditProductModal from './EditProductModal';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [...new Set(items.map((p) => p.category))];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <ProductForm />

      <h2 className="text-xl font-semibold mb-4">
        Products{' '}
        {filteredItems.length !== items.length && (
          <span className="text-sm font-normal text-gray-400">
            ({filteredItems.length} of {items.length})
          </span>
        )}
      </h2>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="border border-t rounded px-3 py-2 text-sm w-64"
        />
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          className="border border-t rounded px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-sm border border-t">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">₹ {p.price.toFixed(2)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <button
                  onClick={() => dispatch(setSelectedProduct(p))}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProduct(p.id))}
                  className="text-red-500 text-sm hover:underline ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-400">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <EditProductModal />
    </div>
  );
};

export default ProductList;