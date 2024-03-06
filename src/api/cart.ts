import { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { CartAction, CartActionKind } from "../store/CartContext";

export const getCartApi = async (
  dispatch: React.Dispatch<CartAction>,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: CartActionKind.GET_CART_START });
    const { data } = await axiosPrivate.get("/cart");

    dispatch({
      type: CartActionKind.GET_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CartActionKind.GET_CART_FAILURE,
      error: err.response?.data.message,
    });
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
};

export const addToCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  quantity: number,
  axiosPrivate: AxiosInstance,
  setLoading?: (arg: boolean) => void
): Promise<void> => {
  try {
    setLoading && setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });
    const { data } = await axiosPrivate.post("/cart", { productId, quantity });

    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
  setLoading && setLoading(false);
};

export const updateCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  quantity: number,
  setLoading: (arg: boolean) => void,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });
    const { data } = await axiosPrivate.patch("/cart", { productId, quantity });

    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
  setLoading(false);
};

export const deleteProductCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  axiosPrivate: AxiosInstance,
  setLoading: (arg: boolean) => void
): Promise<void> => {
  try {
    setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });

    const { data } = await axiosPrivate.patch("/cart/delete-product", {
      productId,
    });
    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
  setLoading(false);
};
