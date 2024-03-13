import Banner from "../layout/banner/Banner";
import CategoriesCarousel from "../components/category/CategoriesCarousel";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext, useLayoutEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import { CategoryContext } from "../store/CategoryContext";
import { NewsContext } from "../store/NewsContext";
import { UserContext } from "../store/UserContext";
import { getCustomProducts } from "../api/products";

const HomePage = () => {
  const { state } = useContext(UserContext);

  const {
    state: { customProducts, customProductsLoading },
    dispatch,
  } = useContext(ProductContext);

  const {
    state: { categories, categoriesLoading },
  } = useContext(CategoryContext);

  const {
    state: { news, newsLoading },
  } = useContext(NewsContext);

  useLayoutEffect(() => {
    (async () => {
      await getCustomProducts(dispatch, "?sort=-ratingsAverage&limit=9");
    })();
  }, [dispatch]);

  return (
    <>
      <Banner />

      <CategoriesCarousel categories={categories} loading={categoriesLoading} />

      <CustomProductsCarousel
        text="Top Rated Products"
        products={customProducts}
        loading={customProductsLoading}
        // error={customProductsErr}
      />
      {state.user !== null && (
        <NewsCarousel news={news} loading={newsLoading} />
      )}
    </>
  );
};

export default HomePage;
