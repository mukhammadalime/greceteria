const WishlistedItem = () => {
  return (
    <div className="wishlist__item">
      <div className="wishlist__item--product">
        <div className="wishlist__item--image">
          <img src="/assets/images/products/almond-1.jpeg" alt="" />
        </div>
        <h5>Beef shank boneless</h5>
      </div>
      <div className="wishlist__item--price">
        <p>
          $14.99 <del>$20.99</del>
        </p>
      </div>
      <div className="wishlist__item--stock">
        <span className="stock-in">in Stock</span>
      </div>
      <div className="wishlist__item--actions">
        <button className="button button-md">Add To Cart</button>
        <div className="delete-item">
          <img src="/assets/icons/delete-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default WishlistedItem;
