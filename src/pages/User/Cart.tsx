import { Link } from "react-router-dom";
import BillCard from "../../components/cart/BillCard";
import CartItem from "../../components/cart/CartItem";
import CartHeader from "../../components/cart/CartHeader";
import SectionHead from "../../components/UI/SectionHeader";

const Cart = () => {
  return (
    <div className="section-md wishlist cart">
      <div className="container">
        <SectionHead text="My Shopping Cart" />
        <div className="wishlist__content cart__content">
          <div className="cart__table">
            <CartHeader />
            <div className="wishlist__main">
              <CartItem />
              <CartItem />
              <CartItem />
              {/* <div className="wishlist-cart__empty">
                <h2>No products yet</h2>
              </div> */}
            </div>
            <div className="cart__actions">
              <Link to="/shop" className="button button-md return-to-shop">
                Return To Shop
              </Link>
            </div>
          </div>
          <BillCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
