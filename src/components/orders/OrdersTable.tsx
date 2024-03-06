import { Link } from "react-router-dom";
import { OrderProps } from "../../utils/user-types";
import OrderItem from "./OrderItem";
import TableItemSkeleton from "../../skeletons/TableItemsSkeleton";

export const OrdersTableHeader = () => {
  return (
    <thead>
      <tr className="table__header">
        <th className="table__header--item">ORDER ID</th>
        <th className="table__header--item">DATE</th>
        <th className="table__header--item">TOTAL</th>
        <th className="table__header--item">STATUS</th>
        <th className="table__header--item"></th>
      </tr>
    </thead>
  );
};

const orderItemsWidths = ["60%", "90%", "90%", "90%", "90%"];

export const OrdersTable = ({
  orders,
  recent,
  filterQuery,
  loading,
}: {
  orders: OrderProps[] | null;
  recent?: boolean;
  filterQuery?: string;
  loading: boolean;
}) => {
  return (
    <div className="order-history">
      <div className="order-history__header">
        <h2>{recent && "Recent "}Order History</h2>
        {recent && <Link to="/orders">View All</Link>}
      </div>

      <div className="order-history__table">
        <table className="table">
          <OrdersTableHeader />

          <tbody>
            {((loading && !orders) || !orders) && (
              <TableItemSkeleton widths={orderItemsWidths} />
            )}

            {orders?.map((order: OrderProps) => (
              <OrderItem
                key={order._id}
                orderNumber={order.orderNumber}
                numOfProducts={order.orderedProducts.length}
                totalPrice={order.totalPrice}
                status={order.status}
                id={order._id}
                createdAt={order.createdAt}
              />
            ))}

            {orders?.length === 0 && !loading && (
              <tr className="order-history__empty">
                <td>
                  {filterQuery
                    ? "No orders with that filter."
                    : `No${recent ? " recent" : ""} orders yet.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
