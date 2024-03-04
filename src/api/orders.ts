import { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { OrderAction, OrderActionKind } from "../store/OrderContext";

//// FOR USERS
export const getMyOrders = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  query?: string
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_START });
    const { data } = await axiosPrivate(`orders/my-orders?${query}`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getOneOrder = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDER_START });
    const { data } = await axiosPrivate(`orders/${id}`);

    dispatch({
      type: OrderActionKind.GET_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const createOrder = async (
  axiosPrivate: AxiosInstance,
  order: any
): Promise<void> => {
  try {
    await axiosPrivate.post(`/orders`, order);

    toast.success("New Order has been accepted.");
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

//// FOR ADMINS
export const getAllOrders = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  quary?: string
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_START });
    const { data } = await axiosPrivate(`orders?${quary || ""}&limit=100`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getRecentOrdersForAdmin = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_START });
    const { data } = await axiosPrivate(`orders/recent?sort=-createdAt`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getOrdersStats = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_STATS_START });
    const { data } = await axiosPrivate(`orders/stats`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getOrdersRevenueStats = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  dispatch({ type: OrderActionKind.GET_REVENUE_STATS_START });
  try {
    const { data } = await axiosPrivate(`orders/revenue-stats`);

    dispatch({
      type: OrderActionKind.GET_REVENUE_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    dispatch({
      type: OrderActionKind.GET_REVENUE_STATS_FAILURE,
      payload: error,
    });
    toast.error(error);
  }
};

export const updateOrder = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string,
  actionType: "on-the-way" | "delivered"
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.UPDATE_ORDER_START });
    const { data } = await axiosPrivate.patch(`orders/${id}/${actionType}`);

    dispatch({
      type: OrderActionKind.UPDATE_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

////////////////////////////////////////////////////////////////
export const getUserOrders = async (
  dispatch: React.Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string
): Promise<void> => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_START });
    const { data } = await axiosPrivate(`orders/user/${id}`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
