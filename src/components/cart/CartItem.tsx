import { useState } from "react";
import Counter from "../UI/Counter";
import WarningModal from "../modals/WarningModal";

const CartItem = () => {
  const [warningModal, setWarningModal] = useState(() => false);

  return (
    <>
      {warningModal && (
        <WarningModal
          text="Are your sure that you want to remove this product from your cart?"
          closeModal={() => setWarningModal(false)}
        />
      )}

      <div className="cart__item">
        <div className="cart__item--product">
          <div>
            <img src="/assets/images/products/almond-1.jpeg" alt="" />
          </div>
          <h5>Almond</h5>
        </div>
        <div className="cart__item--price">
          <p>$14.99</p>
        </div>

        <div className="cart__item--counter">
          <Counter />
        </div>
        <div className="cart__item--subtotal">
          <p>$70.00</p>
        </div>
        <div className="cart__item--delete">
          <div onClick={() => setWarningModal(true)}>
            <img src="/assets/icons/delete-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
