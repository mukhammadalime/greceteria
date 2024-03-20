import { Link, useParams } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderedItemsTable from "../../components/orders/OrderedItemsTable";
import OrderDetailsContent from "../../components/orders/OrderDetailsContent";
import { useContext, useEffect, useLayoutEffect } from "react";
import { getOneOrder } from "../../api/orders";
import { OrderActionKind, OrderContext } from "../../store/OrderContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    state: { orderLoading, error, order },
    dispatch,
  } = useContext(OrderContext);

  useLayoutEffect(() => {
    dispatch({ type: OrderActionKind.GET_ORDER_START });
  }, [dispatch]);

  useEffect(() => {
    (async () => await getOneOrder(dispatch, orderId!))();
  }, [dispatch, orderId]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Order History" />

          {orderLoading && <LoadingSpinner />}

          {order && (
            <div className="order-details">
              <div className="order-details__info">
                <div className="order-details__header">
                  <h2>Order Details</h2>
                  <Link to="/orders">Back</Link>
                </div>
                <OrderDetailsContent order={order} />
                <OrderedItemsTable items={order.orderedProducts} />
              </div>
            </div>
          )}

          {error && !orderLoading && (
            <div className="order-details__error">
              <h1>{error}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
