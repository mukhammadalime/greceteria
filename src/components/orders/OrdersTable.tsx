import { Link } from "react-router-dom";
import PaginationButtons from "../UI/PaginationButtons";
import usePaginate from "../../hooks/usePaginate";

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

export const OrdersTable = ({
  orders,
  text,
}: {
  orders: any;
  text: string;
}) => {
  const { handlePageClick, pageCount, currentItems } = usePaginate(orders);

  return (
    <div className="order-history">
      <div className="order-history__header">
        {text === "Order History" ? (
          <>
            <h2>Order History</h2>
            <PaginationButtons
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </>
        ) : (
          <>
            <h2>Recent Order History</h2>
            <Link to="/orders">View All</Link>
          </>
        )}
      </div>

      {/* <div className="order-history__empty">
          <h2>No orders yet</h2>
        </div> */}

      <div className="order-history__table">
        <table className="table">
          <OrdersTableHeader />
          <tbody>
            {currentItems.map((order: any, i: number) => (
              <tr className="table__item" key={i}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>
                  <span>{order.total} </span>({order.numOfProducts} Products)
                </td>
                <td>{order.status}</td>
                <td>
                  <Link to="/orders/details" className="view-details">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
