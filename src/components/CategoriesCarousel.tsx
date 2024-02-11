import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RightArrowIcon from "./UI/Icons/RightArrowIcon";
import { Link } from "react-router-dom";
import { CategoryItemTypes } from "../utils/user-types";

const Categories = ({ categories }: { categories: CategoryItemTypes[] }) => {
  return (
    <div className="section-md category">
      <div className="container">
        <div
          className="section__head"
          style={{ justifyContent: "space-between" }}
        >
          <h2>Shop By Categories</h2>
          <Link to="/shop" className="view-all">
            View All
            <RightArrowIcon />
          </Link>
        </div>
        <div className="category__main">
          <Swiper
            grabCursor={true}
            modules={[Autoplay]}
            slidesPerView="auto"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            draggable={true}
          >
            {categories.map((category: CategoryItemTypes) => (
              <SwiperSlide key={category._id}>
                <div className="category__item">
                  <img src={category.image.imageUrl} alt="" />
                  <h5>{category.name}</h5>
                  <div className="quantity">
                    {category.numberOfProducts} Products
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Categories;
