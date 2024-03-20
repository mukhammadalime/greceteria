import OrdersTable from "../../components/orders/OrdersTable";
import UserDetails from "../../components/dashboard/UserDetails";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrdersByStatus from "../../components/admin/OrdersByStatus";
import { useContext, useEffect, useLayoutEffect } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { OrderActionKind, OrderContext } from "../../store/OrderContext";
import {
  getMyOrders,
  getOrdersStats,
  getRecentOrdersForAdmin,
} from "../../api/orders";

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { state: ordersState, dispatch } = useContext(OrderContext);

  useLayoutEffect(() => {
    if (user) dispatch({ type: OrderActionKind.GET_RECENT_ORDERS_START });
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      if (user.role !== "user")
        await Promise.all([
          getRecentOrdersForAdmin(dispatch),
          getOrdersStats(dispatch),
        ]);
      else getMyOrders(dispatch, "limit=10&sort=-createdAt");
    })();
  }, [dispatch, user]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-sm ">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Dashboard" />
          <div className="dashboard__main">
            <UserDetails user={user} />
            {user && user.role === "admin" && (
              <OrdersByStatus stats={ordersState.stats} />
            )}

            <OrdersTable
              orders={ordersState.recentOrders}
              recent
              loading={ordersState.recentLoading}
              error={ordersState.error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
