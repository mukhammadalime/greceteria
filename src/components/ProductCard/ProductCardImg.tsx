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
  const [wishlistAdded, setWishlistAdded] = useState<boolean>(false);
  const [wishlistRemoved, setWishlistRemoved] = useState<boolean>(false);
  const [compareAdded, setCompareAdded] = useState<boolean>(false);
  const [compareRemoved, setCompareRemoved] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const onToggleWishlist = async () => {
    if (!user?.wishlisted.includes(props.id)) {
      setWishlistAdded(true);
      await addToWishlist(dispatch, props.id, axiosPrivate);
      setWishlistAdded(false);
      return;
    }
    setWishlistRemoved(true);
    await removeFromWishlist(dispatch, props.id, axiosPrivate);
    setWishlistRemoved(false);
  };

  const onToggleCompare = async () => {
    const alreadyAdded = user?.compare.includes(props.id);
    if (!alreadyAdded) {
      setCompareAdded(true);
      await addToCompare(dispatch, props.id, axiosPrivate);
      setCompareAdded(false);
    }
    if (alreadyAdded) {
      setCompareRemoved(true);
      await removeFromCompare(dispatch, props.id, axiosPrivate);
      setCompareRemoved(false);
    }
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
            disabled={(wishlistAdded || wishlistRemoved) && true}
          >
            {(user?.wishlisted.includes(props.id) || wishlistAdded) &&
              !wishlistRemoved && <FavoriteIcon className="full-icon" />}
            {(!user?.wishlisted.includes(props.id) || wishlistRemoved) &&
              !wishlistAdded && <FavoriteBorderIcon />}
          </button>
          <div className="favs-item" onClick={() => setShowQuickView(true)}>
            <svg>
              <use href="/assets/icons/icons.svg#icon-eye"></use>
            </svg>
          </div>
          <button
            className="favs-item"
            onClick={onToggleCompare}
            disabled={(compareAdded || compareRemoved) && true}
          >
            {(user?.compare.includes(props.id) || compareAdded) &&
              !compareRemoved && <CompareIconFull />}
            {(!user?.compare.includes(props.id) || compareRemoved) &&
              !compareAdded && <CompareIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardImg;
