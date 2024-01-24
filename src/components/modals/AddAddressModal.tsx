import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import TextInput from "../UI/Inputs/TextInput";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddAddressOverlay = (props: { text: string; closeModal: () => void }) => {
  return (
    <div className="address-form">
      <div className="address-form__header">{props.text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput label="Your name*" placeholder="Your name" />
          <TextInput
            type="tel"
            label="Receiver telephone*"
            placeholder="Receiver telephone"
          />
        </div>
        <div className="form-inputs">
          <TextInput label="Your city*" placeholder="Your city" />
          <TextInput label="Postal code*" placeholder="Postal code" />
        </div>
        <div className="form-inputs">
          <TextInput label="Address*" placeholder="Receiver address" />
        </div>
        <div className="form-inputs">
          <TextInput
            span={<span>(Optional)</span>}
            label="Additional address"
            placeholder="Additional address"
          />
        </div>
      </div>
      <ModalActions closeModal={props.closeModal} text={props.text} />
    </div>
  );
};

const AddAddressModal = (props: { text: string; closeModal: () => void }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddAddressOverlay text={props.text} closeModal={props.closeModal} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddAddressModal;
