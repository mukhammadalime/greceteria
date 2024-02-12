import ReviewsList from "../components/reviews/ReviewsList";
import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getProductApi } from "../api/products";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    state: { productLoading, product, products },
    dispatch,
  } = useContext(ProductContext);

  useEffect(() => {
    const getProduct = async () =>
      await getProductApi(dispatch, params.productId, navigate);

    getProduct();
  }, [dispatch, params.productId, navigate]);

  return (
    <>
      {productLoading && <LoadingSpinner />}
      {!productLoading && product && (
        <>
          <ProductInfo product={product!} />
          <ReviewsList reviews={product?.reviews} />
          <CustomProductsCarousel text="Related Products" products={products} />
        </>
      )}
    </>
  );
};

export default ProductDetails;
