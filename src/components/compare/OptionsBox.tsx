import { useRef, useState } from "react";
import SocialShareModal from "../modals/SocialShareModal";

const OptionsBox = () => {
  const [showShareModal, setShowShareModal] = useState(() => false);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showOptions, setShowOptions] = useState<boolean>(() => false);

  return (
    <>
      {showShareModal && (
        <SocialShareModal
          closeModal={() => setShowShareModal(false)}
          text={""}
          url={""}
        />
      )}
      <div
        className={`options-box ${showOptions && "options-open"}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div
          className="options-box__icon"
          onClick={() => setShowOptions(!showOptions)}
          ref={btnRef}
        >
          <img src="/assets/icons/three-dots.svg" alt="" ref={imgRef} />
        </div>
        <ul
          className="options options-list"
          onClick={() => setShowOptions(!showOptions)}
        >
          <li className="options__item">Remove</li>
          <li className="options__item">Add To Wishlist</li>
          <li className="options__item">Add To Cart</li>
          <li className="options__item" onClick={() => setShowShareModal(true)}>
            Share Product
          </li>
        </ul>
      </div>
    </>
  );
};

export default OptionsBox;
