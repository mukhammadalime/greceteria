import ReactDOM from "react-dom";
import { useState } from "react";
import ModalActions from "./ModalActions";
import UploadImages from "./UploadImages";
import TextInput from "../UI/Inputs/TextInput";
import FilterOptions from "../UI/FilterOptions";

const categoryOptions = [
  "Water and Drinks",
  "Fresh Fruit",
  "Meat Products",
  "Vegetables",
  "Oil",
  "Soda",
  "Snacks",
  "Beauty",
];

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddProductOverlay = (props: {
  closeModal: () => void;
  images: string[];
  text: string;
}) => {
  const [uploadedImages, setUploadedImages] = useState(() =>
    props.images ? props.images : []
  );
  const [selectCategoryOpen, setSelectCategoryOpen] = useState(false);

  const onSelectFile = (e: any) => {
    const selectedFiles = (e.target as HTMLInputElement).files!;
    let imagesArray: string[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      imagesArray.push(URL.createObjectURL(selectedFiles[i]));
    }

    setUploadedImages((prevState) => [...prevState, ...imagesArray]);
  };

  return (
    <div className="add-product-form">
      <div className="address-form__header">{props.text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput label="Product name*" placeholder="Name" />
          <TextInput label="Product brandname" placeholder="Brandname" />
        </div>
        <div className="form-inputs form-inputs-2">
          <div className="input">
            <label>Select Category*</label>
            <FilterOptions
              options={categoryOptions}
              title="Select Category"
              onOpenHandler={() => setSelectCategoryOpen((prev) => !prev)}
              open={selectCategoryOpen}
            />
          </div>
          <TextInput label="Product weight" placeholder="Weight (250g)" />
          <TextInput label="Product price*" placeholder="Price" />
          <TextInput label="Store name*" placeholder="Store" />
        </div>
        <div className="form-inputs">
          <TextInput label="Product description*" placeholder="Description" />
        </div>
        <div className="form-inputs form-inputs-4">
          <TextInput
            label="Discount (%)"
            placeholder="Discount (10)"
            type="number"
          />
          <TextInput label="Product features" placeholder="Features" />
          <TextInput
            label="Availability (default: true)"
            placeholder="True | False"
          />
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

      {/* <ModalActions closeModal={props.closeModal} text={props.text} /> */}
    </div>
  );
};

const AddProductModal = (props: {
  closeModal: () => void;
  images: string[];
  text: string;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddProductOverlay
          closeModal={props.closeModal}
          images={props.images}
          text={props.text}
        />,

        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddProductModal;
