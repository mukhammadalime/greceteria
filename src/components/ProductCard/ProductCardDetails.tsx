import RatingsStars from "../UI/RatingsStars";

const ProductCardDetails = (props: {
  name: string;
  discountedPrice: number;
  price: number;
}) => {
  return (
    <>
      <div className="product-item__details">
        <div className="product-item__info">
          <h6 className="name">{props.name}</h6>
          <div className="product-item__ratings">
            <RatingsStars ratingsAverage={4} notRatingsQuantity={true} />
          </div>
          <div className="price">
            {props.discountedPrice ? (
              <>
                <span className="discounted-price">
                  ${props.discountedPrice.toFixed(2)}
                </span>
                <del className="actual-price">${props.price.toFixed(2)}</del>
              </>
            ) : (
              <span className="discounted-price">
                ${props.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="product-item__actions">
          <div className="counter counter-s">
            <div className="decrement">-</div>
            <div className="input">0</div>
            <div className="increment">+</div>
          </div>
          <div className="add-to-cart">Add To Cart</div>
        </div>
      </div>
    </>
  );
};

export default ProductCardDetails;
