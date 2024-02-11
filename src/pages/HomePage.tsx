import Banner from "../layout/banner";
import Categories from "../components/CategoriesCarousel";
import AllProductCards from "../layout/AllProductCards";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const HomePage = () => {
  const { state } = useContext(AuthContext);

  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  return (
    <>
      <Banner />
      <Categories />
      {productsLoading && <LoadingSpinner />}

      {!productsLoading && (
        <>
          <AllProductCards products={products} />
          <CustomProductsCarousel
            text="Top Rated Products"
            products={products}
          />
        </>
      )}
      {state.user !== null && <NewsCarousel />}
    </>
  );
};

export default HomePage;
