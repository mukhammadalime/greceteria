import CheckMarkIcon from "../UI/Icons/CheckMarkIcon";

const orderStatuses = [
  { num: "02", status: "Processing" },
  { num: "03", status: "On The Way" },
  { num: "04", status: "Delivered" },
];

const OrderStatusBar = () => {
  const width = 16.6666667;
  // const width = 50;
  // const width = 83.3333335;
  // const width = 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__border">
        <span style={{ width: `${width}%` }}></span>
      </div>
      <div className="progress-bar__item active-status">
        <div className="progress-bar__item--ball">
          <p>01</p>
          <span>
            <CheckMarkIcon />
          </span>
        </div>
        <h2>Order Received</h2>
      </div>
      {orderStatuses.map(({ num, status }) => (
        <div className="progress-bar__item" key={num}>
          <div className="progress-bar__item--ball">
            <p>{num}</p>
            <span>
              <CheckMarkIcon />
            </span>
          </div>
          <h2>{status}</h2>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusBar;
