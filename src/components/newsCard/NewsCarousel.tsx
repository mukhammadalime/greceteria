import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHead from "../UI/SectionHeader";
import NewsCard from "./NewsCard";
import { NewsItemTypes } from "../../utils/user-types";
import NewsItemSkeleton from "../../skeletons/NewsItemSkeleton";

const NewsCarousel = ({
  news,
  loading,
}: {
  news: NewsItemTypes[] | null;
  loading: boolean;
}) => {
  if ((!news || news.length === 0) && !loading) return <></>;

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
            {loading ? (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <SwiperSlide key={i} className="news-card-swiper">
                    <NewsItemSkeleton />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                {news?.map((item: NewsItemTypes) => (
                  <SwiperSlide key={item._id} className="news-card-swiper">
                    <NewsCard newsItem={item} />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
