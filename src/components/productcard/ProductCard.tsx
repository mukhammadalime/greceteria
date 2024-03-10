import { ProductItemTypes } from "../../utils/user-types";
import ProductCardDetails from "./ProductCardMain";
import ProductCardImg from "./ProductCardImg";

const ProductCard = ({ item }: { item: ProductItemTypes }) => {
  return (
    <div className="product-item">
      <ProductCardImg
        image={item.images[0].imageUrl}
        inStock={item.inStock}
        id={item._id}
      />
      <ProductCardDetails
        name={item.name}
        price={item.price}
        discountedPrice={item.discountedPrice}
        inStock={item.inStock}
        ratingsAverage={item.ratingsAverage}
        id={item._id}
      />
    </div>
  );
};

export default ProductCard;
