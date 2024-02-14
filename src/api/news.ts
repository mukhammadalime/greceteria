import { toast } from "react-toastify";
import { NewsAction, NewsActionKind } from "../store/NewsContext";
import axios from "axios";
import { ImageItemTypes, NewsItemTypes } from "../utils/user-types";
import { determineImageUploadConditions } from "./helper";

export const getNewsApi = async (
  dispatch: React.Dispatch<NewsAction>
): Promise<void> => {
  try {
    dispatch({ type: NewsActionKind.GET_NEWS_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: "http://localhost:8000/api/v1/news?sort=createdAt",
    });

    dispatch({
      type: NewsActionKind.GET_NEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.GET_NEWS_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const getNewsItemApi = async (
  dispatch: React.Dispatch<NewsAction>,
  id: string | undefined
): Promise<void> => {
  try {
    dispatch({ type: NewsActionKind.GET_NEWSITEM_START });
    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: `http://localhost:8000/api/v1/news/${id}`,
    });

    dispatch({
      type: NewsActionKind.GET_NEWSITEM_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.GET_NEWSITEM_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const addNews = async (
  dispatch: React.Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  closeModal: () => void
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;

  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }

  try {
    dispatch({ type: NewsActionKind.ADD_NEWSITEM_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      data: formData,
      url: `http://localhost:8000/api/v1/news`,
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
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const updateNews = async (
  dispatch: React.Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  closeModal: () => void,
  news: NewsItemTypes | undefined
): Promise<void> => {
  if (imagesForServer.length === 0 && imagesForClient.length === 0) {
    toast.error("Please upload at least one image.");
    return;
  }
  const token = JSON.parse(localStorage.getItem("user")!).token;

  // This function determines how the user updated the images of the item and return formdata based on the way of change.
  const updatedFormData = determineImageUploadConditions(
    imagesForServer,
    imagesForClient,
    news,
    formData
  );

  try {
    dispatch({ type: NewsActionKind.UPDATE_NEWSITEM_START });
    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: `http://localhost:8000/api/v1/news/${news?._id}`,
      data: updatedFormData,
    });

    dispatch({
      type: NewsActionKind.UPDATE_NEWSITEM_SUCCESS,
      payload: data.data,
    });
    closeModal();
    toast.success("Product has been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.UPDATE_NEWSITEM_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const deleteNews = async (
  dispatch: React.Dispatch<NewsAction>,
  id: string | undefined,
  closeModal: () => void,
  navigate: (arg: string) => void
): Promise<void> => {
  const token = JSON.parse(localStorage.getItem("user")!).token;

  try {
    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_START });
    await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      url: `http://localhost:8000/api/v1/news/${id}`,
    });

    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_SUCCESS });
    toast.success("News has been successfully deleted.");
    closeModal();
    navigate("/news");
  } catch (err: any) {
    dispatch({
      type: NewsActionKind.DELETE_NEWSITEM_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};
