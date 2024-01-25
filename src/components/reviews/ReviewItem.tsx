import RatingsStars from "../UI/RatingsStars";

const ReviewItem = (props: { time: any }) => {
  return (
    <div className="review">
      <div className="review__top">
        <div className="user-details">
          <div className="user-details__img">
            <img src="/assets/images/users/default.jpg" alt="User" />
          </div>
          <div className="user-details__info">
            <h2>Laure Wilson</h2>
            <div className="product__info--ratings">
              <RatingsStars notRatingsQuantity={true} ratingsAverage={4} />
            </div>
          </div>
        </div>
        <div className="review__top--time">
          <p>{props.time}</p>
        </div>
      </div>
      <p>
        Keep the soil evenly moist for the healthiest growth. If the sun gets
        too hot, Chinese cabbage tends to "bolt" or go to seed; in long periods
        of heat, some kind of shade may be helpful. Watch out for snails, as
        they will harm the plants.
      </p>
    </div>
  );
};

export default ReviewItem;
