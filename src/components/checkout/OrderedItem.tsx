import { Link } from "react-router-dom";

const OrderedItem = () => {
  return (
    <div className="ordered__item">
      <div className="ordered__item--details">
        <Link to="/products/details">
          <img
            className="ordered__item--img"
            src="/assets/images/products/almond-1.jpeg"
            alt=""
          />
        </Link>
        <div>
          <h5>Almond California</h5>
          <span>5x</span>
        </div>
      </div>
      <h6 className="ordered__item--price">$70.00</h6>
    </div>
  );
};

export default OrderedItem;
