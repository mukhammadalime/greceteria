import Counter from "../UI/Counter";

const ProductActions = () => {
  return (
    <>
      <div className="product__info--item">
        <div className="product__info--action">
          <Counter />
          <div className="button add-to-cart">
            Add To Cart
            <span>
              <svg>
                <use href="/assets/icons/icons.svg#icon-shopping-cart"></use>
              </svg>
            </span>
          </div>
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
            Store: <span>MK Grocery</span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
