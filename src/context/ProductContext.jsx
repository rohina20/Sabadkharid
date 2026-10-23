import { createContext, useContext, useEffect, useState } from "react";
import api from "../pages/services/config";

const ProductContext = createContext([]);

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Could not load products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

const useProducts = () => useContext(ProductContext);

const useProductDetails = (id) => {
  const products = useContext(ProductContext);
  return products.find((product) => product.id === id);
};

export default ProductsProvider;
export { useProducts, useProductDetails };
