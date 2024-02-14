import { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import TextInput from "../UI/Inputs/TextInput";
import { addOrUpdateCategory, deleteCategory } from "../../api/categories";
import { CategoryContext } from "../../store/CategoryContext";
import { toast } from "react-toastify";
import { CategoryItemTypes } from "../../utils/user-types";
import { ActionTypeProps } from "../../utils/types";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddCategoryOverlay = ({
  text,
  closeModal,
  category,
}: AddCategoryModalProps) => {
  const [uploadedImage, setUploadedImage] = useState(
    category?.image.imageUrl || ""
  );
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { state: categoryState, dispatch } = useContext(CategoryContext);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = URL.createObjectURL((e.target as HTMLInputElement).files![0]);
    setUploadedImage(image);
  };

  async function onAddOrDeleteOrUpdateCategory(actionType: ActionTypeProps) {
    const name = nameRef.current?.value;
    const image = imageRef.current?.files![0];
    const formData = new FormData();
    formData.append("name", name as string);
    uploadedImage.startsWith("blob") && formData.append("image", image as Blob);

    switch (actionType) {
      case "add":
        if (categoryState.categories.find((i) => i.name === name)) {
          toast.error(`The category (${name}) already exists.`);
          return;
        }
        await addOrUpdateCategory(
          categoryState.categories,
          dispatch,
          formData,
          closeModal,
          "POST"
        );
        break;
      case "update":
        await addOrUpdateCategory(
          categoryState.categories,
          dispatch,
          formData,
          closeModal,
          "PATCH",
          category?._id
        );
        break;
      case "delete":
        await deleteCategory(categoryState.categories, dispatch, category?._id);
        break;

      default:
        break;
    }
  }

  return (
    <div className="add-product-form ">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Category Name*"
            placeholder="Category Name"
            ref={nameRef}
            defaultValue={category?.name}
          />
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
            ref={imageRef}
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
      <ModalActions
        text={text}
        closeModal={closeModal}
        onUpdateHandler={onAddOrDeleteOrUpdateCategory.bind(null, "update")}
        onAddHandler={onAddOrDeleteOrUpdateCategory.bind(null, "add")}
        onDeleteHandler={onAddOrDeleteOrUpdateCategory.bind(null, "delete")}
        loading={categoryState.categoryLoading}
      />
    </div>
  );
};

const AddCategoryModal = (props: AddCategoryModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddCategoryOverlay
          closeModal={props.closeModal}
          text={props.text}
          category={props.category}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddCategoryModalProps {
  closeModal: () => void;
  text: string;
  category?: CategoryItemTypes;
}

export default AddCategoryModal;
