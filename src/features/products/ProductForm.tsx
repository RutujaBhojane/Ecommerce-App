import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "../../app/hooks";
import { addProduct } from "./productsSlice";

// Define validation rules — this also generates a TS type for us
const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  category: z.string().min(2, "Category is required"),
});

// Infer the TypeScript type directly from the schema — no need to write it twice
type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
  });

  const onSubmit = (data: ProductFormData) => {
    dispatch(addProduct(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded mb-6 max-w-md"
    >
      <h3 className="font-semibold mb-3">Add Product</h3>

      <div className="mb-3">
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("price")}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("stock")}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
