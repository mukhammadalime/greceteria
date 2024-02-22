import { RevenueItemTypes } from "../../utils/user-types";
import ArrowCircleIcon from "../UI/Icons/ArrowCircleIcon";
import EqualIcon from "../UI/Icons/EqualIcon";

const OrderStatisticsItem = ({ item }: { item: RevenueItemTypes }) => {
  return (
    <div className="orders-stat__item">
      <h2>Today's Revenue</h2>
      <div className="orders-stat__img">
        <img src="/assets/icons/money-icon.svg" alt="" />
        <span>${item.new.toFixed(2)}</span>
      </div>
      <div
        className={`orders-stat__statistics${
          item.difference < 0 ? " orders-down" : ""
        }`}
      >
        {item.difference === 0 ? (
          <>
            <EqualIcon />
            <p>
              <span>sam with</span>
            </p>
          </>
        ) : (
          <>
            <ArrowCircleIcon />
            <p>
              {Math.abs(item.difference)}% <span>than</span>
            </p>
          </>
        )}

        <span> yesterday (${item.old.toFixed(2)})</span>
      </div>
    </div>
  );
};

export default OrderStatisticsItem;
