import Filter from "./Filter";
import ProductCard from "../../components/productcard/ProductCard";
import { useContext, useLayoutEffect } from "react";
import { ProductContext } from "../../store/ProductContext";
import ProductCardSkeleton from "../../skeletons/ProductCardSkeleton";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";
import { getProducts } from "../../api/products";
import { filterProducts } from "../../utils/helperFunctions";

const Shop = () => {
  const {
    state: { products, productsLoading, productsErr, filters },
    dispatch,
  } = useContext(ProductContext);

  useLayoutEffect(() => {
    if (products) return;
    (async () => await getProducts(dispatch, "?limit=20"))();
  }, [dispatch, products]);

  const filteredProducts = filterProducts(filters, products);

  return (
    <>
      <Filter
        productsLength={filters ? filteredProducts?.length : products?.length}
      />

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

            {!filters &&
              products?.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}

            {filters &&
              filteredProducts?.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>

          {filters && filteredProducts?.length === 0 && (
            <div className="empty-container">
              <h1>No products found with that filter.</h1>
            </div>
          )}

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
