import { useState } from "react";
import ReviewItem from "./ReviewItem";
import HoverRating from "../product-details/HoverRating";
import ShippingPolicy from "../product-details/ShippingPolicy";
import { ReviewItemTypes } from "../../utils/user-types";

const ReviewsList = ({ reviews }: { reviews: ReviewItemTypes[] }) => {
  const [toggleContent, setToggleContent] = useState(() => "Reviews");

  return (
    <div className="reviews">
      <div className="reviews__header">
        <div className="container">
          <h4
            className={`${toggleContent === "Reviews" && "active-content"}`}
            onClick={() => setToggleContent("Reviews")}
            children="Customer feedbacks"
          />
          <h4
            className={`${toggleContent === "Shipping" && "active-content"}`}
            onClick={() => setToggleContent("Shipping")}
            children="Shipping Policy"
          />
        </div>
      </div>
      {toggleContent === "Reviews" && (
        <div className="reviews__main">
          <div className="container">
            <div className="reviews">
              {reviews.length > 0 &&
                reviews.map((item) => (
                  <ReviewItem review={item} key={item._id} />
                ))}
              {reviews.length === 0 && (
                <div className="reviews__empty">
                  <h2>No reviews yet</h2>
                </div>
              )}
            </div>
            <div className="add-review input">
              <label htmlFor="review">Add Review</label>
              <HoverRating />
              <textarea
                id="review"
                placeholder="Please share your experience..."
              />
              <button className="button button-md">Post Review</button>
            </div>
          </div>
        </div>
      )}

      {toggleContent === "Shipping" && <ShippingPolicy />}
    </div>
  );
};

export default ReviewsList;
