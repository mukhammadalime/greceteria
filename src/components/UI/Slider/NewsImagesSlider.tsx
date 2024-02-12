import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const NewsImagesSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper className="news-slider" pagination={true} modules={[Pagination]}>
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img className="news__image" src={image} alt=""></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewsImagesSlider;
