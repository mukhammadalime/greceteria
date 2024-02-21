import { CategoryAction, CategoryActionKind } from "../store/CategoryContext";
import { toast } from "react-toastify";
import { CategoryItemTypes } from "../utils/user-types";
import axios from "./axios";
import { AxiosInstance } from "axios";

export const getCategoriesApi = async (
  dispatch: React.Dispatch<CategoryAction>
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.GET_CATEGORIES_START });
    const { data } = await axios("/categories");

    dispatch({
      type: CategoryActionKind.GET_CATEGORIES_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.GET_CATEGORIES_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getCategory = async (
  dispatch: React.Dispatch<CategoryAction>,
  id: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.GET_CATEGORY_START });
    const { data } = await axios(`/categories/${id}`);

    dispatch({
      type: CategoryActionKind.GET_CATEGORY_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.GET_CATEGORY_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const addOrUpdateCategory = async (
  categories: CategoryItemTypes[],
  dispatch: React.Dispatch<CategoryAction>,
  formData: FormData,
  closeModal: () => void,
  type: string,
  axiosPrivate: AxiosInstance,
  id?: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.ADD_OR_UPDATE_CATEGORY_START });

    const { data } = await axiosPrivate(`/categories${id ? "/" + id : ""}`, {
      headers: { "Content-Type": "multipart/form-data" },
      method: type,
      data: formData,
    });

    let updatedCategories: CategoryItemTypes[] = [];

    if (type === "POST") updatedCategories = [...categories, data.data];
    if (type === "PATCH") {
      const updatedItemIndex = categories.findIndex(
        (item) => item._id === data.data._id
      );
      updatedCategories = [...categories];
      updatedCategories[updatedItemIndex] = data.data;
    }

    dispatch({
      type: CategoryActionKind.ADD_OR_UPDATE_CATEGORY_SUCCESS,
      payload: updatedCategories,
    });
    closeModal();
    toast.success(
      `Category has been successfully ${
        type === "PATCH" ? "updated" : "added"
      }.`
    );
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.ADD_OR_UPDATE_CATEGORY_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const deleteCategory = async (
  categories: CategoryItemTypes[],
  dispatch: React.Dispatch<CategoryAction>,
  id: string | undefined,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.DELETE_CATEGORY_START });
    await axiosPrivate.delete(`/categories/${id}`);
    dispatch({
      type: CategoryActionKind.DELETE_CATEGORY_SUCCESS,
      payload: categories.filter((i) => i._id !== id),
    });
    toast.success(`Category deleted.`);
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.DELETE_CATEGORY_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
