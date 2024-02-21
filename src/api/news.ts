import { toast } from "react-toastify";
import { NewsAction, NewsActionKind } from "../store/NewsContext";
import { ImageItemTypes, NewsItemTypes } from "../utils/user-types";
import { determineImageUploadConditions } from "./helper";
import axios from "./axios";
import { AxiosInstance } from "axios";

export const getNewsApi = async (
  dispatch: React.Dispatch<NewsAction>
): Promise<void> => {
  try {
    dispatch({ type: NewsActionKind.GET_NEWS_START });
    const { data } = await axios("news?sort=createdAt");

    dispatch({
      type: NewsActionKind.GET_NEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.GET_NEWS_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const getNewsItemApi = async (
  dispatch: React.Dispatch<NewsAction>,
  id: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: NewsActionKind.GET_NEWSITEM_START });
    const { data } = await axios(`/news/${id}`);

    dispatch({
      type: NewsActionKind.GET_NEWSITEM_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.GET_NEWSITEM_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const addNews = async (
  dispatch: React.Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  closeModal: () => void,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }

  try {
    dispatch({ type: NewsActionKind.ADD_NEWSITEM_START });

    const { data } = await axiosPrivate.post(`/news`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: NewsActionKind.ADD_NEWSITEM_SUCCESS,
      payload: data.data,
    });
    toast.success("News has been successfully added.");
    closeModal();
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.ADD_NEWSITEM_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const updateNews = async (
  dispatch: React.Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  closeModal: () => void,
  news: NewsItemTypes | undefined,
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
    news,
    formData
  );

  try {
    dispatch({ type: NewsActionKind.UPDATE_NEWSITEM_START });

    const { data } = await axiosPrivate.patch(
      `/news/${news?._id}`,
      updatedFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({
      type: NewsActionKind.UPDATE_NEWSITEM_SUCCESS,
      payload: data.data,
    });
    closeModal();
    toast.success("News has been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.UPDATE_NEWSITEM_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const deleteNews = async (
  dispatch: React.Dispatch<NewsAction>,
  id: string | undefined,
  closeModal: () => void,
  navigate: (arg: string) => void,
  axiosPrivate: AxiosInstance
): Promise<void> => {
  try {
    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_START });

    await axiosPrivate.delete(`/news/${id}`);

    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_SUCCESS });
    toast.success("News has been successfully deleted.");
    closeModal();
    navigate("/news");
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.DELETE_NEWSITEM_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
