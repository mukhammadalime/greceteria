import Filter from "./Filter";
import products from "../../data/products.json";
import usePaginate from "../../hooks/usePaginate";
import PaginationButtons from "../../components/UI/PaginationButtons";
import ProductCard from "../../components/productCard";

const Shop = () => {
  const { handlePageClick, pageCount, currentItems } = usePaginate(products);

  return (
    <>
      <Filter />
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
                key={item.name}
                images={item.images}
                name={item.name}
                discountPercent={item.discountPrice}
                price={item.price}
                inStock={true}
                id=""
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
