import { Link } from "react-router-dom";

const BillCard = () => {
  return (
    <div className="bill-card">
      <div className="bill-card__top">
        <h2>Order Summary</h2>
        <div className="bill-card__detail">
          <p>Subtotal:</p>
          <span>$84.00</span>
        </div>
        <div className="bill-card__detail">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <div className="bill-card__detail">
          <p>Total</p>
          <span>$84.00</span>
        </div>
      </div>
      <Link to="/checkout" className="button button-lg bill-card__action">
        Go to checkout
      </Link>
    </div>
  );
};

export default BillCard;
