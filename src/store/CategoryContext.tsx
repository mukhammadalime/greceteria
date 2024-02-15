import { createContext, useEffect, useReducer } from "react";
import { CategoryItemTypes } from "../utils/user-types";
import { getCategoriesApi } from "../api/categories";

interface CategoryInitialStateTypes {
  categories: CategoryItemTypes[];
  categoriesLoading: boolean;
  category: CategoryItemTypes | null;
  categoryLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum CategoryActionKind {
  GET_CATEGORY_START = "GET_CATEGORY_START",
  GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE",

  GET_CATEGORIES_START = "GET_CATEGORIES_START",
  GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE",

  ADD_OR_UPDATE_CATEGORY_START = "ADD_OR_UPDATE_CATEGORY_START",
  ADD_OR_UPDATE_CATEGORY_SUCCESS = "ADD_OR_UPDATE_CATEGORY_SUCCESS",
  ADD_OR_UPDATE_CATEGORY_FAILURE = "ADD_OR_UPDATE_CATEGORY_FAILURE",

  DELETE_CATEGORY_START = "DELETE_CATEGORY_START",
  DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE",
}

// An interface for our actions
export interface CategoryAction {
  type: CategoryActionKind;
  payload?: CategoryItemTypes | CategoryItemTypes[] | [];
  error?: string;
}

const INITIAL_STATE: CategoryInitialStateTypes = {
  categories: [],
  category: null,
  categoriesLoading: false,
  categoryLoading: false,
  error: null,
};

interface CategoryContextTypes {
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
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoriesLoading: false,
        error: null,
      };
    case CategoryActionKind.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        categoriesLoading: false,
        error: action.error!,
      };

    case CategoryActionKind.GET_CATEGORY_START:
      return { ...state, category: null, categoryLoading: true, error: null };
    case CategoryActionKind.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload as CategoryItemTypes,
        categoryLoading: false,
        error: null,
      };
    case CategoryActionKind.GET_CATEGORY_FAILURE:
      return { ...state, categoryLoading: false, error: action.error! };

    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_START:
      return { ...state, categoryLoading: true, error: null };
    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoryLoading: false,
        error: null,
      };
    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_FAILURE:
      return { ...state, categoryLoading: false, error: action.error! };

    case CategoryActionKind.DELETE_CATEGORY_START:
      return { ...state, categoryLoading: true, error: null };
    case CategoryActionKind.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoryLoading: false,
        error: null,
      };
    case CategoryActionKind.DELETE_CATEGORY_FAILURE:
      return { ...state, categoryLoading: false, error: action.error! };

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

  const getCategories = async () => await getCategoriesApi(dispatch);

  // Fetch categories on every refresh to keep the data up to date with the database.
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
