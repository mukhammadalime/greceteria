import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import CloseIcon from "../UI/Icons/CloseIcon";
import CartModalItem from "../cart/CartModalItem";

const Backdrop = (props: { closeCartModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeCartModal} />;
};

const CartOverLay = (props: { closeCartModal: () => void }) => {
  return (
    <div className="cart-modal">
      <div className="cart-modal__header">
        <h5>
          Shopping Cart <span>(2)</span>
        </h5>
        <div className="cart-modal__close" onClick={props.closeCartModal}>
          <CloseIcon />
        </div>
      </div>
      <div className="cart-modal__items">
        <CartModalItem />
        <CartModalItem />
        <CartModalItem />
        <CartModalItem />
      </div>
      {/* <div className="cart-modal__empty">
        <h2>Cart Is Empty</h2>
      </div> */}
      <div className="cart-modal__bottom">
        <div className="cart-modal__bottom--info">
          <p>2 Product</p>
          <span>$24.00</span>
        </div>
        <form className="cart-modal__form">
          <Link
            to="/checkout"
            className="button button-lg cart__checkout"
            onClick={props.closeCartModal}
          >
            Checkout
          </Link>
          <Link
            to="/my-cart"
            className="button button-lg go-to-cart"
            onClick={props.closeCartModal}
          >
            Go To Cart
          </Link>
        </form>
      </div>
    </div>
  );
};

const CartModal = (props: { closeCartModal: () => void }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeCartModal={props.closeCartModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <CartOverLay closeCartModal={props.closeCartModal} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default CartModal;
