import { ProductAction, ProductActionKind } from "../store/ProductContext";
import { toast } from "react-toastify";
import { ImageItemTypes, ProductItemTypes } from "../utils/user-types";
import { determineImageUploadConditions } from "./helper";
import axios from "./axios";
import { AxiosInstance } from "axios";

export const getProductsApi = async (
  dispatch: React.Dispatch<ProductAction>
): Promise<void> => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCTS_START });
    const { data } = await axios("/products?limit=20");

    dispatch({
      type: ProductActionKind.GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_PRODUCTS_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getProductApi = async (
  dispatch: React.Dispatch<ProductAction>,
  id: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCT_START });
    const { data } = await axios(`/products/${id}`);

    dispatch({
      type: ProductActionKind.GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_PRODUCT_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const addProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  closeModal: () => void,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }
  formData.forEach((i) => console.log(i));

  try {
    dispatch({ type: ProductActionKind.ADD_PRODUCT_START });

    const { data } = await axiosPrivate.post(`/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const updateProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  closeModal: () => void,
  product: ProductItemTypes,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  if (imagesForServer.length === 0 && imagesForClient.length === 0) {
    toast.error("Please upload at least one image.");
    return;
  }

  // This function determines how the user updated the images of the item and return formdata based on the way of change.
  const updatedFormData = determineImageUploadConditions(
    imagesForServer,
    imagesForClient,
    product,
    formData
  );

  updatedFormData.append("reviewsCount", String(product.reviewsCount));

  try {
    dispatch({ type: ProductActionKind.UPDATE_PRODUCT_START });

    const { data } = await axiosPrivate.patch(
      `/products/${product._id}`,
      updatedFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: data.data,
    });
    closeModal();
    toast.success("Product has been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.UPDATE_PRODUCT_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const deleteProduct = async (
  dispatch: React.Dispatch<ProductAction>,
  closeModal: () => void,
  id: string,
  navigate: (arg: string) => void,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: ProductActionKind.DELETE_PRODUCT_START });
    await axiosPrivate.delete(`/products/${id}`);

    dispatch({ type: ProductActionKind.DELETE_PRODUCT_SUCCESS });
    closeModal();
    toast.success("Product has been successfully deleted.");
    navigate("/shop");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.DELETE_PRODUCT_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
