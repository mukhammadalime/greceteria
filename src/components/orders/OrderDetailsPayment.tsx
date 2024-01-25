const OrderDetailsPayment = () => {
  return (
    <div className="total-payment">
      <div className="total-payment__header">
        <div className="total-payment__item">
          <h5>Order Id</h5>
          <p>(#123)</p>
        </div>
        <div className="total-payment__item">
          <h5>Payment via</h5>
          <p>(Paypal)</p>
        </div>
      </div>
      <div className="total-payment__content">
        <div className="total-payment__content--item">
          <h5>Subtotal</h5>
          <p>$365.00</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Discount</h5>
          <p>$24.00</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Shipping</h5>
          <p>Free</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Total</h5>
          <p>$341.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPayment;
