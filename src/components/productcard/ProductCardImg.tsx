import { useContext, useState } from "react";
import CompareIcon from "../UI/Icons/CompareIcon";
import QuickViewModal from "../modals/QuickViewModal";
import { Link } from "react-router-dom";
import {
  addToCompare,
  addToWishlist,
  removeFromCompare,
  removeFromWishlist,
} from "../../api/user";
import { UserContext } from "../../store/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareIconFull from "../UI/Icons/CompareIconFull";
import { ProductItemTypes } from "../../utils/user-types";

const ProductCardImg = ({ item }: { item: ProductItemTypes }) => {
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const [compareUpdated, setCompareUpdated] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const onToggleWishlist = async () => {
    const added = user?.wishlisted.includes(item._id);
    setWishlistUpdated(true);
    if (added) await removeFromWishlist(dispatch, item._id);
    else await addToWishlist(dispatch, item._id);
    setWishlistUpdated(false);
  };

  const onToggleCompare = async () => {
    const added = user?.compare.includes(item._id);
    setCompareUpdated(true);
    if (added) await removeFromCompare(dispatch, item._id);
    else await addToCompare(dispatch, item._id);
    setCompareUpdated(false);
  };

  return (
    <>
      {showQuickView && (
        <QuickViewModal
          closeModal={() => setShowQuickView(false)}
          item={item}
        />
      )}
      <div className="product-item__img-box">
        <Link to={`/products/${item._id}`}>
          <img
            className="product-item__img"
            src={item.images[0].imageUrl}
            alt=""
          />
          {!item.inStock && (
            <div className="stock-out product-item__stock-out">
              Out of stock
            </div>
          )}
        </Link>
        <div className="favs">
          <button
            className="favs-item"
            onClick={onToggleWishlist}
            disabled={wishlistUpdated && true}
          >
            {user?.wishlisted.includes(item._id) ? (
              <FavoriteIcon className="full-icon" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
          <div className="favs-item" onClick={() => setShowQuickView(true)}>
            <svg>
              <use href="/assets/icons/icons.svg#icon-eye"></use>
            </svg>
          </div>
          <button
            className="favs-item"
            onClick={onToggleCompare}
            disabled={compareUpdated && true}
          >
            {user?.compare.includes(item._id) ? (
              <CompareIconFull />
            ) : (
              <CompareIcon />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardImg;
