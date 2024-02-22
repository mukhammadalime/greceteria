import { useNavigate, useParams } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderedItemsTable from "../../components/orders/OrderedItemsTable";
import OrderDetailsContent from "../../components/orders/OrderDetailsContent";
import { useContext, useEffect } from "react";
import { getOneOrder } from "../../api/orders";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { OrderContext } from "../../store/OrderContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { state, dispatch } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      await getOneOrder(dispatch, axiosPrivate, orderId as string);
    })();
  }, [axiosPrivate, dispatch, orderId]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Order History" />

          {state.order && !state.loading && (
            <div className="order-details">
              <div className="order-details__info">
                <div className="order-details__header">
                  <h2>Order Details</h2>
                  <span onClick={() => navigate(-1)}>Back</span>
                </div>
                <OrderDetailsContent order={state.order} />
                <OrderedItemsTable items={state.order.orderedProducts} />
              </div>
            </div>
          )}

          {state.loading && <LoadingSpinner />}

          {!state.order && !state.loading && <h2>Something went wrong!</h2>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
