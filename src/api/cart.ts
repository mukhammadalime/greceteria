import axios from "axios";
import { toast } from "react-toastify";
import { CartAction, CartActionKind } from "../store/CartContext";

export const getCartApi = async (
  dispatch: React.Dispatch<CartAction>
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!)?.token;

  if (!token) return;
  try {
    dispatch({ type: CartActionKind.GET_CART_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
      url: `http://localhost:8000/api/v1/cart`,
    });

    dispatch({
      type: CartActionKind.GET_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CartActionKind.GET_CART_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const addToCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  counterRef: React.RefObject<HTMLInputElement>,
  setLoading: (arg: boolean) => void
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const quantity = Number(counterRef.current?.value);

  try {
    setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      url: `http://localhost:8000/api/v1/cart`,
      data: { productId, quantity },
    });

    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
    toast.success("Cart updated.");
  } catch (err: any) {
    dispatch({
      type: CartActionKind.UPDATE_CART_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
  setLoading(false);
};

export const updateCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  counterRef: React.RefObject<HTMLInputElement>,
  setLoading: (arg: boolean) => void
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const quantity = Number(counterRef.current?.value);

  try {
    setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: `http://localhost:8000/api/v1/cart`,
      data: { productId, quantity },
    });

    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: CartActionKind.UPDATE_CART_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
  setLoading(false);
};

export const deleteProductCart = async (
  dispatch: React.Dispatch<CartAction>,
  productId: string,
  setLoading?: (arg: boolean) => void
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;

  try {
    setLoading && setLoading(true);
    dispatch({ type: CartActionKind.UPDATE_CART_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: `http://localhost:8000/api/v1/cart/delete-product`,
      data: { productId },
    });

    dispatch({
      type: CartActionKind.UPDATE_CART_SUCCESS,
      payload: data.data,
    });
    toast.success("Product removed.");
  } catch (err: any) {
    dispatch({
      type: CartActionKind.UPDATE_CART_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
  setLoading && setLoading(true);
};
