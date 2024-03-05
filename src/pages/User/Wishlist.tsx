import WishlistedItem from "../../components/WishlistedItem";
import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext, useEffect, useState } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getCompareWishlistProducts } from "../../api/user";
import { ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Wishlist = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<ProductItemTypes[] | []>([]);

  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { products },
  } = useContext(ProductContext);

  useEffect(() => {
    if (products.length === 0 || !user) return;
    getCompareWishlistProducts(products, user.wishlisted, setWishlist);
    setTimeout(() => setLoading(false), 200);
  }, [products, user]);

  if (user === null) return <LoginFirst />;
  if (loading) return <LoadingSpinner />;

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
                      key={item._id}
                      id={item._id}
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
