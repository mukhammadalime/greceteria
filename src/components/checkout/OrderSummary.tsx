import OrderedItem from "./OrderedItem";

const methods = ["Paypal", "Stripe"];

const OrderSummary = () => {
  return (
    <div className="order__summary">
      <div className="bill-card">
        <div className="bill-card__top">
          <h2>Order Summary</h2>
          <div className="ordered">
            <OrderedItem />
            <OrderedItem />
          </div>
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
        <div className="payment__method">
          <h2>Payment Method</h2>
          <div className="payment__method--box">
            {methods.map((val) => (
              <div className="payment__method--item radio-input" key={val}>
                <input type="radio" id={val} name="payment" />
                <label htmlFor={val}>
                  <span></span> {val}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="button button-lg bill-card__action">Place Order</div>
      </div>
    </div>
  );
};

export default OrderSummary;
