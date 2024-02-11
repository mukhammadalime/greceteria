import Filter from "./Filter";
import usePaginate from "../../hooks/usePaginate";
import PaginationButtons from "../../components/UI/PaginationButtons";
import ProductCard from "../../components/productCard";
import { useContext } from "react";
import { ProductContext } from "../../store/ProductContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Shop = () => {
  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  const { handlePageClick, pageCount, currentItems } = usePaginate(products);

  return (
    <>
      <Filter />
      {productsLoading && <LoadingSpinner />}

      {!productsLoading && (
        <div className="section-md shop">
          <div className="container">
            <div className="shop__head">
              <PaginationButtons
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            </div>
            <div className="all-products">
              {currentItems.map((item: any) => (
                <ProductCard
                  key={item._id}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
