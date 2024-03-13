import Filter from "./Filter";
import ProductCard from "../../components/productcard/ProductCard";
import { useContext, useLayoutEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import ProductCardSkeleton from "../../skeletons/ProductCardSkeleton";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";
import { getProducts } from "../../api/products";

const Shop = () => {
  const {
    state: { products, productsLoading, productsErr },
    dispatch,
  } = useContext(ProductContext);

  useLayoutEffect(() => {
    if (!products) {
      (async () => {
        await getProducts(dispatch, "?limit=20");
      })();
    }
  }, [dispatch, products]);

  return (
    <>
      <Filter />

      <div className="section-md shop">
        <div className="container">
          <div className="all-products">
            {productsLoading && !products && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </>
            )}

            {products?.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>

          {productsErr && <EmptyOrErrorContainer error={productsErr} />}
          {products?.length === 0 && (
            <EmptyOrErrorContainer text="Sorry, there are no products yet." />
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
