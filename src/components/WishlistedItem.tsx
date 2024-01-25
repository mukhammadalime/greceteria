const WishlistedItem = () => {
  return (
    <div className="wishlist__item">
      <div className="table-1">
        <div className="table__img">
          <img src="/assets/images/products/almond-1.jpeg" alt="" />
        </div>
        <h5>Almond</h5>
      </div>
      <div className="table-2">
        <p>
          $14.99 <del>$20.99</del>
        </p>
      </div>
      <div className="table-3">
        <span className="stock-in">in Stock</span>
      </div>
      <div className="table-4">
        <button className="button button-md">Add To Cart</button>
        <div className="delete-item">
          <img src="/assets/icons/delete-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default WishlistedItem;
