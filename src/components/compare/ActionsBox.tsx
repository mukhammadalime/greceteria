import { useRef, useState } from "react";
import ActionsBoxModal from "../modals/ActionsBoxModal";
import SocialShareModal from "../modals/SocialShareModal";

const ActionsBox = () => {
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showActionsBox, setShowActionsBox] = useState<boolean>(() => false);
  const [showShareModal, setShowShareModal] = useState<boolean>(() => false);
  const [coordinates, setCoordinates] = useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });

  const onToggleActionsBoxHandler = () => {
    setShowActionsBox((prevState) => !prevState);
    if (showActionsBox) return;

    const optionsBox = document.querySelector(".options-box")!;
    const optionsBoxPosition = optionsBox.getBoundingClientRect();
    const coordinates = {
      left: optionsBoxPosition.left,
      top: optionsBoxPosition.top,
    };
    setCoordinates(coordinates);
  };

  return (
    <>
      {showActionsBox && (
        <ActionsBoxModal
          closeModal={() => setShowActionsBox(false)}
          coordinates={coordinates}
          onOpenShareModal={() => setShowShareModal(true)}
        />
      )}

      {showShareModal && (
        <SocialShareModal
          closeModal={() => setShowShareModal(false)}
          text={""}
          url={""}
        />
      )}
      <div className={`options-box${showActionsBox ? " options-open" : ""}`}>
        <div
          className={`options-box__icon${
            showActionsBox ? " options-box__icon-open" : ""
          }`}
          onClick={onToggleActionsBoxHandler}
          ref={btnRef}
        >
          <img src="/assets/icons/three-dots.svg" alt="" ref={imgRef} />
        </div>
      </div>
    </>
  );
};

export default ActionsBox;
