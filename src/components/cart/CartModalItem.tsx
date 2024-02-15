import { useContext, useState } from "react";
import { CartProductProps } from "../../utils/user-types";
import { CartContext } from "../../store/CartContext";
import { deleteProductCart } from "../../api/cart";
import LoadingCounterSpinner from "../UI/Icons/LoadingCounterSpinner";

const CartItem = ({ cartItem }: { cartItem: CartProductProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(CartContext);

  const onDeleteProductFromCart = async () => {
    await deleteProductCart(dispatch, cartItem.productId, setLoading);
  };

  return (
    <>
      <div className="cart-modal__item">
        <div className="cart-modal__item--main">
          <img src={cartItem.image} alt="" />
          <div className="cart-modal__item--info">
            <span className="cart-modal__item--name">{cartItem.name}</span>
            <p>
              {cartItem.quantity} x ${cartItem.price.toFixed(2)}
            </p>
            <h5>Total: ${cartItem.subTotal.toFixed(2)}</h5>
          </div>
        </div>
        <div className="delete-item" onClick={onDeleteProductFromCart}>
          {loading ? (
            <LoadingCounterSpinner />
          ) : (
            <img src="/assets/icons/delete-icon.svg" alt="" />
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;
