import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../store/CategoryContext";
import { getCategory } from "../../api/categories";
import ProductCard from "../../components/productCard";
import { ProductItemTypes } from "../../utils/user-types";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const {
    state: { category, categoryLoading },
    dispatch,
  } = useContext(CategoryContext);

  useEffect(() => {
    const getProductsByCategory = async () => {
      await getCategory(dispatch, categoryId);
    };
    getProductsByCategory();
  }, [dispatch, categoryId]);

  if (categoryLoading) return <LoadingSpinner />;

  return (
    <div className="section-sm products-by-category">
      <div className="section__head">
        <h2>{category?.name}</h2>
      </div>
      <div className="container">
        {category?.products?.length! > 0 ? (
          <div className="all-products">
            {category?.products?.map((item: ProductItemTypes) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <h2>Sorry, we couldn't find any products.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
