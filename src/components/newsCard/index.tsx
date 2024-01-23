import RightArrowIcon from "../UI/Icons/RightArrowIcon";

const NewsCard = () => {
  return (
    <div className="news-card">
      <div className="news-card__img-box">
        <div>
          <img
            className="news-card__img"
            src="/assets/images/banner/banner-1.jpeg"
            alt=""
          />
        </div>
        <div className="date">
          <h3>06</h3>
          <span>Aug</span>
        </div>
      </div>
      <div className="news-card__content">
        <p>
          Curabitur porttitor orci eget neque accumsan venenatis. Nunc
          fermentum.
        </p>
        <div className="view-all">
          Read More
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
