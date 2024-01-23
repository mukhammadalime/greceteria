import CompareIcon from "../UI/Icons/CompareIcon";

const ProductCardImg = (props: { image: string }) => {
  return (
    <>
      <div className="product-item__img-box">
        <div>
          <img
            className="product-item__img"
            src={`/assets/images/products/${props.image}`}
            alt=""
          />
          {/* <div className="stock-out product-item__stock-out">Out of stock</div> */}
        </div>
        <div className="favs">
          <div className="favs-item">
            <svg>
              <use href="/assets/icons/icons.svg#icon-heart"></use>
            </svg>
          </div>
          <div className="favs-item">
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
