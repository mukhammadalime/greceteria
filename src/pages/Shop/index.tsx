import Filter from "./Filter";
import ProductCard from "../../components/productCard";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Shop = () => {
  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  // useEffect(() => {
  //   for (let i = products.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [products[i], products[j]] = [products[j], products[i]];
  //   }
  // }, [products]);

  return (
    <>
      <Filter />
      {productsLoading && <LoadingSpinner />}

      {!productsLoading && (
        <div className="section-md shop">
          <div className="container">
            <div className="all-products">
              {products.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
