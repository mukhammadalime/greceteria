import ProductCardDetails from "./ProductCardDetails";
import ProductCardImg from "./ProductCardImg";

interface ProductCardItemTypes {
  images: { imageUrl: string; cloudinaryId: string; _id: string }[];
  name: string;
  discountPercent: number;
  price: number;
  inStock: boolean;
  id: string;
}

const ProductCard = (props: ProductCardItemTypes) => {
  return (
    <div className="product-item">
      <ProductCardImg
        image={props.images[0].imageUrl}
        inStock={props.inStock}
        id={props.id}
      />
      <ProductCardDetails
        name={props.name}
        price={props.price}
        discountPercent={props.discountPercent}
        inStock={props.inStock}
      />
    </div>
  );
};

export default ProductCard;
