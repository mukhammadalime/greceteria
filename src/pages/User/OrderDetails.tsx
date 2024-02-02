import { useNavigate } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderedItemsTable from "../../components/orders/OrderedItemsTable";
import OrderDetailsContent from "../../components/orders/OrderDetailsContent";

const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Order History" />

          <div className="order-details">
            <div className="order-details__info">
              <div className="order-details__header">
                <h2>Order Details</h2>
                <span onClick={() => navigate(-1)}>Back To List</span>
              </div>
              <OrderDetailsContent forAdmin={true} />
              <OrderedItemsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
