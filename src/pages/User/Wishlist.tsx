import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getWishlistApi } from "../../api/user";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Wishlist = () => {
  const { state } = useContext(AuthContext);

  const { state: userState, dispatch } = useContext(UserContext);
  console.log("userState:", userState);

  useEffect(() => {
    const getWishlist = async () => await getWishlistApi(dispatch);
    getWishlist();
  }, [dispatch]);

  if (state.user === null) return <LoginFirst />;
  if (userState.wishlistLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__items">
            <div>
              {userState.wishlist.length > 0 &&
                userState.wishlist.map((item) => (
                  <WishlistedItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    inStock={item.inStock}
                    image={item.images[0].imageUrl}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                  />
                ))}
              {/* <div className="wishlist-cart__empty">
                <h2>No wishlisted products yet</h2>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <CustomProductsCarousel text="Wanna add more to your wishlist?" /> */}
    </>
  );
};

export default Wishlist;
