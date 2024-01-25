import OptionsBox from "./OptionsBox";
import { Link } from "react-router-dom";
import RatingsStars from "../UI/RatingsStars";

const CompareItem = (props: {
  brandName: string;
  name: string;
  features: string;
  weight: string;
}) => {
  return (
    <div className="compare-item">
      <div className="compare-item__img-box">
        {/* <span className="stock-out">Out of Stock</span> */}
        <Link to="/products/details" draggable="false">
          <img
            draggable="false"
            className="compare-item__img"
            src="/assets/images/products/almond-1.jpeg"
            alt=""
          />
        </Link>
        <OptionsBox />
      </div>
      <div className="compare-item__main">
        <h2 className="compare-item__title">
          <span>{props.brandName ? props.brandName : ""}</span>
          {props.name}
          <span>
            {props.features ? props.features : ""}{" "}
            {props.weight ? props.weight : ""}{" "}
          </span>
        </h2>
        <div className="compare-item__ratings">
          <RatingsStars ratingsAverage={4} ratingsQuantity={10} />
        </div>
        <div className="compare-item__price">
          <del className="discounted-price">$48.00</del>
          <h2>$17.28</h2>
          <div className="sale-off">64% off</div>
        </div>
        <p className="compare-item__description">
          Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra,
          Per Inceptos Himenaeos. Nulla Nibh Diam, Blandit Vel Consequat Nec,
          Ultrices Et Ipsum. Nulla Varius Magna A Consequat Pulvinar.
        </p>
      </div>
    </div>
  );
};

export default CompareItem;
