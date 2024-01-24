import { useState } from "react";
// import AddNewsModal from "../components/modals/AddNewsModal";
import SwiperSlider from "../components/UI/Slider/SwiperSlider";
// import SocialShareModal from "../components/modals/SocialShareModal";

const images = [
  "/assets/images/products/almond-1.jpeg",
  "/assets/images/banner/banner-1.jpeg",
];

const NewsDetails = () => {
  const [shareModal, setShareModal] = useState(() => false);
  // const [addNewsModal, setAddNewsModal] = useState(() => false);

  return (
    <>
      {/* {shareModal && (
        <SocialShareModal text="news" closeModal={() => setShareModal(false)} />
      )} */}
      {/* {addNewsModal && (
        <AddNewsModal
          text="Edit News"
          closeModal={() => setAddNewsModal(false)}
        />
      )} */}
      <div className="section-lg">
        <div className="container">
          <div className="news">
            <div className="news__header">
              <h4>
                <svg>
                  <use href="/assets/icons/icons.svg#icon-bell"></use>
                </svg>
                News
              </h4>
              <span>2 days ago</span>
            </div>
            <SwiperSlider images={images} />
            <div className="news__title">
              <h5>5% discount for Eid al-Adha!</h5>
              <img
                onClick={() => setShareModal(!shareModal)}
                className="news__share"
                src="/assets/icons/share-icon.svg"
                alt=""
              />
            </div>
            <div className="news__text">
              <p>
                Primis molestie bibendum dictum lorem ullamcorper, sem conubia
                libero viverra! Mattis viverra facilisi ante urna laoreet, ac
                etiam per mauris elit viverra. Torquent quis natoque fames
                potenti nostra pretium amet iaculis arcu gravida potenti semper?
              </p>
              <p>
                Tempor aliquam scelerisque felis; penatibus adipiscing per
                sociosqu congue! Parturient nostra metus nullam sollicitudin
                placerat curae; risus. Potenti blandit torquent vivamus velit
                aliquam dui.
              </p>
              <p>
                Sed et dolor risus. Rhoncus dui. Per class sagittis duis elit
                habitant nulla venenatis lacinia ultricies non ultricies!
                Ullamcorper sit aliquet amet urna himenaeos convallis taciti
                ornare placerat nisi semper inceptos. Cursus eget metus vehicula
                ultrices ad scelerisque neque sapien taciti malesuada facilisi.
                Ut in vivamus luctus ullamcorper? Donec class tempus quisque
                neque
              </p>
              <button
                className="button edit-news"
                // onClick={() => setAddNewsModal(true)}
                children="Edit News"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
