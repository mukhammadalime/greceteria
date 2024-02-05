import { OrdersTable } from "../../components/orders/OrdersTable";
import UserDetails from "../../components/dashboard/UserDetails";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrdersByStatus from "../../components/admin/OrdersByStatus";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import LoginFirst from "../../components/LoginFirst";

const orders = [
  {
    id: "#123",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
  {
    id: "#234",
    date: "14 Aug, 2021",
    total: "$150.00",
    numOfProducts: 6,
    status: "Delivered",
  },
  {
    id: "#355",
    date: "12 Jan, 2022",
    total: "$300.00",
    numOfProducts: 7,
    status: "Delivered",
  },
  {
    id: "#400",
    date: "12 Mar, 2022",
    total: "$490.00",
    numOfProducts: 10,
    status: "Delivered",
  },
  {
    id: "#444",
    date: "20 Apr, 2022",
    total: "$500.00",
    numOfProducts: 13,
    status: "Processing",
  },
];

const Dashboard = () => {
  const { state } = useContext(AuthContext);
  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-sm ">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Dashboard" />
          <div className="dashboard__main">
            <UserDetails />
            {state.user && state.user.role !== "user" && <OrdersByStatus />}
            <OrdersTable orders={orders} text={""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
