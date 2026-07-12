import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editProduct, setSelectedProduct } from './productsSlice';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
  category: z.string().min(2, 'Category is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const EditProductModal = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
  });

  // pre-fill form when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      reset({
        name: selectedProduct.name,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        category: selectedProduct.category,
      });
    }
  }, [selectedProduct, reset]);

  if (!selectedProduct) return null;

  const onSubmit = (data: ProductFormData) => {
    dispatch(editProduct({ ...data, id: selectedProduct.id }));
    dispatch(setSelectedProduct(null));
  };

  return (
    // backdrop
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {/* modal box */}
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              {...register('name')}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <input
              {...register('price')}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="mb-3">
            <input
              {...register('stock')}
              placeholder="Stock"
              className="w-full border p-2 rounded"
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <div className="mb-4">
            <input
              {...register('category')}
              placeholder="Category"
              className="w-full border p-2 rounded"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => dispatch(setSelectedProduct(null))}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;