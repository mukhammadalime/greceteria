import OrdersTable from "../../components/orders/OrdersTable";
import UserDetails from "../../components/dashboard/UserDetails";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrdersByStatus from "../../components/admin/OrdersByStatus";
import { useContext, useEffect } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { OrderContext } from "../../store/OrderContext";
import {
  getMyOrders,
  getOrdersStats,
  getRecentOrdersForAdmin,
} from "../../api/orders";
import { AuthContext } from "../../store/AuthContext";

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const { state: ordersState, dispatch } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth.accessToken) return;

    if (user?.role !== "user") {
      (async () => {
        await getRecentOrdersForAdmin(dispatch, axiosPrivate);
      })();
      (async () => {
        await getOrdersStats(dispatch, axiosPrivate);
      })();
    }

    if (user?.role === "user")
      (async () => {
        await getMyOrders(dispatch, axiosPrivate, "limit=10&sort=-createdAt");
      })();
  }, [auth.accessToken, axiosPrivate, dispatch, user?.role]);

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
