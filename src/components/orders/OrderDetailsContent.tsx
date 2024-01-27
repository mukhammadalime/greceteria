import OrderStatusBar from "./OrderStatusBar";
import OrderDetailsPayment from "./OrderDetailsPayment";
import FilterOptions from "../UI/FilterOptions";
const statusOptions = ["Received", "Processing", "On The Way", "Delivered"];

const OrderDetailsContent = (props: { forAdmin: boolean }) => {
  return (
    <div className="order-details__content">
      <div className="order-details__content--main">
        <OrderDetailsPayment />
        <div>
          <div className="order-details__address">
            <h4>Shipping Address</h4>
            <div className="order-details__address--item">
              <h5>
                <span>Receiver: </span> Laura Wilson
              </h5>
              <h5>
                <span>Address: </span>4140 Parker Rd. Allentown, New Mexico
                31134
              </h5>
              <h5>
                <span>Phone number: </span>+82 1057012806
              </h5>
            </div>
          </div>
          <div className="order-details__date">
            <p>Order date:</p> <span>2021, July 17, 13:47AM</span>
          </div>
        </div>
      </div>

      <OrderStatusBar />

      {props.forAdmin && (
        <div className="update-order">
          <div className="order-status">
            <h2>Order Status: </h2>
            <span>Received</span>
          </div>
          <div className="update-order__item">
            <h2>Update Order: </h2>
            <FilterOptions
              options={statusOptions}
              title="Received"
              className=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsContent;
