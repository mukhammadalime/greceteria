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
      <div className="wishlist__item cart__item">
        <div className="table-1">
          <div className="table__img">
            <img src="/assets/images/products/almond-1.jpeg" alt="" />
          </div>
          <h5>Almond</h5>
        </div>
        <div className="table-2">
          <p>$14.99</p>
        </div>
        <div className="table-3">
          <Counter />
        </div>
        <div className="table-4">
          <p>$70.00</p>
        </div>
        <div
          className="delete-item table-5"
          onClick={() => setWarningModal(true)}
        >
          <img src="/assets/icons/delete-icon.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default CartItem;
