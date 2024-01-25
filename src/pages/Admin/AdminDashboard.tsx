import { OrderTable } from "../../components/orders/OrderTable";
import OrdersByStatus from "../../components/admin/OrdersByStatus";
import DashboardNav from "../../components/dashboard/DashboardNav";

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

const AdminDashboard = () => {
  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Dashboard" />
          <div className="dashboard__main">
            <div className="container">
              <OrdersByStatus />
              <OrderTable orders={orders} text="Today's Orders" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
