import ReactDOM from "react-dom";
import { useContext, useRef, useState } from "react";
import ModalActions from "./ModalActions";
import UploadImages from "./UploadImages";
import TextInput from "../UI/Inputs/TextInput";
import FilterOptions from "../UI/FilterOptions";
import { ImageItemTypes, ProductItemTypes } from "../../utils/user-types";
import { ProductActionKind, ProductContext } from "../../store/ProductContext";
import { AuthContext } from "../../store/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const weightOptions = [
  { name: "kg", id: "kg" },
  { name: "g", id: "g" },
];

const inStockOptions = [
  { name: "True", id: "true" },
  { name: "False", id: "false" },
];

const AddProductOverlay = ({
  closeModal,
  text,
  images,
  categoryOptions,
  product,
}: {
  closeModal: () => void;
  text: string;
  images?: ImageItemTypes[];
  categoryOptions: { name: string; id: string }[];
  product?: ProductItemTypes;
}) => {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  // This function opens the requested filter and closed other remaining open filters.
  const onToggleOptions = (num: number) => {
    const array = [...filtersOpen];
    filtersOpen.fill(false);
    filtersOpen[num] = !array[num];
    setFiltersOpen([...filtersOpen]);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category ? product.category.id : ""
  );
  const [inStock, setInStock] = useState<string>(
    product ? String(product?.inStock) : ""
  );
  const [selectedWeightType, setSelectedWeightType] = useState<string>(
    product?.weight ? product?.weight.replace(/[^a-zA-Z]+/g, "") : "kg"
  );
  const [uploadedImagesForClient, setUploadedImagesForClient] = useState<
    ImageItemTypes[] | []
  >(images || []);
  const [uploadedImagesForServer, setUploadedImagesForServer] = useState<
    FileList | []
  >([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const brandNameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLInputElement>(null);
  const discountPercentRef = useRef<HTMLInputElement>(null);

  /// This function remove the image from states which are for client and server
  const onRemoveUploadedImagesForClientAndServer = (
    img: ImageItemTypes
  ): void => {
    /// Remove the filelist item from uploadedImagesForClient
    setUploadedImagesForClient(
      (prevState: ImageItemTypes[]): ImageItemTypes[] =>
        prevState.filter((e: ImageItemTypes) => e.imageUrl !== img.imageUrl)
    );

    /// Remove the filelist item from uploadedImagesForServer
    setUploadedImagesForServer((prevState: FileList | []): FileList => {
      const dataTransfer = new DataTransfer();
      for (let i = 0; i < prevState.length; i++) {
        prevState[i].name !== img.name && dataTransfer.items.add(prevState[i]);
      }
      return dataTransfer.files;
    });
  };

  /// This function sets uploade images to states which are for client and server
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = (e.target as HTMLInputElement).files as FileList;

    /// Set images to state for server
    setUploadedImagesForServer((prevState: FileList | []): FileList => {
      const dataTransfer = new DataTransfer();
      /// Here: we combine two filelists and return new filelist
      for (let i = 0; i < prevState.length; i++)
        dataTransfer.items.add(prevState[i]);
      for (let i = 0; i < selectedFiles.length; i++)
        dataTransfer.items.add(selectedFiles[i]);
      return dataTransfer.files;
    });

    //// Set images to state for client
    let imagesArray: ImageItemTypes[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      imagesArray.push({
        imageUrl: URL.createObjectURL(selectedFiles[i]),
        name: selectedFiles[i].name,
      });
    }

    setUploadedImagesForClient((prevState): ImageItemTypes[] => [
      ...prevState,
      ...imagesArray,
    ]);
  };

  const {
    state: { products, addOrUpdateOrDeleteLoading },
    dispatch,
  } = useContext(ProductContext);
  const { state } = useContext(AuthContext);

  const onAddOrUpdateOrDeleteProduct = async (
    actionType: "add" | "update" | "delete"
  ) => {
    const name = nameRef.current?.value;
    const brandName = brandNameRef.current?.value;
    const weight = weightRef.current?.value;
    const price = priceRef.current?.value;
    const store = storeRef.current?.value;
    const description = descriptionRef.current?.value;
    const features = featuresRef.current?.value;
    const discountPercent = discountPercentRef.current?.value;

    const formData = new FormData();
    formData.append("name", name as string);
    formData.append("brandName", brandName as string);
    formData.append("weight", `${weight}${selectedWeightType}` as string);
    formData.append("price", price as string);
    formData.append("store", store as string);
    formData.append("description", description as string);
    formData.append("features", features as string);
    formData.append("discountPercent", discountPercent as string);
    // This will be needed in the backend when changing the category of the product
    if (product?.category.id !== selectedCategory)
      formData.append("category", `New ${selectedCategory}` as string);
    else formData.append("category", selectedCategory as string);
    formData.append("inStock", inStock ? inStock : "");

    if (actionType === "add") {
      for (let i = 0; i < uploadedImagesForServer.length; i++) {
        formData.append("images", uploadedImagesForServer[i] as Blob);
      }

      try {
        dispatch({ type: ProductActionKind.ADD_PRODUCT_START });
        const { data } = await axios({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.user?.token}`,
          },
          method: "POST",
          url: "http://localhost:8000/api/v1/products",
          data: formData,
        });

        dispatch({
          type: ProductActionKind.ADD_PRODUCT_SUCCESS,
          payload: data.data,
        });
        closeModal();

        toast.success("New Product has been successfully added.");
      } catch (err: any) {
        dispatch({
          type: ProductActionKind.ADD_PRODUCT_FAILURE,
          error: err.response.data.message,
        });

        toast.error(err.response.data.message);
      }
    }

    if (actionType === "update") {
      // 1. Delete some of the current images
      if (
        uploadedImagesForServer.length === 0 &&
        product?.images.length! > uploadedImagesForClient.length
      ) {
        formData.append(
          "notDeletedImages",
          JSON.stringify(uploadedImagesForClient)
        );
      }

      // 2. Only add new images without deleting current ones
      if (
        uploadedImagesForServer.length > 0 &&
        product?.images.length! ===
          uploadedImagesForClient.filter(
            (item) => item.cloudinaryId !== undefined
          ).length
      ) {
        for (let i = 0; i < uploadedImagesForServer.length; i++) {
          formData.append("images", uploadedImagesForServer[i] as Blob);
        }
      }

      // 3. Delete some of the current images and add new images
      if (
        uploadedImagesForServer.length > 0 &&
        uploadedImagesForClient.length >= 0 &&
        product?.images.length! !==
          uploadedImagesForClient.filter(
            (item) => item.cloudinaryId !== undefined
          ).length
      ) {
        const notDeletedImages = uploadedImagesForClient.filter(
          (item) => item.cloudinaryId !== undefined
        );
        for (let i = 0; i < uploadedImagesForServer.length; i++) {
          formData.append("images", uploadedImagesForServer[i] as Blob);
        }
        formData.append("notDeletedImages", JSON.stringify(notDeletedImages));
      }

      try {
        dispatch({ type: ProductActionKind.UPDATE_PRODUCT_START });
        const { data } = await axios({
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.user?.token}`,
          },
          method: "PATCH",
          url: `http://localhost:8000/api/v1/products/${product?.id}`,
          data: formData,
        });

        dispatch({
          type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
          payload: data.data,
        });
        closeModal();

        toast.success("Product has been successfully updated.");
      } catch (err: any) {
        dispatch({
          type: ProductActionKind.UPDATE_PRODUCT_FAILURE,
          error: err.response.data.message,
        });

        toast.error(err.response.data.message);
      }
    }

    if (actionType === "delete") {
      try {
        dispatch({ type: ProductActionKind.DELETE_PRODUCT_START });
        await axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user?.token}`,
          },
          method: "DELETE",
          url: `http://localhost:8000/api/v1/products/${product?.id}`,
        });

        dispatch({
          type: ProductActionKind.DELETE_PRODUCT_SUCCESS,
          payload: products.filter((item) => item.id !== product?.id),
        });
        closeModal();
        toast.success("Product has been successfully deleted.");
        navigate(-1);
      } catch (err: any) {
        dispatch({
          type: ProductActionKind.DELETE_PRODUCT_FAILURE,
          error: err.response.data.message,
        });

        toast.error(err.response.data.message);
      }
    }
  };

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
              onToggle={onToggleOptions.bind(null, 0)}
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
              onToggle={onToggleOptions.bind(null, 1)}
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
                onToggle={onToggleOptions.bind(null, 2)}
                onSelect={(id: string) => setInStock(id)}
                open={filtersOpen[2]}
                defaultValue={inStock}
              />
            </div>
          )}
        </div>
        <UploadImages onChange={onSelectFile} />
        {uploadedImagesForClient.length > 10 && (
          <h3>You can upload up to 10 images!</h3>
        )}
        {uploadedImagesForClient.length > 0 && (
          <div className="uploaded">
            {uploadedImagesForClient.map((img: ImageItemTypes, i: number) => (
              <div className="uploaded__item" key={i}>
                <button
                  onClick={onRemoveUploadedImagesForClientAndServer.bind(
                    null,
                    img
                  )}
                  children="Remove"
                />
                <img src={img.imageUrl} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onAddOrUpdateOrDeleteProduct.bind(null, "add")}
        onDeleteHandler={onAddOrUpdateOrDeleteProduct.bind(null, "delete")}
        onUpdateHandler={onAddOrUpdateOrDeleteProduct.bind(null, "update")}
        loading={addOrUpdateOrDeleteLoading}
      />
    </div>
  );
};

const AddProductModal = (props: {
  closeModal: () => void;
  images?: ImageItemTypes[];
  text: string;
  categoryOptions: { name: string; id: string }[];
  product?: ProductItemTypes;
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
          categoryOptions={props.categoryOptions}
          product={props.product}
        />,

        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddProductModal;
