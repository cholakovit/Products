"use client";
import {
  useGetProductFiltersFromURL,
  useGetProducts,
} from "@/app/helper/hooks";
import Product from "@/app/components/Product";

const Products = () => {
  const filters = useGetProductFiltersFromURL();

  const { data, error, isLoading } = useGetProducts(filters);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.products &&
        data.products.map((product: Product, pIndex: number) => (
          <Product key={pIndex} product={product} />
        ))}
    </div>
  );
};

export default Products;
