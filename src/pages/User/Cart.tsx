import { Link } from "react-router-dom";
import BillCard from "../../components/cart/BillCard";
import CartItem from "../../components/cart/CartItem";
import CartHeader from "../../components/cart/CartHeader";
import SectionHead from "../../components/UI/SectionHeader";
import LoginFirst from "../../components/LoginFirst";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { CartContext } from "../../store/CartContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { CartProductProps } from "../../utils/user-types";

const Cart = () => {
  const { state } = useContext(AuthContext);
  const {
    state: { cart, cartLoading },
  } = useContext(CartContext);

  if (state.user === null) return <LoginFirst />;
  if (cartLoading) return <LoadingSpinner />;

  return (
    <div className="section-md">
      <div className="container">
        <SectionHead text="My Shopping Cart" />

        <div className="cart__content-container">
          <div className="cart__content">
            <div className="cart__content--table">
              {cart && (
                <table>
                  <CartHeader />
                  <tbody>
                    {cart?.cartProducts?.length > 0 &&
                      cart.cartProducts.map((item: CartProductProps) => (
                        <CartItem cartItem={item} key={item._id} />
                      ))}
                  </tbody>
                </table>
              )}
            </div>

            {!cart && (
              <div className="cart__content--empty">
                <h2>No products yet</h2>
              </div>
            )}

            <div className="cart__action">
              <Link to="/shop" className="button button-md return-to-shop">
                Return To Shop
              </Link>
            </div>
          </div>

          {!cartLoading && <BillCard cart={cart} type="cart" />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
