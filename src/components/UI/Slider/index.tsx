import { useState } from "react";
import SilderButton from "./SilderButton";

export default function Slider({
  images,
  inStock,
}: {
  images: { imageUrl: string; cloudinaryId: string; _id: string }[];
  inStock: boolean;
}) {
  const [slideIndex, setSlideIndex] = useState(() => 0);

  const nextSlide = () => {
    const newIndex = slideIndex === images.length - 1 ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = slideIndex === 0 ? images.length - 1 : slideIndex - 1;
    setSlideIndex(newIndex);
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className="product__gallery">
      {images.map((image, index) => {
        return (
          <div
            key={image._id}
            className={slideIndex === index ? "slide active-anim" : "slide"}
          >
            {!inStock && (
              <span className="stock-out slide__stock-out">Out of Stock</span>
            )}
            <img
              className="gallery-image"
              src={image.imageUrl}
              alt=""
              draggable={false}
            />
          </div>
        );
      })}
      {images.length !== 1 && (
        <>
          <SilderButton moveSlide={nextSlide} direction={"next"} />
          <SilderButton moveSlide={prevSlide} direction={"prev"} />
        </>
      )}

      {images.length !== 1 && (
        <div className="container-dots">
          {Array.from({ length: images.length }).map((_, index) => (
            <div
              key={index}
              onClick={() => moveDot(index)}
              className={slideIndex === index ? "dot active" : "dot"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
