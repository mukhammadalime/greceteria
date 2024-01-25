import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";

const Wishlist = () => {
  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__content">
            <div className="wishlist__head">
              <div className="head-title">
                <h5>Product</h5>
              </div>
              <div className="head-title">
                <h5>Price</h5>
              </div>
              <div className="head-title">
                <h5>Stock Status</h5>
              </div>
            </div>
            <div className="wishlist__main">
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

      <CustomProductsCarousel text="Wanna add more to your wishlist?" />
    </>
  );
};

export default Wishlist;
