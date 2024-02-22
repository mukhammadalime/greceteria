import OrderStatusBar from "./OrderStatusBar";
import OrderDetailsPayment from "./OrderDetailsPayment";
import FilterOptions from "../UI/FilterOptions";
import { useContext, useState } from "react";
import { UserContext } from "../../store/UserContext";
import { OrderProps } from "../../utils/user-types";
import useCustomizeDate from "../../hooks/useCustomizeDate";
import { updateOrder } from "../../api/orders";
import { OrderContext } from "../../store/OrderContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const statusOptions = [
  {
    name: "On The Way",
    id: "on the way",
  },
  {
    name: "Delivered",
    id: "delivered",
  },
];

const OrderDetailsContent = ({ order }: { order: OrderProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useContext(UserContext);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const { dispatch } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();

  const { month, date, year, hour, minutes } = useCustomizeDate(
    order.createdAt
  );
  const {
    month: month1,
    date: date1,
    year: year1,
    hour: hour1,
    minutes: minutes1,
  } = useCustomizeDate(order.deliveredAt || new Date(Date.now()));

  const onUpdateOrder = async (arg: string) => {
    if (loading || order.status === arg) return;
    const actionType = arg === "on the way" ? "on-the-way" : "delivered";
    setLoading(true);
    await updateOrder(dispatch, axiosPrivate, order._id, actionType);
    setLoading(false);
  };

  return (
    <div className="order-details__content">
      <div className="order-details__content--main">
        <OrderDetailsPayment
          orderNumber={order.orderNumber}
          paymentMethod={order.paymentMethod}
          total={order.totalPrice}
          shippingFee={order.deliveryFee}
        />
        <div>
          <div className="order-details__address">
            <h4>Shipping Address</h4>
            <div className="order-details__address--item">
              <h5>
                <span>Receiver: </span> {order.address.name}
              </h5>
              <h5>
                <span>Address: </span>
                {order.address.address1} {order.address?.address2}{" "}
                {order.address.city} {order.address.postalCode}
              </h5>
              <h5>
                <span>Phone number: </span>
                {order.address.phoneNumber}
              </h5>
            </div>
          </div>
          <div className="order-details__date">
            <div>
              <p>Order date:</p>
              <span>
                {year}, {month} {date}, {hour}:{minutes}
              </span>
            </div>
            {order.deliveredAt && (
              <div>
                <p>Delivered date:</p>
                <span>
                  {year1}, {month1} {date1}, {hour1}:{minutes1}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {order.notes && (
        <div className="order-details__notes">
          <h1>Special note:</h1>
          <p>{order.notes}</p>
        </div>
      )}

      <OrderStatusBar status={order.status} />

      {state.user && state.user.role !== "user" && (
        <div className="update-order">
          <div className="order-status">
            <h2>Order Status: </h2>
            <span>{order.status}</span>
          </div>
          <div className="update-order__item">
            <h2>Update Order: </h2>
            <FilterOptions
              options={statusOptions}
              title=""
              onToggle={() => setOptionsOpen((prev) => !prev)}
              onSelect={(arg: string) => onUpdateOrder(arg)}
              open={optionsOpen}
              defaultValue={order.status}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsContent;
