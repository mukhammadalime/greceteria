import { toast } from "react-toastify";
import { AxiosInstance } from "axios";
import axios from "./axios";
import { ReviewAction, ReviewActionKind } from "../store/ReviewsContext";
import { ProductAction, ProductActionKind } from "../store/ProductContext";

export const getProductReviews = async (
  dispatch: React.Dispatch<ReviewAction>,
  productId: string,
  page: number,
  userId: string = ""
): Promise<void> => {
  try {
    page === 1 && dispatch({ type: ReviewActionKind.GET_REVIEWS_START });
    const { data } = await axios(
      `products/${productId}/reviews?limit=5&sort=-createdAt&sort=-rating&page=${page}${
        userId ? `&userId=${userId}` : ""
      }`
    );

    dispatch({
      type: ReviewActionKind.GET_REVIEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    dispatch({
      type: ReviewActionKind.GET_REVIEWS_FAILURE,
      payload: error,
    });

    toast.error(error);
  }
};

export const addReview = async (
  dispatch: React.Dispatch<ReviewAction>,
  productDispatch: React.Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  reviewData: { review: string; rating: number; product: string },
  reviewsCount: number
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.post(`reviews`, reviewData);

    dispatch({
      type: ReviewActionKind.CREATE_REVIEW,
      payload: data.data.review,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount: ++reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const editReview = async (
  dispatch: React.Dispatch<ReviewAction>,
  productDispatch: React.Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  reviewData: { review: string; rating: number; product: string },
  id: string,
  reviewsCount: number
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.patch(`reviews/${id}`, reviewData);

    dispatch({
      type: ReviewActionKind.EDIT_REVIEW,
      payload: data.data.review,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const deleteReview = async (
  dispatch: React.Dispatch<ReviewAction>,
  productDispatch: React.Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  id: string,
  reviewsCount: number
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.delete(`reviews/${id}`);

    dispatch({
      type: ReviewActionKind.DELETE_REVIEW,
      payload: data.data.reviewId,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount: --reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const addReviewReply = async (
  dispatch: React.Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  replyData: { text: string; user: string },
  reviewId: string
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.post(
      `reviews/${reviewId}/replies`,
      replyData
    );

    dispatch({
      type: ReviewActionKind.CREATE_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const editReviewReply = async (
  dispatch: React.Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  text: string,
  reviewId: string,
  replyId: string
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.patch(
      `reviews/${reviewId}/replies/${replyId}`,
      { text }
    );

    dispatch({
      type: ReviewActionKind.EDIT_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const deleteReviewReply = async (
  dispatch: React.Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  reviewId: string,
  replyId: string
): Promise<void> => {
  try {
    const { data } = await axiosPrivate.delete(
      `reviews/${reviewId}/replies/${replyId}`
    );

    dispatch({
      type: ReviewActionKind.DELETE_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
