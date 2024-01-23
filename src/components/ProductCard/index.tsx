import ProductCardDetails from "./ProductCardDetails";
import ProductCardImg from "./ProductCardImg";

interface ProductItemTypes {
  images: string[];
  name: string;
  discountPrice: number;
  price: number;
}

const ProductCard = (props: ProductItemTypes) => {
  return (
    <div className="product-item">
      <ProductCardImg image={props.images[0]} />
      <ProductCardDetails
        name={props.name}
        price={props.price}
        discountedPrice={props.discountPrice}
      />
    </div>
  );
};

export default ProductCard;
