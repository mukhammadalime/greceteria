import { OrdersTable } from "../../components/orders/OrdersTable";
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

const Dashboard = () => {
  const { state } = useContext(UserContext);
  const { state: ordersState, dispatch } = useContext(OrderContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!state.user) return;
    const getOrdersForUser = async () =>
      await getMyOrders(dispatch, axiosPrivate, "limit=10&sort=-createdAt");

    const getOrdersForAdmin = async () =>
      await getRecentOrdersForAdmin(dispatch, axiosPrivate);

    const getOrdersStatsForAdmin = async () =>
      await getOrdersStats(dispatch, axiosPrivate);

    state.user.role === "user" && getOrdersForUser();
    state.user.role !== "user" && getOrdersForAdmin();
    state.user.role !== "user" && getOrdersStatsForAdmin();
  }, [axiosPrivate, dispatch, state.user]);

  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-sm ">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Dashboard" />
          <div className="dashboard__main">
            <UserDetails user={state.user} />
            {state.user && state.user.role !== "user" && (
              <OrdersByStatus stats={ordersState.stats} />
            )}

            <OrdersTable
              orders={ordersState.orders}
              recent
              loading={ordersState.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
