import { useState } from "react";
import CompareIcon from "../UI/Icons/CompareIcon";
import QuickViewModal from "../modals/QuickViewModal";
import { Link } from "react-router-dom";

const ProductCardImg = (props: { image: string }) => {
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);

  return (
    <>
      {showQuickView && (
        <QuickViewModal closeQuickView={() => setShowQuickView(false)} />
      )}
      <div className="product-item__img-box">
        <Link to="/products/details">
          <img
            className="product-item__img"
            src={`/assets/images/products/${props.image}`}
            alt=""
          />
          {/* <div className="stock-out product-item__stock-out">Out of stock</div> */}
        </Link>
        <div className="favs">
          <div className="favs-item">
            <svg>
              <use href="/assets/icons/icons.svg#icon-heart"></use>
            </svg>
          </div>
          <div className="favs-item" onClick={() => setShowQuickView(true)}>
            <svg>
              <use href="/assets/icons/icons.svg#icon-eye"></use>
            </svg>
          </div>
          <div className="favs-item">
            <CompareIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardImg;
