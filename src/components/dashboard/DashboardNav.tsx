import { Link } from "react-router-dom";
import UserIcon from "../UI/Icons/UserIcon";
import LogoutIcon from "../UI/Icons/LogoutIcon";
import CategroyIcon from "../UI/Icons/CategroyIcon";
import WishlistIcon from "../UI/Icons/WishlistIcon";
import SettingsIcon from "../UI/Icons/SettingsIcon";
import DashboardIcon from "../UI/Icons/DashboardIcon";
import StatisticsIcon from "../UI/Icons/StatisticsIcon";
import ShoppingCartIcon from "../UI/Icons/ShoppingCartIcon";
import OrderHistoryIcon from "../UI/Icons/OrderHistoryIcon";

const navUserItems = [
  {
    name: "Dashboard",
    link: "/my-dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Order History",
    link: "/orders",
    icon: <OrderHistoryIcon />,
  },
  {
    name: "Wishlist",
    link: "/wishlist",
    icon: <WishlistIcon />,
  },
  {
    name: "Shopping Cart",
    link: "/my-cart",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

const navAdminItems = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Order History",
    link: "/orders",
    icon: <OrderHistoryIcon />,
  },
  {
    name: "Customers",
    link: "/customers",
    icon: <UserIcon />,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <CategroyIcon />,
  },
  {
    name: "Statistics",
    link: "/statistics",
    icon: <StatisticsIcon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

const DashboardNav = ({ activeNavItem }: { activeNavItem: string }) => {
  return (
    <div className="dashboard__nav">
      <h5>Navigation</h5>
      <ul>
        {[...navAdminItems, ...navUserItems].map((item) => (
          <Link
            to={item.link}
            key={item.name}
            className={`dashboard__nav--item ${
              item.name === activeNavItem ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </Link>
        ))}
        <li className="dashboard__nav--item">
          <span>
            <LogoutIcon />
          </span>
          <p>Log out</p>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
