import { useContext, useState } from "react";
import ProductActions from "./ProductActions";
import RatingsStars from "../UI/RatingsStars";
import AddProductModal from "../modals/AddProductModal";
import SocialShareModal from "../modals/SocialShareModal";
import Slider from "../UI/Slider";
import { AuthContext } from "../../store/AuthContext";
import { ProductItemTypes } from "../../utils/user-types";
import { CategoryContext } from "../../store/CategoryContext";

const ProductInfo = ({ product }: { product: ProductItemTypes }) => {
  const { state } = useContext(AuthContext);
  const {
    state: { categories },
  } = useContext(CategoryContext);
  const [shareModal, setShareModal] = useState(() => false);
  const [addProductModal, setAddProductModal] = useState(() => false);

  let discountedPrice: number = 0;
  if (product.discountPercent) {
    discountedPrice =
      product.price - (product.price / 100) * product.discountPercent;
  }

  return (
    <>
      {shareModal && (
        <SocialShareModal
          text="product"
          closeModal={() => setShareModal(false)}
          url={""}
        />
      )}
      {addProductModal && (
        <AddProductModal
          text="Edit Product"
          images={product.images}
          closeModal={() => setAddProductModal(false)}
          product={product}
          categoryOptions={categories.map((i) => {
            return { name: i.name, id: i._id };
          })}
        />
      )}

      <div className="product__details">
        <div className="container">
          <div className="product__content">
            <Slider images={product.images} inStock={product.inStock} />
            <div className="product__info">
              <div className="product__info--item">
                {state.user && state.user.role !== "user" && (
                  <button
                    className="button edit-news"
                    onClick={() => setAddProductModal(!shareModal)}
                    children="Edit Product"
                  />
                )}
                <div className="product__info--title">
                  {product.brandName ? `[${product.brandName}]` : ""}{" "}
                  {product.name} {product.features ? product.features : ""}{" "}
                  {product.weight ? product.weight : ""}
                </div>
                <div className="product__info--ratings">
                  <RatingsStars
                    ratingsAverage={product.ratingsAverage}
                    ratingsQuantity={product.ratingsQuantity}
                  />
                </div>
                <div className="product__info--price">
                  {product.discountPercent && (
                    <>
                      <del className="discounted-price">
                        ${product.price.toFixed(2)}
                      </del>
                      <h2>${discountedPrice.toFixed(2)}</h2>
                      <span className="sale-off">
                        {product.discountPercent}% Off
                      </span>
                    </>
                  )}

                  {!product.discountPercent && <h2>${product.price}</h2>}
                </div>
              </div>
              <div className="product__info--item">
                <div className="product__info--share">
                  <span>Share product: </span>
                  <img
                    onClick={() => setShareModal(!shareModal)}
                    className="news__share"
                    src="/assets/icons/share-icon.svg"
                    alt=""
                  />
                </div>
                <p className="description">{product.description}</p>
              </div>
              <ProductActions
                category={product.category.name}
                store={product.store}
                inStock={product.inStock}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
