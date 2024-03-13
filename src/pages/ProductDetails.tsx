import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getCustomProducts, getProduct } from "../api/products";
import ProductReviewsAndShipping from "../components/product-details/ProductReviewsAndShipping";
import EmptyOrErrorContainer from "../components/EmptyOrErrorContainer";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const {
    state: {
      productLoading,
      product,
      customProducts,
      customProductsLoading,
      productErr,
    },
    dispatch,
  } = useContext(ProductContext);

  useLayoutEffect(() => {
    const categoryId = localStorage.getItem("categoryId")!;
    (async () => {
      await getProduct(dispatch, productId!, navigate);
    })();
    if (categoryId) {
      (async () => {
        await getCustomProducts(dispatch, `?category=${categoryId}`);
      })();
    }
  }, [dispatch, productId, navigate]);

  return (
    <>
      {productLoading && <LoadingSpinner />}
      {!productLoading && product && (
        <>
          <ProductInfo product={product!} />
          <ProductReviewsAndShipping />
          <CustomProductsCarousel
            text="Related Products"
            products={customProducts?.filter((i) => i._id !== productId) || []}
            loading={customProductsLoading}
          />
        </>
      )}

      {productErr && <EmptyOrErrorContainer error={productErr} />}
    </>
  );
};

export default ProductDetails;
