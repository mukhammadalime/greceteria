import { createContext, useEffect, useReducer } from "react";
import { CategoryItemTypes } from "../utils/user-types";
import axios from "axios";

interface CategoryInitialStateTypes {
  categories: CategoryItemTypes[];
  categoriesLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum CategoryActionKind {
  GET_CATEGORIES_START = "GET_CATEGORIES_START",
  GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE",
}

// An interface for our actions
export interface CategoryAction {
  type: CategoryActionKind;
  payload?: CategoryItemTypes[] | [];
  error?: string;
}

const INITIAL_STATE: CategoryInitialStateTypes = {
  categories: [],
  categoriesLoading: false,
  error: null,
};

export interface CategoryContextTypes {
  state: CategoryInitialStateTypes;
  dispatch: React.Dispatch<CategoryAction>;
}

export const CategoryContext = createContext<CategoryContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const CategoryReducer = (
  state: CategoryInitialStateTypes,
  action: CategoryAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case CategoryActionKind.GET_CATEGORIES_START:
      return { ...state, categoriesLoading: true, error: null };
    case CategoryActionKind.GET_CATEGORIES_SUCCESS:
      return {
        categories: action.payload as CategoryItemTypes[],
        categoriesLoading: false,
        error: null,
      };
    case CategoryActionKind.GET_CATEGORIES_FAILURE:
      return { categories: [], categoriesLoading: false, error: action.error! };

    default:
      return state;
  }
};

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);

  const getCategories = async () => {
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
      console.log("err:", err);
      dispatch({
        type: CategoryActionKind.GET_CATEGORIES_FAILURE,
        error: err.response.data.message,
      });
    }
  };

  // Fetch user on every refresh to keep the user up to date with the database.
  useEffect(() => {
    getCategories();
  }, []);

  const values = {
    state,
    dispatch,
    getCategories,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};
