import { useContext, useEffect } from "react";
import CompareItem from "../../components/compare/CompareItem";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getCompareOrWishlist } from "../../api/user";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const Compare = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    state: { user, compareWishlistLoading, compare, compareWishlistError },
    dispatch,
  } = useContext(UserContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getCompareOrWishlist(dispatch, axiosPrivate, "compare");
    })();
  }, [auth.accessToken, axiosPrivate, dispatch]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {((compareWishlistLoading && !compare) || !compare) &&
            !compareWishlistError && <LoadingSpinner />}

          {compare?.map((item) => (
            <CompareItem key={item._id} product={item} />
          ))}

          {compareWishlistError && !compareWishlistLoading && (
            <EmptyOrErrorContainer error={compareWishlistError} />
          )}

          {!compareWishlistLoading && compare?.length === 0 && (
            <EmptyOrErrorContainer text="No products found. Add products to your compare list." />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Compare;
