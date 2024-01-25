import { useState } from "react";
import ProductActions from "./ProductActions";
import RatingsStars from "../UI/RatingsStars";
import AddProductModal from "../modals/AddProductModal";
import SocialShareModal from "../modals/SocialShareModal";
import Slider from "../UI/Slider";

const images = [
  "/assets/images/products/almond-1.jpeg",
  "/assets/images/products/almond.jpeg",
  "/assets/images/products/chicken-legs-boneless.jpeg",
  "/assets/images/products/chicken-legs.jpeg",
  "/assets/images/products/chicken-breasts.jpeg",
];

const ProductInfo = (props: any) => {
  const [shareModal, setShareModal] = useState(() => false);
  const [addProductModal, setAddProductModal] = useState(() => false);

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
          images={images}
          closeModal={() => setAddProductModal(false)}
        />
      )}
      <div className="product__details">
        <div className="container">
          <div className="product__content">
            <Slider images={images} />
            <div className="product__info">
              <div className="product__info--item">
                <button
                  className="button edit-news"
                  onClick={() => setAddProductModal(!shareModal)}
                  children="Edit Product"
                />
                <div className="product__info--title">
                  <span>
                    {/* {props.brandName ? [props.brandName] : ""} */}
                    [California]
                  </span>
                  Almond
                  <span>
                    {/* {props.features ? props.features : ""}{" "} */}
                    Newly updated 400g
                    {/* {props.weight ? props.weight : ""}{" "} */}
                  </span>
                </div>
                <div className="product__info--ratings">
                  <RatingsStars ratingsAverage={3.7} ratingsQuantity={12} />
                </div>
                <div className="product__info--price">
                  <del className="discounted-price">$48.00</del>
                  <h2>$17.28</h2>
                  <span className="sale-off">64% Off</span>
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
                <p className="description">
                  Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia
                  Nostra, Per Inceptos Himenaeos. Nulla Nibh Diam, Blandit Vel
                  Consequat Nec, Ultrices Et Ipsum. Nulla Varius Magna A
                  Consequat Pulvinar.
                </p>
              </div>
              <ProductActions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
