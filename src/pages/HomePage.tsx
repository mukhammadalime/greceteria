import Banner from "../layout/banner";
import Categories from "../components/CategoriesCarousel";
import AllProductCards from "../layout/AllProductCards";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const HomePage = () => {
  const { state } = useContext(AuthContext);

  return (
    <>
      <Banner />
      <Categories />
      <AllProductCards />
      <CustomProductsCarousel text="Top Rated Products" />
      {state.user !== null && <NewsCarousel />}
    </>
  );
};

export default HomePage;
