import { OrdersTable } from "../components/orders/OrdersTable";
import DashboardNav from "../components/dashboard/DashboardNav";
import FilterOptions from "../components/UI/FilterOptions";
import { useContext, useEffect } from "react";
import LoginFirst from "../components/LoginFirst";
import { UserContext } from "../store/UserContext";
import { OrderContext } from "../store/OrderContext";
import { getAllOrders, getMyOrders } from "../api/orders";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { orderPriceOptions, orderSortOptions } from "../data/helperData";
import useToggleOptions from "../hooks/useToggleOptions";

const OrderHistory = () => {
  const { state } = useContext(UserContext);
  const {
    state: { loading, orders, customOrders, filterQuery, sortQuery },
    dispatch,
    filterOrders,
    sortOrders,
  } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();

  const uniqueArr = Array.from(
    new Set(customOrders.map((i) => JSON.stringify(i)))
  ).map((i) => JSON.parse(i));

  useEffect(() => {
    if (!state.user) return;
    const getOrdersForUser = async () => {
      await getMyOrders(dispatch, axiosPrivate, "sort=-createdAt");
    };

    const getOrdersForAdmin = async () =>
      await getAllOrders(dispatch, axiosPrivate, "sort=-createdAt");

    state.user.role === "user" && getOrdersForUser();
    state.user.role !== "user" && getOrdersForAdmin();
  }, [axiosPrivate, dispatch, state.user]);

  // This function opens the requested filter and closed other remaining open filters.
  const { filtersOpen, toggleOptionsHandler } = useToggleOptions(2);

  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-sm">
      <div className="container">
        <div className="order-history-page dashboard">
          <DashboardNav activeNavItem="Order History" />

          {/* Order History */}
          <div className="dashboard__main">
            <div className="filter__top">
              <FilterOptions
                options={orderPriceOptions}
                title="Select Price"
                onToggle={toggleOptionsHandler.bind(null, 0)}
                onSelect={(id: string) => filterOrders(id)}
                open={filtersOpen[0]}
              />
              <FilterOptions
                options={orderSortOptions}
                title="Sort By: Status"
                onToggle={toggleOptionsHandler.bind(null, 1)}
                onSelect={(id: string) => sortOrders(id)}
                open={filtersOpen[1]}
              />
            </div>

            {orders === null && !loading && <h1>Something went wrong.</h1>}

            <OrdersTable
              orders={filterQuery || sortQuery ? uniqueArr : orders}
              filterQuery={filterQuery}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
