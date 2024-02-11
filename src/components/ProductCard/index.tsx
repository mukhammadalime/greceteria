import { ProductItemTypes } from "../../utils/user-types";
import ProductCardDetails from "./ProductCardDetails";
import ProductCardImg from "./ProductCardImg";

const ProductCard = ({ item }: { item: ProductItemTypes }) => {
  return (
    <div className="product-item">
      <ProductCardImg
        image={item.images[0].imageUrl}
        inStock={item.inStock}
        id={item.id}
      />
      <ProductCardDetails
        name={item.name}
        price={item.price}
        discountPercent={item.discountPercent}
        inStock={item.inStock}
        ratingsAverage={item.ratingsAverage}
      />
    </div>
  );
};

export default ProductCard;
