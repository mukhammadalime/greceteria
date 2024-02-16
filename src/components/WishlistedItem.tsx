const WishlistedItem = ({
  name,
  price,
  discountedPrice,
  inStock,
  image,
  id,
}: WishlistedItemProps) => {
  return (
    <div className="wishlist__item">
      <div className="wishlist__item--product">
        <div className="wishlist__item--image">
          <img src={image} alt="" />
        </div>
        <h5>{name}</h5>
      </div>
      <div className="wishlist__item--price">
        <p>
          ${price.toFixed(2)}{" "}
          {discountedPrice && <del>${discountedPrice.toFixed(2)}</del>}
        </p>
      </div>
      <div className="wishlist__item--stock">
        {inStock && <span className="stock-in">in Stock</span>}
        {!inStock && <span className="stock-out">out of stock</span>}
      </div>
      <div className="wishlist__item--actions">
        <button className="button button-md" disabled={!inStock && true}>
          Add To Cart
        </button>
        <div className="delete-item">
          <img src="/assets/icons/delete-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

interface WishlistedItemProps {
  name: string;
  price: number;
  discountedPrice: number;
  inStock: boolean;
  image: string;
  id: string;
}

export default WishlistedItem;
