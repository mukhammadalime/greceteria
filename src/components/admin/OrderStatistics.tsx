import ArrowCircleIcon from "../UI/Icons/ArrowCircleIcon";

const OrderStatistics = () => {
  return (
    <div className="orders-stat">
      <div className="orders-stat__item">
        <h2>Today's Revenue</h2>
        <div className="orders-stat__img">
          <img src="/assets/icons/money-icon.svg" alt="" />
          <span>$550.00</span>
        </div>
        <div className="orders-stat__statistics">
          <ArrowCircleIcon />
          <p>
            5% <span>than Yesterday</span>
          </p>
        </div>
      </div>
      <div className="orders-stat__item">
        <h2>This month Revenue</h2>
        <div className="orders-stat__img">
          <img src="/assets/icons/money-icon.svg" alt="" />
          <span>$5.550.00</span>
        </div>
        <div className="orders-stat__statistics orders-down">
          <ArrowCircleIcon />
          <p>
            5% <span>than Last Month</span>
          </p>
        </div>
      </div>
      <div className="orders-stat__item">
        <h2>This year Revenue</h2>
        <div className="orders-stat__img">
          <img src="/assets/icons/money-icon.svg" alt="" />
          <span>$15.550.00</span>
        </div>
        <div className="orders-stat__statistics">
          <ArrowCircleIcon />
          <p>
            5% <span>than Last Year</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
