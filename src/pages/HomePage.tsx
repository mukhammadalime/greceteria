import Banner from "../layout/banner";
import Categories from "../components/CategoriesCarousel";
import AllProductCards from "../layout/AllProductCards";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { CategoryContext } from "../store/CategoryContext";

const HomePage = () => {
  const { state } = useContext(AuthContext);

  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  const {
    state: { categories, categoriesLoading },
  } = useContext(CategoryContext);

  return (
    <>
      <Banner />
      {categoriesLoading && <LoadingSpinner />}
      {!categoriesLoading && <Categories categories={categories} />}

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
