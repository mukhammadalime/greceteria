import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";

const Wishlist = () => {
  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__items">
            {/* <div className="wishlist-cart__empty">
                <h2>No wishlisted products yet</h2>
              </div> */}
            <WishlistedItem />
            <WishlistedItem />
            <WishlistedItem />
          </div>
        </div>
      </div>

      <CustomProductsCarousel text="Wanna add more to your wishlist?" />
    </>
  );
};

export default Wishlist;
