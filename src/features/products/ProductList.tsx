import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts, deleteProduct, setSearchQuery, setSelectedCategory } from './productsSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // get unique categories from items
  const categories = useMemo(() => {
    return ['', ...new Set(items.map((p) => p.category))];
  }, [items]);

  // filter items based on search and category
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

      {/* Search and Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="border rounded px-3 py-2 text-sm w-64 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">All Categories</option>
          {categories.filter(Boolean).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Products {filteredItems.length !== items.length && `(${filteredItems.length} of ${items.length})`}
      </h2>
      <table className="w-full text-sm border dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            <th className="p-2 dark:text-gray-300">Name</th>
            <th className="p-2 dark:text-gray-300">Category</th>
            <th className="p-2 dark:text-gray-300">Price</th>
            <th className="p-2 dark:text-gray-300">Stock</th>
            <th className="p-2 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((p) => (
            <tr key={p.id} className="border-t dark:border-gray-700 dark:text-gray-300">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">${p.price.toFixed(2)}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">
                <button
                  onClick={() => dispatch(deleteProduct(p.id))}
                  className="text-red-500 text-sm hover:underline"
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
    </div>
  );
};

export default ProductList;