import ReactDOM from "react-dom";
import { ChangeEvent, useContext, useRef, useState } from "react";
import ModalActions from "./ModalActions";
import UploadImagesInput from "./components/UploadImagesInput";
import TextInput from "../UI/Inputs/TextInput";
import FilterOptions from "../UI/FilterOptions";
import { ImageItemTypes, ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct } from "../../api/products";
import {
  createFormDataHandler,
  removeImagesHandler,
  setImagesHandler,
} from "../../utils/helperFunctions";
import UploadedImages from "./components/UploadedImages";
import { inStockOptions, weightOptions } from "../../data/helperData";
import useToggleOptions from "../../hooks/useToggleOptions";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddProductOverlay = ({
  closeModal,
  text,
  images,
  categoryOptions,
  product,
}: AddProductModalTypes) => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const brandNameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLInputElement>(null);
  const discountPercentRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category ? product.category._id : ""
  );
  const [inStock, setInStock] = useState<string>(
    product ? String(product?.inStock) : ""
  );
  const [selectedWeightType, setSelectedWeightType] = useState<string>(
    product?.weight ? product?.weight.replace(/[^a-zA-Z]+/g, "") : "kg"
  );
  const [imagesForClient, setImagesForClient] = useState<ImageItemTypes[] | []>(
    images || []
  );
  const [imagesForServer, setImagesForServer] = useState<FileList | []>([]);

  const { state: productsState, dispatch } = useContext(ProductContext);
  const { state: userState } = useContext(AuthContext);
  const { filtersOpen, toggleOptionsHandler } = useToggleOptions(3);

  /// This function remove the image from states which are for client and server
  const onRemoveImages = (img: ImageItemTypes): void => {
    removeImagesHandler(img, setImagesForServer, setImagesForClient);
  };

  /// This function sets uploade images to states which are for client and server
  const onSetImages = (e: ChangeEvent<HTMLInputElement>): void => {
    setImagesHandler(e, setImagesForServer, setImagesForClient);
  };

  async function onAddOrUpdateOrDeleteProduct(
    actionType: "add" | "update" | "delete"
  ) {
    const productRefs = {
      nameRef,
      brandNameRef,
      weightRef,
      priceRef,
      storeRef,
      descriptionRef,
      featuresRef,
      discountPercentRef,
    };
    const formData = createFormDataHandler(
      productRefs,
      selectedWeightType,
      product,
      selectedCategory,
      inStock
    );

    switch (actionType) {
      case "add":
        await addProduct(
          dispatch,
          formData,
          imagesForServer,
          userState.user?.token,
          closeModal
        );
        break;
      case "update":
        await updateProduct(
          dispatch,
          formData,
          imagesForServer,
          imagesForClient,
          userState.user?.token,
          closeModal,
          product
        );
        break;
      case "delete":
        await deleteProduct(
          dispatch,
          closeModal,
          productsState.products,
          product,
          userState.user?.token,
          navigate
        );
        break;
    }
  }

  return (
    <div className="add-product-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Product name*"
            placeholder="Name"
            ref={nameRef}
            defaultValue={product?.name}
          />
          <TextInput
            label="Product brandname"
            placeholder="Brandname"
            ref={brandNameRef}
            defaultValue={product?.brandName}
          />
        </div>
        <div className="form-inputs form-inputs-2">
          <div className="input">
            <label>Select Category*</label>
            <FilterOptions
              options={categoryOptions}
              title="Select Category"
              onToggle={toggleOptionsHandler.bind(null, 0)}
              onSelect={(id: string) => setSelectedCategory(id)}
              open={filtersOpen[0]}
              defaultValue={product?.category.name}
            />
          </div>

          <div className="weight-inputBox">
            <TextInput
              label="Product weight"
              placeholder="250g | 1.2kg"
              ref={weightRef}
              type="number"
              defaultValue={product?.weight.replace(/\D/g, "")}
            />
            <FilterOptions
              options={weightOptions}
              title=""
              onToggle={toggleOptionsHandler.bind(null, 1)}
              onSelect={(id: string) => setSelectedWeightType(id)}
              open={filtersOpen[1]}
              defaultValue={selectedWeightType}
            />
          </div>

          <TextInput
            label="Product price*"
            placeholder="Price"
            ref={priceRef}
            type="number"
            defaultValue={String(product?.price)}
          />
          <TextInput
            label="Store name*"
            placeholder="Store"
            ref={storeRef}
            defaultValue={product?.store}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            label="Product description*"
            placeholder="Description"
            ref={descriptionRef}
            defaultValue={product?.description}
          />
        </div>
        <div className="form-inputs form-inputs-4">
          <TextInput
            label="Discount (%)"
            placeholder="Discount (10)"
            type="number"
            ref={discountPercentRef}
            defaultValue={String(product?.discountPercent)}
          />
          <TextInput
            label="Product features"
            placeholder="Features"
            ref={featuresRef}
            defaultValue={product?.features}
          />

          {text.startsWith("Edit") && (
            <div className="input">
              <label>In Stock</label>
              <FilterOptions
                options={inStockOptions}
                title=""
                onToggle={toggleOptionsHandler.bind(null, 2)}
                onSelect={(id: string) => setInStock(id)}
                open={filtersOpen[2]}
                defaultValue={inStock}
              />
            </div>
          )}
        </div>
        <UploadImagesInput onChange={onSetImages} />
        <UploadedImages
          images={imagesForClient}
          onRemoveImages={onRemoveImages}
        />
      </div>

      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onAddOrUpdateOrDeleteProduct.bind(null, "add")}
        onDeleteHandler={onAddOrUpdateOrDeleteProduct.bind(null, "delete")}
        onUpdateHandler={onAddOrUpdateOrDeleteProduct.bind(null, "update")}
        loading={productsState.addOrUpdateOrDeleteLoading}
      />
    </div>
  );
};

const AddProductModal = (props: AddProductModalTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddProductOverlay {...props} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddProductModalTypes {
  closeModal: () => void;
  images?: ImageItemTypes[];
  text: string;
  categoryOptions: { name: string; id: string }[];
  product?: ProductItemTypes;
}

export default AddProductModal;
