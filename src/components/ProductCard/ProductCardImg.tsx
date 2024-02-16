import { useContext, useState } from "react";
import CompareIcon from "../UI/Icons/CompareIcon";
import QuickViewModal from "../modals/QuickViewModal";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../api/user";
import { UserContext } from "../../store/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../store/AuthContext";

const ProductCardImg = (props: {
  image: string;
  inStock: boolean;
  id: string;
}) => {
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);
  const { state: userState, dispatch } = useContext(UserContext);
  const { state } = useContext(AuthContext);

  const onAddToWishlist = async () => {
    const alreadyAdded = state.user?.wishlisted.includes(props.id);
    if (userState.wishlistUpdateLoading) return;
    if (!alreadyAdded) await addToWishlist(dispatch, props.id);
    if (alreadyAdded) await removeFromWishlist(dispatch, props.id);
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
          <div className="favs-item" onClick={onAddToWishlist}>
            {state.user?.wishlisted.includes(props.id) ? (
              <FavoriteIcon className="full-icon" />
            ) : (
              <FavoriteBorderIcon />
            )}
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
