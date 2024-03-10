import { Link, useParams } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderedItemsTable from "../../components/orders/OrderedItemsTable";
import OrderDetailsContent from "../../components/orders/OrderDetailsContent";
import { useContext, useEffect } from "react";
import { getOneOrder } from "../../api/orders";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { OrderContext } from "../../store/OrderContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AuthContext } from "../../store/AuthContext";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    state: { loading, error, order },
    dispatch,
  } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getOneOrder(dispatch, axiosPrivate, orderId as string);
    })();
  }, [auth.accessToken, axiosPrivate, dispatch, orderId]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Order History" />

          {((loading && !order) || !order) && !error && <LoadingSpinner />}

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

          {error && !loading && (
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
