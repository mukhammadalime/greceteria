import { ReactNode, useContext, useEffect, useState } from "react";
import CompareItem from "../../components/compare/CompareItem";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getCompareWishlistProducts } from "../../api/user";
import { ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Compare = () => {
  const [loading, setLoading] = useState(true);
  const [compare, setCompare] = useState<ProductItemTypes[] | []>([]);
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { products },
  } = useContext(ProductContext);

  useEffect(() => {
    user && getCompareWishlistProducts(products, user.compare, setCompare);
    setTimeout(() => setLoading(false), 200);
  }, [products, user]);

  if (user === null) return <LoginFirst />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {compare.length > 0 &&
            compare.map(
              (item): ReactNode => <CompareItem key={item.id} product={item} />
            )}

          {/* TODO: */}
          {compare.length === 0 && (
            <h1>Add products to compare to be visible here.</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Compare;
