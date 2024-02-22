import UserIcon from "../../components/UI/Icons/UserIcon";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderStatistics from "../../components/admin/OrderStatistics";
import { useContext, useEffect } from "react";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { OrderContext } from "../../store/OrderContext";
import { UserContext } from "../../store/UserContext";
import { getOrdersRevenueStats } from "../../api/orders";

const Statistics = () => {
  const { state } = useContext(UserContext);
  const { state: ordersState, dispatch } = useContext(OrderContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!state.user) return;
    const getOrdersStatsForAdmin = async () =>
      await getOrdersRevenueStats(dispatch, axiosPrivate);

    state.user.role !== "user" && getOrdersStatsForAdmin();
  }, [axiosPrivate, dispatch, state.user]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Statistics" />
          <div className="statistics">
            <OrderStatistics stats={ordersState.revenue} />
            <div className="order-numbers">
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Customers</h6>
                  <span>453</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>New Customers</h6>
                  <span>45</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>July Customers</h6>
                  <span>98</span>
                </div>
              </div>
            </div>
            <div className="order-numbers">
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/money-white-icon.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Revenue</h6>
                  <span>${ordersState.revenue.totalRevenue.toFixed(2)}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/shopping-cart.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Orders</h6>
                  <span>{ordersState.revenue.total}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/cancel.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Cancelled Orders</h6>
                  <span>{ordersState.revenue.cancelled}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
