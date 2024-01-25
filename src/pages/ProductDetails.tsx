import ReviewsList from "../components/reviews/ReviewsList";
import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";

const ProductDetails = () => {
  return (
    <>
      <ProductInfo />
      <ReviewsList />
      <CustomProductsCarousel text="Related Products" />
    </>
  );
};

export default ProductDetails;
