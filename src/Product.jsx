import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${productId}`,
        newProduct
      );
    },
  });

  const fetchProductById = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProductById,
    // staleTime: 10000, WE HAVE SET STALETIME AS DEFAULT IN MAIN.JSX
  });

  if (isLoading) return <h3 className="p-10 text-7xl">Loading...</h3>;
  if (error) return <h3 className="p-10 text-7xl">{error.message}</h3>;

  if (mutation.isPending) return <h3 className="p-10 text-7xl">updating...</h3>;
  if (mutation.isError) return <h3 className="p-10 text-7xl">{mutation.error.message}</h3>;

  return (
    <>
      Product: {product.title}
      {mutation.isSuccess ? <div>Todo added!</div> : null}
      <button
        onClick={() => {
          mutation.mutate({ title: "Updated Product" });
        }}
      >
        Create Product
      </button>
    </>
  );
};

export default Product;
