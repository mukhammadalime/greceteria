import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHead from "../UI/SectionHeader";
import NewsCard from ".";
import { NewsItemTypes } from "../../utils/user-types";

const NewsCarousel = ({ news }: { news: NewsItemTypes[] }) => {
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
            {news.map((item: NewsItemTypes) => (
              <SwiperSlide key={item._id} className="news-card-swiper">
                <NewsCard newsItem={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
