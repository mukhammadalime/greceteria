import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./productCard";
import SectionHead from "./UI/SectionHeader";

const products = [
  {
    name: "Chicken legs boneless",
    price: 11.9,
    weight: "2kg",
    brandName: "Seara",
    description:
      "Halal - Produced in Brazil. Best quality and delicious boneless chicken legs that can be cooked in any kind of meal. Frozen and vocuum packed",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    discountedPrice: 0,
    images: ["chicken-legs-boneless.jpeg"],
    inStock: true,
  },
  {
    name: "Chicken legs",
    price: 9.98,
    weight: "2kg",
    brandName: "Seara",
    description:
      "Halal - Produced in Brazil under  Seara/Aurora brand. Best quality and delicious chicken legs that can be cooked in any kind of meal. Frozen and vocuum packed",
    discountedPrice: 8.5,
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["chicken-legs.jpeg"],
    inStock: true,
  },
  {
    name: "Chicken breasts",
    price: 4.98,
    weight: "2kg",
    brandName: "Seara",
    description:
      "Halal - Produced in Brazil under  Seara/Aurora brand. Best quality and delicious chicken legs that can be cooked in any kind of meal. Frozen and vocuum packed",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["chicken-breasts.jpeg"],
    inStock: true,

    discountedPrice: 0,
  },
  {
    name: "Lamb liver",
    price: 8.98,
    weight: "1kg",
    description: "Halal - Produced in Australia. Lamb liver",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["lamb-liver.jpeg"],
    inStock: true,
    discountedPrice: 0,
  },
  {
    name: "Beef shank boneless",
    price: 16.9,
    weight: "1kg",
    description:
      "Halal - Produced in Australia. Sem porttitor purus magnis elit vivamus, cum metus praesent iaculis aenean. Maecenas egestas cursus orci.",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["beef-shank.jpeg", "beef-shank-1.jpeg"],
    inStock: true,
    discountedPrice: 0,
  },
  {
    name: "Beef chuck boneless",
    price: 12.9,
    weight: "1kg",
    description:
      "Halal - Produced in Australia. Sem porttitor purus magnis elit vivamus, cum metus praesent iaculis aenean. Maecenas egestas cursus orci.",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["beef-chuck.jpeg", "beef-chuck-1.jpeg"],
    inStock: true,
    discountedPrice: 0,
  },
  {
    name: "Minced beef",
    price: 8.98,
    weight: "1kg",
    description:
      "Halal - Produced in Australia. Sem porttitor purus magnis elit vivamus, cum metus praesent iaculis aenean. Maecenas egestas cursus orci.",
    category: "62a4c9163d46fd1d2a641620",
    store: "Halal Meat & Diary",
    images: ["minced-beef.jpeg", "minced-beef-1.jpeg"],
    discountedPrice: 0,
    inStock: false,
  },
  {
    name: "Qazi",
    price: 9.98,
    features: "raw",
    weight: "400g",
    brandName: "Lazzat Food",
    description:
      "Sem porttitor purus magnis elit vivamus, cum metus praesent iaculis aenean. Maecenas egestas cursus orci.",
    category: "62a4ccdcefc9c7de10e48efb",
    store: "Halal Meat & Diary",
    images: ["horse-meat-sausage.jpeg", "horse-meat-sausage-1.jpeg"],
    inStock: true,
    discountedPrice: 0,
  },
];

const CustomProductsCarousel = ({ text }: { text: string }) => {
  return (
    <div className="section-sm">
      <div className="container">
        <SectionHead text={text} />
        <div className="all-products">
          <Swiper
            grabCursor={true}
            modules={[Autoplay]}
            slidesPerView="auto"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.name} style={{ width: "24rem" }}>
                <ProductCard
                  key={product.name}
                  images={product.images}
                  discountPrice={product.discountedPrice}
                  price={product.price}
                  name={product.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CustomProductsCarousel;
