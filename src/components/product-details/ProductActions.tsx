import Counter from "../UI/Counter";

const ProductActions = ({
  category,
  store,
  inStock,
  id,
}: ProductActionsProps) => {
  return (
    <>
      <div className="product__info--item">
        <div className="product__info--action">
          <Counter id={id} inStock={inStock} cartIcon />

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

interface ProductActionsProps {
  category: string;
  store: string;
  inStock: boolean;
  id: string;
}

export default ProductActions;
