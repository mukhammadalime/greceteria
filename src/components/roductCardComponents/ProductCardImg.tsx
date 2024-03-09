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
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import CompareIconFull from "../UI/Icons/CompareIconFull";

const ProductCardImg = (props: {
  image: string;
  inStock: boolean;
  id: string;
}) => {
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const [compareUpdated, setCompareUpdated] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const onToggleWishlist = async () => {
    const added = user?.wishlisted.includes(props.id);
    setWishlistUpdated(true);
    if (added) await removeFromWishlist(dispatch, props.id, axiosPrivate);
    else await addToWishlist(dispatch, props.id, axiosPrivate);
    setWishlistUpdated(false);
  };

  const onToggleCompare = async () => {
    const added = user?.compare.includes(props.id);
    setCompareUpdated(true);
    if (added) await removeFromCompare(dispatch, props.id, axiosPrivate);
    else await addToCompare(dispatch, props.id, axiosPrivate);
    setCompareUpdated(false);
  };

  return (
    <>
      {showQuickView && (
        <QuickViewModal
          closeModal={() => setShowQuickView(false)}
          productId={props.id}
        />
      )}
      <div className="product-item__img-box">
        <Link to={`/products/${props.id}`}>
          <img className="product-item__img" src={props.image} alt="" />
          {!props.inStock && (
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
            {user?.wishlisted.includes(props.id) ? (
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
            {user?.compare.includes(props.id) ? (
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
