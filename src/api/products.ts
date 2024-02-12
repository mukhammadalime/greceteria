import axios from "axios";
import { ProductAction, ProductActionKind } from "../store/ProductContext";
import { toast } from "react-toastify";
import { ImageItemTypes, ProductItemTypes } from "../utils/user-types";

export const getProductsApi = async (
  dispatch: React.Dispatch<ProductAction>
) => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCTS_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: "http://localhost:8000/api/v1/products",
    });

    dispatch({
      type: ProductActionKind.GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_PRODUCTS_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const getProductApi = async (
  dispatch: React.Dispatch<ProductAction>,
  id: string | undefined,
  navigate: (arg: string) => void
) => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCT_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: `http://localhost:8000/api/v1/products/${id}`,
    });

    dispatch({
      type: ProductActionKind.GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_PRODUCT_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
    setTimeout(() => navigate("/"), 4000);
  }
};

export const addProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  token: string | undefined,
  closeModal: () => void
) => {
  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }

  try {
    dispatch({ type: ProductActionKind.ADD_PRODUCT_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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
};

export const updateProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  token: string | undefined,
  closeModal: () => void,
  product: ProductItemTypes | undefined
) => {
  // 1.When the admin only delete some of the current images
  const onlyDeleteCondition =
    imagesForServer.length === 0 &&
    product?.images.length! > imagesForClient.length;
  if (onlyDeleteCondition) {
    formData.append("notDeletedImages", JSON.stringify(imagesForClient));
  }

  // 2. When admin only adds new images without deleting current ones
  const onlyAddCondition =
    imagesForServer.length > 0 &&
    product?.images.length! ===
      imagesForClient.filter((i) => i.cloudinaryId !== undefined).length;

  if (onlyAddCondition) {
    for (let i = 0; i < imagesForServer.length; i++) {
      formData.append("images", imagesForServer[i] as Blob);
    }
  }

  // 3. When admin both deletes some of the current images and adds new images.
  const bothAddAndDeleteCondition =
    imagesForServer.length > 0 &&
    imagesForClient.length >= 0 &&
    product?.images.length! !==
      imagesForClient.filter((item) => item.cloudinaryId !== undefined).length;

  if (bothAddAndDeleteCondition) {
    const notDeletedImages = imagesForClient.filter(
      (i) => i.cloudinaryId !== undefined
    );
    for (let i = 0; i < imagesForServer.length; i++) {
      formData.append("images", imagesForServer[i] as Blob);
    }
    formData.append("notDeletedImages", JSON.stringify(notDeletedImages));
  }

  try {
    dispatch({ type: ProductActionKind.UPDATE_PRODUCT_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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
};

export const deleteProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  closeModal: () => void,
  products: ProductItemTypes[],
  product: ProductItemTypes | undefined,
  token: string | undefined,
  navigate: (arg: string) => void
) => {
  try {
    dispatch({ type: ProductActionKind.DELETE_PRODUCT_START });
    await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      url: `http://localhost:8000/api/v1/products/${product?.id}`,
    });

    dispatch({ type: ProductActionKind.DELETE_PRODUCT_SUCCESS });
    closeModal();
    toast.success("Product has been successfully deleted.");
    navigate("/shop");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.DELETE_PRODUCT_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};
