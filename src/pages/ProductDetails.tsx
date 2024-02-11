import ReviewsList from "../components/reviews/ReviewsList";
import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductActionKind, ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();

  const {
    state: { productLoading, product, products },
    dispatch,
  } = useContext(ProductContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch({ type: ProductActionKind.GET_PRODUCT_START });
        const { data } = await axios({
          headers: { "Content-Type": "application/json" },
          method: "GET",
          url: `http://localhost:8000/api/v1/products/${params.productId}`,
        });

        dispatch({
          type: ProductActionKind.GET_PRODUCT_SUCCESS,
          payload: data.data,
        });
      } catch (err: any) {
        dispatch({
          type: ProductActionKind.GET_PRODUCT_FAILURE,
          error: err.response.data.message,
        });
      }
    };

    getProduct();
  }, [dispatch, params.productId]);

  return (
    <>
      {productLoading && <LoadingSpinner />}
      {!productLoading && product && (
        <>
          <ProductInfo product={product!} />
          <ReviewsList reviews={product.reviews} />
          <CustomProductsCarousel text="Related Products" products={products} />
        </>
      )}
    </>
  );
};

export default ProductDetails;
