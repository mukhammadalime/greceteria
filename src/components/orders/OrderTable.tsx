import { Link } from "react-router-dom";

export const OrderTableHeader = () => {
  return (
    <div className="table__header">
      <div className="table__header--item">Order Id</div>
      <div className="table__header--item">Date</div>
      <div className="table__header--item">Total</div>
      <div className="table__header--item">Status</div>
    </div>
  );
};

export const OrderTable = ({
  orders,
  notHeader = false,
  text,
}: {
  orders: any;
  notHeader?: boolean;
  text: string;
}) => {
  return (
    <div className="order-history">
      {!notHeader && (
        <div className="order-history__header">
          <h2>{text ? text : "Recent Order History"}</h2>
          <Link to="/orders">View All</Link>
        </div>
      )}

      <div className="order-history__table">
        <OrderTableHeader />
        {/* <div className="order-history__empty">
          <h2>No orders yet</h2>
        </div> */}
        {orders.map((order: any) => (
          <div className="table__item" key={order.id}>
            <p>{order.id}</p>
            <p>{order.date}</p>
            <p>
              <span>{order.total} </span>({order.numOfProducts} Products)
            </p>
            <p>{order.status}</p>
            <Link to="/orders/details" className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
