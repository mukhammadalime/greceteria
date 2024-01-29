import ReactDOM from "react-dom";
import { useState } from "react";
import SocialShareModal from "./SocialShareModal";

const Backdrop = (props: { closeModal: () => void }) => {
  return (
    <div
      className="modal-container actionsBoxModal-container"
      onClick={() => {
        console.log("BACLDROB CLICKED");
        props.closeModal();
      }}
    />
  );
};

const ActionsBox = ({
  closeModal,
  coordinates,
  onOpenShareModal,
}: {
  closeModal: () => void;
  onOpenShareModal: () => void;
  coordinates: { left: number; top: number };
}) => {
  const [showShareModal, setShowShareModal] = useState(() => false);
  console.log("showShareModal:", showShareModal);

  return (
    <>
      {showShareModal && (
        <SocialShareModal
          closeModal={() => setShowShareModal(false)}
          text={""}
          url={""}
        />
      )}
      <ul
        className="options actionsBoxItems"
        style={{ left: coordinates.left - 100, top: coordinates.top + 25 }}
        onClick={closeModal}
      >
        <li className="options__item">Remove</li>
        <li className="options__item">Add To Wishlist</li>
        <li className="options__item">Add To Cart</li>
        <li className="options__item" onClick={onOpenShareModal}>
          Share Product
        </li>
      </ul>
    </>
  );
};

const ActionsBoxModal = (props: {
  closeModal: () => void;
  onOpenShareModal: () => void;
  coordinates: { left: number; top: number };
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ActionsBox
          closeModal={props.closeModal}
          coordinates={props.coordinates}
          onOpenShareModal={props.onOpenShareModal}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default ActionsBoxModal;
