import axios from "axios";
import { CategoryAction, CategoryActionKind } from "../store/CategoryContext";
import { toast } from "react-toastify";
import { CategoryItemTypes } from "../utils/user-types";

export const getCategoriesApi = async (
  dispatch: React.Dispatch<CategoryAction>
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.GET_CATEGORIES_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: "http://localhost:8000/api/v1/categories",
    });

    dispatch({
      type: CategoryActionKind.GET_CATEGORIES_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.GET_CATEGORIES_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const getCategory = async (
  dispatch: React.Dispatch<CategoryAction>,
  id: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: CategoryActionKind.GET_CATEGORY_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: `http://localhost:8000/api/v1/categories/${id}`,
    });

    dispatch({
      type: CategoryActionKind.GET_CATEGORY_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.GET_CATEGORY_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const addOrUpdateCategory = async (
  categories: CategoryItemTypes[],
  dispatch: React.Dispatch<CategoryAction>,
  formData: FormData,
  closeModal: () => void,
  type: string,
  id?: string | undefined
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  try {
    dispatch({ type: CategoryActionKind.ADD_OR_UPDATE_CATEGORY_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      method: type,
      url: `http://localhost:8000/api/v1/categories${id ? "/" + id : ""}`,
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
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const deleteCategory = async (
  categories: CategoryItemTypes[],
  dispatch: React.Dispatch<CategoryAction>,
  id: string | undefined
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  try {
    dispatch({ type: CategoryActionKind.DELETE_CATEGORY_START });
    await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      url: `http://localhost:8000/api/v1/categories/${id}`,
    });

    dispatch({
      type: CategoryActionKind.DELETE_CATEGORY_SUCCESS,
      payload: categories.filter((i) => i._id !== id),
    });
  } catch (err: any) {
    dispatch({
      type: CategoryActionKind.DELETE_CATEGORY_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};
