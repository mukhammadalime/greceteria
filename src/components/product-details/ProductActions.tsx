import Counter from "../UI/Counter";

const ProductActions = ({
  category,
  store,
  inStock,
}: {
  category: string;
  store: string;
  inStock: boolean;
}) => {
  return (
    <>
      <div className="product__info--item">
        <div className="product__info--action">
          <Counter />
          <button className="button add-to-cart" disabled={!inStock && true}>
            Add To Cart
            <span>
              <svg>
                <use href="/assets/icons/icons.svg#icon-shopping-cart"></use>
              </svg>
            </span>
          </button>
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
            Category: <span>{category}</span>
          </h5>
          <h5>
            Store: <span>{store}</span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
