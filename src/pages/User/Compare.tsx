import { useContext, useEffect, useLayoutEffect } from "react";
import CompareItem from "../../components/compare/CompareItem";
import LoginFirst from "../../components/LoginFirst";
import { UserActionKind, UserContext } from "../../store/UserContext";
import { getCompareOrWishlist } from "../../api/user";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";

const Compare = () => {
  const {
    state: { user, compareWishlistLoading, compare, compareWishlistError },
    dispatch,
  } = useContext(UserContext);

  useLayoutEffect(() => {
    if (user) dispatch({ type: UserActionKind.GET_COMPARE_OR_WISHLIST_START });
  }, [dispatch, user]);

  useEffect(() => {
    if (user) (async () => await getCompareOrWishlist(dispatch, "compare"))();
  }, [dispatch, user]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {compareWishlistLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {compare?.map((item) => (
                <CompareItem key={item._id} product={item} />
              ))}
            </>
          )}

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
