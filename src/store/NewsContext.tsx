import { createContext, useReducer } from "react";
import { NewsItemTypes } from "../utils/user-types";

import { returnUpdatedState } from "../utils/helperFunctions";

interface NewsInitialStateTypes {
  news: NewsItemTypes[] | null;
  newsItem: NewsItemTypes | null;
  newsLoading: boolean;
  newsItemLoading: boolean;
  addUpdateDeleteLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum NewsActionKind {
  GET_NEWSITEM_START = "GET_NEWSITEM_START",
  GET_NEWSITEM_SUCCESS = "GET_NEWSITEM_SUCCESS",
  GET_NEWSITEM_FAILURE = "GET_NEWSITEM_FAILURE",

  GET_NEWS_START = "GET_NEWS_START",
  GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS",
  GET_NEWS_FAILURE = "GET_NEWS_FAILURE",

  ADD_NEWSITEM_START = "ADD_NEWSITEM_START",
  ADD_NEWSITEM_SUCCESS = "ADD_NEWSITEM_SUCCESS",
  ADD_NEWSITEM_FAILURE = "ADD_NEWSITEM_FAILURE",

  UPDATE_NEWSITEM_START = "UPDATE_NEWSITEM_START",
  UPDATE_NEWSITEM_SUCCESS = "UPDATE_NEWSITEM_SUCCESS",
  UPDATE_NEWSITEM_FAILURE = "UPDATE_NEWSITEM_FAILURE",

  DELETE_NEWSITEM_START = "DELETE_NEWSITEM_START",
  DELETE_NEWSITEM_SUCCESS = "DELETE_NEWSITEM_SUCCESS",
  DELETE_NEWSITEM_FAILURE = "DELETE_NEWSITEM_FAILURE",
}

// An interface for our actions
export interface NewsAction {
  type: NewsActionKind;
  payload?: NewsItemTypes | NewsItemTypes[] | Array<HTMLTextAreaElement> | [];
  error?: string;
}

const INITIAL_STATE: NewsInitialStateTypes = {
  news: null,
  newsItem: null,
  newsLoading: false,
  newsItemLoading: false,
  addUpdateDeleteLoading: false,
  error: null,
};

interface NewsContextTypes {
  state: NewsInitialStateTypes;
  dispatch: React.Dispatch<NewsAction>;
}

export const NewsContext = createContext<NewsContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const NewsReducer = (
  state: NewsInitialStateTypes,
  action: NewsAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case NewsActionKind.GET_NEWS_START:
      return { ...state, newsLoading: true, error: null };
    case NewsActionKind.GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload as NewsItemTypes[],
        newsLoading: false,
        error: null,
      };
    case NewsActionKind.GET_NEWS_FAILURE:
      return {
        ...state,
        news: [],
        newsLoading: false,
        error: action.error!,
      };

    case NewsActionKind.GET_NEWSITEM_START:
      return { ...state, newsItem: null, newsItemLoading: true, error: null };
    case NewsActionKind.GET_NEWSITEM_SUCCESS:
      return {
        ...state,
        newsItem: action.payload as NewsItemTypes,
        newsItemLoading: false,
        error: null,
      };
    case NewsActionKind.GET_NEWSITEM_FAILURE:
      return {
        ...state,
        newsItem: null,
        newsItemLoading: false,
        error: action.error!,
      };

    case NewsActionKind.ADD_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.ADD_NEWSITEM_SUCCESS:
      const allNews = state.news ? state.news : [];
      return {
        ...state,
        news: [action.payload as NewsItemTypes, ...allNews],
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.ADD_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    case NewsActionKind.UPDATE_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.UPDATE_NEWSITEM_SUCCESS:
      const newsItem = action.payload as NewsItemTypes;
      const updatedNews = returnUpdatedState(
        state.news!,
        newsItem,
        newsItem._id
      );
      return {
        ...state,
        news: updatedNews,
        newsItem,
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.UPDATE_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    case NewsActionKind.DELETE_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.DELETE_NEWSITEM_SUCCESS:
      const updatedNews2 = state.news
        ? state.news?.filter((i) => i._id !== state.newsItem?._id)
        : [];
      return {
        ...state,
        news: updatedNews2,
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.DELETE_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    default:
      return state;
  }
};

export const NewsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(NewsReducer, INITIAL_STATE);

  const values = {
    state,
    dispatch,
  };

  return <NewsContext.Provider value={values}>{children}</NewsContext.Provider>;
};
