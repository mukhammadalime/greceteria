import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import LoginFirst from "../../components/LoginFirst";

const Wishlist = () => {
  const { state } = useContext(AuthContext);
  if (state.user === null) return <LoginFirst />;

  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__items">
            <div>
              {/* <div className="wishlist-cart__empty">
                <h2>No wishlisted products yet</h2>
              </div> */}
              <WishlistedItem />
              <WishlistedItem />
              <WishlistedItem />
            </div>
          </div>
        </div>
      </div>

      {/* <CustomProductsCarousel text="Wanna add more to your wishlist?" /> */}
    </>
  );
};

export default Wishlist;
