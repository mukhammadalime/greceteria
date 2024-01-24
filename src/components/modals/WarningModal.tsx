import ReactDOM from "react-dom";
import CloseIcon from "../UI/Icons/CloseIcon";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const WarningOverlay = (props: { closeModal: () => void; text: string }) => {
  return (
    <div className="warning">
      <div className="warning__header">
        <h3>Confirm</h3>
        <div className="warning__close" onClick={props.closeModal}>
          <CloseIcon />
        </div>
      </div>
      <h2>{props.text}</h2>
      <div className="warning__bottom">
        <button className="button" onClick={props.closeModal}>
          Confirm
        </button>
        <button className="button" onClick={props.closeModal}>
          No, thanks
        </button>
      </div>
    </div>
  );
};

const WarningModal = (props: { closeModal: () => void; text: string }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <WarningOverlay closeModal={props.closeModal} text={props.text} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default WarningModal;
