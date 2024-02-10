import { useState } from "react";
import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import TextInput from "../UI/Inputs/TextInput";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddCategoryOverlay = (props: {
  image: string;
  text: string;
  closeModal: () => void;
}) => {
  const [uploadedImage, setUploadedImage] = useState(() =>
    props.image ? props.image : ""
  );

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = URL.createObjectURL((e.target as HTMLInputElement).files![0]);

    setUploadedImage(image);
  };

  return (
    <div className="add-product-form ">
      <div className="address-form__header">{props.text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput label="Category Name*" placeholder="Category Name" />
        </div>
        <div className="upload-image">
          <span>
            <img src="/assets/icons/upload-icon.svg" alt="" />
          </span>
          <p>Drag your image here (only 1)</p>
          <em>(Only *.jpeg, *.jpg and *.png images will be accepted.)</em>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            disabled={uploadedImage ? true : false}
            onChange={onSelectFile}
          />
        </div>
        {uploadedImage && (
          <div className="uploaded">
            <div className="uploaded__item">
              <button children="Remove" onClick={() => setUploadedImage("")} />
              <img src={uploadedImage} alt="" />
            </div>
          </div>
        )}
      </div>
      {/* <ModalActions text={props.text} closeModal={props.closeModal} /> */}
    </div>
  );
};

const AddCategoryModal = (props: {
  closeModal: () => void;
  image: string;
  text: string;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddCategoryOverlay
          closeModal={props.closeModal}
          image={props.image}
          text={props.text}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddCategoryModal;
