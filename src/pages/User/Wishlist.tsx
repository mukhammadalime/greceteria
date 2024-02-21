import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext, useEffect, useState } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getCompareWishlistProducts } from "../../api/user";
import { ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<ProductItemTypes[] | []>([]);

  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { products },
  } = useContext(ProductContext);

  useEffect(() => {
    user && getCompareWishlistProducts(products, user.wishlisted, setWishlist);
  }, [products, user]);

  if (user === null) return <LoginFirst />;

  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__table">
            <table>
              <tbody>
                {wishlist.length > 0 &&
                  wishlist.map((item) => (
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

                {wishlist.length === 0 && (
                  <tr className="wishlist-cart__empty">
                    <td>
                      <h2>No wishlisted products yet</h2>
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
