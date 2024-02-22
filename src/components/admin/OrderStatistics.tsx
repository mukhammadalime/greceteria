import { RevenueDataTypes } from "../../utils/user-types";
import OrderStatisticsItem from "./OrderStatisticsItem";

const OrderStatistics = ({ stats }: { stats: RevenueDataTypes }) => {
  return (
    <div className="orders-stat">
      {Object.entries(stats)
        .slice(0, -3)
        .map((obj) => (
          <OrderStatisticsItem item={obj[1]} key={obj[0]} />
        ))}
    </div>
  );
};

export default OrderStatistics;
