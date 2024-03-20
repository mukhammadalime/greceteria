import WishlistedItem from "../../components/WishlistedItem";
// import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext, useEffect, useLayoutEffect } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserActionKind, UserContext } from "../../store/UserContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getCompareOrWishlist } from "../../api/user";

const Wishlist = () => {
  const {
    state: { user, compareWishlistLoading, wishlisted, compareWishlistError },
    dispatch,
  } = useContext(UserContext);

  useLayoutEffect(() => {
    if (user) dispatch({ type: UserActionKind.GET_COMPARE_OR_WISHLIST_START });
  }, [dispatch, user]);

  useEffect(() => {
    if (user)
      (async () => await getCompareOrWishlist(dispatch, "wishlisted"))();
  }, [dispatch, user]);

  if (user === null) return <LoginFirst />;
  if (compareWishlistLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__table">
            <table>
              <tbody>
                {wishlisted?.map((item) => (
                  <WishlistedItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    inStock={item.inStock}
                    image={item.images[0].imageUrl}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                  />
                ))}

                {wishlisted?.length === 0 && (
                  <tr className="wishlist-cart__empty">
                    <td>
                      <h2>No wishlisted products yet</h2>
                    </td>
                  </tr>
                )}

                {compareWishlistError && (
                  <tr className="wishlist-cart__error">
                    <td>
                      <h2>{compareWishlistError}</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <CustomProductsCarousel text="Wanna add more to your wishlist?" /> */}
    </>
  );
};

export default Wishlist;
