import axios from "axios";
import { UserAction, UserActionKind } from "../store/UserContext";
import { toast } from "react-toastify";

export const getCompareApi = async (
  dispatch: React.Dispatch<UserAction>
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  try {
    dispatch({ type: UserActionKind.GET_COMPARE_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      url: "http://localhost:8000/api/v1/users/compare",
    });

    dispatch({
      type: UserActionKind.GET_COMPARE_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: UserActionKind.GET_COMPARE_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const getWishlistApi = async (
  dispatch: React.Dispatch<UserAction>
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  try {
    dispatch({ type: UserActionKind.GET_WISHLIST_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      url: "http://localhost:8000/api/v1/users/wishlist",
    });

    dispatch({
      type: UserActionKind.GET_WISHLIST_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: UserActionKind.GET_WISHLIST_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const addToWishlist = async (
  dispatch: React.Dispatch<UserAction>,
  productId: string
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;

  try {
    dispatch({ type: UserActionKind.ADD_TO_WISHLIST_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: "http://localhost:8000/api/v1/users/wishlist/add",
      data: { productId },
    });

    dispatch({
      type: UserActionKind.ADD_TO_WISHLIST_SUCCESS,
      payload: data.data,
    });
    toast.success("Added to wishlist");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.ADD_TO_WISHLIST_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const removeFromWishlist = async (
  dispatch: React.Dispatch<UserAction>,
  productId: string
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;

  try {
    dispatch({ type: UserActionKind.ADD_TO_WISHLIST_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: "http://localhost:8000/api/v1/users/wishlist/remove",
      data: { productId },
    });

    dispatch({
      type: UserActionKind.ADD_TO_WISHLIST_SUCCESS,
      payload: data.data,
    });
    toast.success("Removed to wishlist");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.ADD_TO_WISHLIST_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};
