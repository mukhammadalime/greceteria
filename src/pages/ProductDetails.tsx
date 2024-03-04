import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getProductApi } from "../api/products";
import ProductReviewsAndShipping from "../components/product-details/ProductReviewsAndShipping";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    state: { productLoading, product, products },
    dispatch,
  } = useContext(ProductContext);

  useEffect(() => {
    (async () => {
      await getProductApi(dispatch, params.productId);
    })();
  }, [dispatch, params.productId, navigate]);

  return (
    <>
      {productLoading && <LoadingSpinner />}
      {!productLoading && product && (
        <>
          <ProductInfo product={product!} />
          <ProductReviewsAndShipping />
          <CustomProductsCarousel text="Related Products" products={products} />
        </>
      )}
    </>
  );
};

export default ProductDetails;
