import Banner from "../layout/banner";
import Categories from "../components/CategoriesCarousel";
import AllProductCards from "../layout/AllProductCards";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import NewsCarousel from "../components/newsCard/NewsCarousel";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Categories />
      <AllProductCards />
      <CustomProductsCarousel text="Top Rated Products" />
      <NewsCarousel />
    </>
  );
};

export default HomePage;
