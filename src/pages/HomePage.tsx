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
import { getCategoriesApi } from "../api/categories";

const HomePage = () => {
  const { state } = useContext(UserContext);

  const {
    state: { topProducts, customProductsLoading, saleProducts },
    dispatch,
  } = useContext(ProductContext);

  const {
    state: { categories, categoriesLoading },
    dispatch: categoryDispatch,
  } = useContext(CategoryContext);

  const {
    state: { news, newsLoading },
  } = useContext(NewsContext);

  useLayoutEffect(() => {
    const topQuery = "?sort=-ratingsAverage&limit=9";
    const saleQuery = "?discountedPrice[gt]=0";

    (async () => {
      await getCategoriesApi(categoryDispatch);
      await getCustomProducts(dispatch, "topProducts", topQuery);
      await getCustomProducts(dispatch, "saleProducts", saleQuery);
    })();
  }, [dispatch, categoryDispatch]);

  return (
    <>
      <Banner />

      <CategoriesCarousel categories={categories} loading={categoriesLoading} />

      <CustomProductsCarousel
        text="Top Rated Products"
        products={topProducts}
        loading={customProductsLoading}
      />

      <CustomProductsCarousel
        text="Sale Products"
        products={saleProducts}
        loading={customProductsLoading}
      />
      {state.user !== null && (
        <NewsCarousel news={news} loading={newsLoading} />
      )}
    </>
  );
};

export default HomePage;
