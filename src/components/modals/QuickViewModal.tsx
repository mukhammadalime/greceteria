import ReactDOM from "react-dom";
import Counter from "../UI/Counter";
import CloseIcon from "../UI/Icons/CloseIcon";
import RatingsStars from "../UI/RatingsStars";
import { ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import { useContext } from "react";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const QuickViewOverlay = ({ closeModal, productId }: QuickViewModalProps) => {
  const {
    state: { products },
  } = useContext(ProductContext);

  const product = products.find(
    (item) => item.id === productId
  ) as ProductItemTypes;

  let discountPercent: number = 0;
  if (product.discountedPrice > 0) {
    const priceGap = product.price - product.discountedPrice;
    discountPercent = priceGap / (product.price / 100);
  }

  return (
    <div className="quick-view">
      <div className="quick-view__close" onClick={closeModal}>
        <CloseIcon />
      </div>
      <div className="product__info">
        <div className="product__info--item">
          <div className="product__info--title">
            {product.brandName ? `[${product.brandName}]` : ""} {product.name}{" "}
            {product.features ? product.features : ""}{" "}
            {product.weight ? product.weight : ""}
          </div>
          <div className="product__info--ratings">
            <RatingsStars
              ratingsAverage={product.ratingsAverage}
              ratingsQuantity={product.ratingsQuantity}
            />
          </div>
          <div className="product__info--price">
            {product.discountedPrice > 0 && (
              <>
                <del className="discounted-price">
                  ${product.price.toFixed(2)}
                </del>
                <h2>${product.discountedPrice.toFixed(2)}</h2>
                <span className="sale-off">
                  {Math.round(discountPercent)}% Off
                </span>
              </>
            )}

            {!product.discountedPrice && <h2>${product.price}</h2>}
          </div>
        </div>
        <div className="product__info--item">
          <p className="description">{product.description}</p>
        </div>
        <div className="product__info--item">
          <div className="product__info--action">
            <Counter id={productId} inStock={product.inStock} />

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
              Category: <span>{product.category.name}</span>
            </h5>
            <h5>
              Store: <span>{product.store}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ closeModal, productId }: QuickViewModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <QuickViewOverlay closeModal={closeModal} productId={productId} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface QuickViewModalProps {
  closeModal: () => void;
  productId: string;
}

export default QuickViewModal;
