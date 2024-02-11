import { ReviewItemTypes } from "../../utils/user-types";
import RatingsStars from "../UI/RatingsStars";

const ReviewItem = ({ review }: { review: ReviewItemTypes }) => {
  console.log("review:", review);
  return (
    <div className="review">
      <div className="review__top">
        <div className="user-details">
          <div className="user-details__img">
            <img src={review.user.photo} alt="User" />
          </div>
          <div className="user-details__info">
            <h2>{review.user.name}</h2>
            <div className="product__info--ratings">
              <RatingsStars
                notRatingsQuantity={true}
                ratingsAverage={review.rating}
              />
            </div>
          </div>
        </div>
        <div className="review__top--time">
          <p></p>
        </div>
      </div>
      <p>{review.review}</p>
    </div>
  );
};

export default ReviewItem;
