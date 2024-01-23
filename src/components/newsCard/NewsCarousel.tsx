import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHead from "../UI/SectionHeader";
import NewsCard from ".";

let blogs = [1, 2, 3, 4, 5, 6];

const NewsCarousel = () => {
  return (
    <div className="section-sm">
      <div className="container">
        <SectionHead text="Latest News" />
        <div className="news-carousel">
          <Swiper
            grabCursor={true}
            modules={[Autoplay]}
            slidesPerView="auto"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog} className="news-card-swiper">
                <NewsCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
