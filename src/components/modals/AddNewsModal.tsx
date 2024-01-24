import { useState } from "react";
import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import UploadImages from "./UploadImages";
import TextInput from "../UI/Inputs/TextInput";
import nextId from "react-id-generator";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddNewsOverlay = (props: {
  closeModal: () => void;
  images?: string[];
  text: string;
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[] | []>(() =>
    props.images ? props.images : []
  );
  const [paragraphs, setParagraphs] = useState(() => 0);

  const onSelectFile = (e: Event) => {
    const selectedFiles = (e.target as HTMLInputElement).files!;
    let imagesArray: string[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      imagesArray.push(URL.createObjectURL(selectedFiles[i]));
    }

    setUploadedImages((prevState) => [...prevState, ...imagesArray]);
  };

  return (
    <div className="add-product-form add-news-form">
      <div className="address-form__header">{props.text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput label="News title*" placeholder="Title" />
        </div>
        <div className="form-inputs">
          <div className="input">
            <label htmlFor="paragraph">
              Paragraphs* <span>(at least 1)</span>
            </label>
            <textarea id="paragraph" placeholder="Paragraph text" />
            {Array.from({ length: paragraphs }).map((i) => (
              <div className="textarea" key={nextId()}>
                <textarea placeholder="Paragraph text" />
                <div
                  className="add-paragraph"
                  onClick={() => setParagraphs(paragraphs - 1)}
                >
                  <img
                    src="/assets/icons/remove-icon.svg"
                    alt=""
                    draggable={false}
                  />
                </div>
              </div>
            ))}
            <div
              className="add-paragraph"
              onClick={() => setParagraphs(paragraphs + 1)}
            >
              <img src="/assets/icons/add-icon.svg" alt="" draggable={false} />
            </div>
          </div>
        </div>
        <UploadImages onChange={onSelectFile} />

        {uploadedImages.length > 10 && <h3>You can upload up to 10 images!</h3>}
        {uploadedImages.length > 0 && (
          <div className="uploaded">
            {uploadedImages.map((img: string) => (
              <div className="uploaded__item" key={img}>
                <button
                  onClick={() =>
                    setUploadedImages(
                      uploadedImages.filter((e: string) => e !== img)
                    )
                  }
                  children="Remove"
                />
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <ModalActions closeModal={props.closeModal} text={props.text} />
    </div>
  );
};

const AddNewsModal = (props: {
  closeModal: () => void;
  images?: string[];
  text: string;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddNewsOverlay
          closeModal={props.closeModal}
          images={props.images}
          text={props.text}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddNewsModal;
