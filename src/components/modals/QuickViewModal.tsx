import ReactDOM from "react-dom";
import Counter from "../UI/Counter";
import CloseIcon from "../UI/Icons/CloseIcon";
import RatingsStars from "../UI/RatingsStars";
import { ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import { useContext, useState } from "react";
import { addToWishlist, removeFromWishlist } from "../../api/user";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const QuickViewOverlay = ({ closeModal, productId }: QuickViewModalProps) => {
  const {
    state: { products },
  } = useContext(ProductContext);
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const product = products?.find(
    (i) => i._id === productId
  ) as ProductItemTypes;

  /// Calculate discountPercent
  let discountPercent: number = 0;
  if (product.discountedPrice > 0) {
    const priceGap = product.price - product.discountedPrice;
    discountPercent = priceGap / (product.price / 100);
  }

  const onToggleWishlist = async () => {
    const added = state.user?.wishlisted.includes(productId);
    setWishlistUpdated(true);
    if (added) await removeFromWishlist(dispatch, productId, axiosPrivate);
    else await addToWishlist(dispatch, productId, axiosPrivate);
    setWishlistUpdated(false);
  };

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

            <button
              className="wishlist"
              onClick={onToggleWishlist}
              disabled={wishlistUpdated && true}
            >
              {state.user?.wishlisted.includes(productId) ? (
                <FavoriteIcon className="full-icon" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
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
