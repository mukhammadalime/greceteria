import UserIcon from "../../components/UI/Icons/UserIcon";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderStatistics from "../../components/admin/OrderStatistics";

const Statistics = () => {
  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Statistics" />
          <div className="statistics">
            <div className="container">
              <OrderStatistics />
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
                    <span>$25.698.00</span>
                  </div>
                </div>
                <div className="order-numbers__item">
                  <div className="order-numbers__img">
                    <img src="/assets/icons/shopping-cart.svg" alt="" />
                  </div>
                  <div className="order-numbers__main">
                    <h6>Total Orders</h6>
                    <span>2308</span>
                  </div>
                </div>
                <div className="order-numbers__item">
                  <div className="order-numbers__img">
                    <img src="/assets/icons/cancel.svg" alt="" />
                  </div>
                  <div className="order-numbers__main">
                    <h6>Cancelled Orders</h6>
                    <span>342</span>
                  </div>
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
