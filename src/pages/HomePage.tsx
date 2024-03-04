import Banner from "../layout/banner";
import Categories from "../components/category/CategoriesCarousel";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext,  } from "react";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { CategoryContext } from "../store/CategoryContext";
import { NewsContext } from "../store/NewsContext";
import { UserContext } from "../store/UserContext";

const HomePage = () => {
  const { state } = useContext(UserContext);

  const {
    state: { products, productsLoading },
  } = useContext(ProductContext);

  const {
    state: { categories, categoriesLoading },
  } = useContext(CategoryContext);

  const {
    state: { news, newsLoading },
  } = useContext(NewsContext);

  return (
    <>
      <Banner />
      {categoriesLoading && <LoadingSpinner />}
      {!categoriesLoading && <Categories categories={categories} />}

      {productsLoading && <LoadingSpinner />}

      {!productsLoading && (
          <CustomProductsCarousel
            text="Top Rated Products"
            products={products}
          />
      )}
      {newsLoading && <LoadingSpinner />}
      {state.user !== null && news.length > 0 && <NewsCarousel news={news} />}
    </>
  );
};

export default HomePage;
