import Banner from "../layout/banner/Banner";
import CategoriesCarousel from "../components/category/CategoriesCarousel";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext } from "react";
import { ProductContext } from "../store/ProductContext";
import { CategoryContext } from "../store/CategoryContext";
import { NewsContext } from "../store/NewsContext";
import { UserContext } from "../store/UserContext";

const HomePage = () => {
  const { state } = useContext(UserContext);
  console.log("state:", state);

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

      {categories && (
        <CategoriesCarousel
          categories={categories}
          loading={categoriesLoading}
        />
      )}

      <CustomProductsCarousel
        text="Top Rated Products"
        products={products}
        loading={productsLoading}
      />
      {state.user !== null && (
        <NewsCarousel news={news} loading={newsLoading} />
      )}
    </>
  );
};

export default HomePage;
