import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RightArrowIcon from "./UI/Icons/RightArrowIcon";
import { Link } from "react-router-dom";

const CategoryItems = [
  {
    id: 1,
    image: "/assets/images/categories/icon-drinks.png",
    name: "Water and Drinks",
    quantity: 24,
  },
  {
    id: 2,
    image: "/assets/images/categories/icon-fruits.png",
    name: "Fresh Fruit",
    quantity: 35,
  },
  {
    id: 3,
    image: "/assets/images/categories/icon-meat.png",
    name: "Meat Products",
    quantity: 12,
  },
  {
    id: 4,
    image: "/assets/images/categories/icon-vegetable.png",
    name: "Vegetables",
    quantity: 17,
  },
  {
    id: 5,
    image: "/assets/images/categories/image-oil.png",
    name: "Oil",
    quantity: 3,
  },
  {
    id: 6,
    image: "/assets/images/categories/icon-drinks.png",
    name: "Water and Drinks",
    quantity: 24,
  },
  {
    id: 7,
    image: "/assets/images/categories/image-soda.png",
    name: "Soda",
    quantity: 14,
  },
  {
    id: 8,
    image: "/assets/images/categories/image-icon-beauty.png",
    name: "Beauty",
    quantity: 14,
  },
  {
    id: 9,
    image: "/assets/images/categories/image-icon-snaks.png",
    name: "Snacks",
    quantity: 14,
  },
];

const Categories = () => {
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
            {CategoryItems.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="category__item">
                  <img src={category.image} alt="" />
                  <h5>{category.name}</h5>
                  <div className="quantity">{category.quantity} Products</div>
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
