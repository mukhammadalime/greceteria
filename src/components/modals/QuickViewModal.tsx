import ReactDOM from "react-dom";
import Counter from "../UI/Counter";
import CloseIcon from "../UI/Icons/CloseIcon";
import RatingsStars from "../UI/RatingsStars";

const Backdrop = (props: { closeQuickView: () => void }) => {
  return <div className="modal-container" onClick={props.closeQuickView} />;
};

const QuickViewOverlay = (props: { closeQuickView: () => void }) => {
  return (
    <div className="quick-view">
      <div className="quick-view__close" onClick={props.closeQuickView}>
        <CloseIcon />
      </div>
      <div className="product__info">
        <div className="product__info--item">
          <div className="product__info--title">
            {/* {props.brandName ? [props.brandName] : ""} */}
            [California] Almond
            {/* {props.features ? props.features : ""}{" "} */} Newly updated
            400g
            {/* {props.weight ? props.weight : ""}{" "} */}
          </div>
          <div className="product__info--ratings">
            <RatingsStars ratingsAverage={3.7} ratingsQuantity={12} />
          </div>
          <div className="product__info--price">
            <del className="discounted-price">$48.00</del>
            <h2>$17.28</h2>
            <span className="sale-off">64% Off</span>
          </div>
        </div>
        <div className="product__info--item">
          <p className="description">
            Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra,
            Per Inceptos Himenaeos. Nulla Nibh Diam, Blandit Vel Consequat Nec.
          </p>
        </div>
        <div className="product__info--item">
          <div className="product__info--action">
            <Counter />
            <div className="button add-to-cart">Add To Cart</div>
            <div className="wishlist">
              <svg>
                <use href="/assets/icons/icons.svg#icon-heart"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="product__info--item">
          <div className="product__info--last">
            <h5>
              Category: <span>Vegetables</span>
            </h5>
            <h5>
              Store: <span>Hala Meat & Diary</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = (props: { closeQuickView: () => void }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeQuickView={props.closeQuickView} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <QuickViewOverlay closeQuickView={props.closeQuickView} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default QuickViewModal;
