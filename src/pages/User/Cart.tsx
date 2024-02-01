import { Link } from "react-router-dom";
import BillCard from "../../components/cart/BillCard";
import CartItem from "../../components/cart/CartItem";
import CartHeader from "../../components/cart/CartHeader";
import SectionHead from "../../components/UI/SectionHeader";

const Cart = () => {
  return (
    <div className="section-md">
      <div className="container">
        <SectionHead text="My Shopping Cart" />

        <div className="cart__content-container">
          <div className="cart__content">
            <div className="cart__content--table">
              <table>
                <CartHeader />
                <tbody>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </tbody>
              </table>
            </div>

            <div className="cart__action">
              <Link to="/shop" className="button button-md return-to-shop">
                Return To Shop
              </Link>
            </div>

            {/* <div className="cart__content--empty">
            <h2>No products yet</h2>
          </div> */}
          </div>

          <BillCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
