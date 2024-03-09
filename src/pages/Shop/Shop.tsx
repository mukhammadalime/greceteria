import Filter from "./Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import ProductCardSkeleton from "../../skeletons/ProductCardSkeleton";

const Shop = () => {
  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  useEffect(() => {
    if (products) {
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }
    }
  }, [products]);

  return (
    <>
      <Filter />

      <div className="section-md shop">
        <div className="container">
          <div>
            <div>
              <div className="all-products">
                {productsLoading ? (
                  <>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </>
                ) : (
                  <>
                    {products?.map((item) => (
                      <ProductCard key={item._id} item={item} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
