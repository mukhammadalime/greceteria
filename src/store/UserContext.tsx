import { createContext, useContext, useEffect, useReducer } from "react";
import { CustomersStatsTypes, User } from "../utils/user-types";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { AuthContext } from "./AuthContext";

interface UserInitialStateTypes {
  user: User | null;
  loading: boolean;
  verifyLoading: boolean;
  resetLoading: boolean;
  changePassLoading: boolean;
  updateMeLoading: boolean;
  error: string | null;
  customer: User | null;
  customers: User[] | null;
  customersLoading: boolean;
  customerLoading: boolean;
  customersStats: CustomersStatsTypes;
}

// An enum with all the types of actions to use in our reducer
export enum UserActionKind {
  GETME_START = "GETME_START",
  GETME_SUCCESS = "GETME_SUCCESS",
  GETME_FAILURE = "GETME_FAILURE",

  UPDATE_ME_START = "UPDATE_ME_START",
  UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS",
  UPDATE_ME_FAILURE = "UPDATE_ME_FAILURE",

  CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE",

  VERIFY_START = "VERIFY_START",
  VERIFY_SUCCESS = "VERIFY_SUCCESS",
  VERIFY_FAILURE = "VERIFY_FAILURE",

  RESET_PASSWORD_START = "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE",

  /////////////////////////////////////////
  GET_COMPARE_START = "GET_COMPARE_START",
  GET_COMPARE_SUCCESS = "GET_COMPARE_SUCCESS",
  GET_COMPARE_FAILURE = "GET_COMPARE_FAILURE",

  ADD_TO_COMPARE_START = "ADD_TO_COMPARE_START",
  ADD_TO_COMPARE_SUCCESS = "ADD_TO_COMPARE_SUCCESS",
  ADD_TO_COMPARE_FAILURE = "ADD_TO_COMPARE_FAILURE",

  REMOVE_FROM_COMPARE_START = "REMOVE_FROM_COMPARE_START",
  REMOVE_FROM_COMPARE_SUCCESS = "REMOVE_FROM_COMPARE_SUCCESS",
  REMOVE_FROM_COMPARE_FAILURE = "REMOVE_FROM_COMPARE_FAILURE",

  GET_WISHLIST_START = "GET_WISHLIST_START",
  GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS",
  GET_WISHLIST_FAILURE = "GET_WISHLIST_FAILURE",

  ADD_TO_WISHLIST_START = "ADD_TO_WISHLIST_START",
  ADD_TO_WISHLIST_SUCCESS = "ADD_TO_WISHLIST_SUCCESS",
  ADD_TO_WISHLIST_FAILURE = "ADD_TO_WISHLIST_FAILURE",

  REMOVE_FROM_WISHLIST_START = "REMOVE_FROM_WISHLIST_START",
  REMOVE_FROM_WISHLIST_SUCCESS = "REMOVE_FROM_WISHLIST_SUCCESS",
  REMOVE_FROM_WISHLIST_FAILURE = "REMOVE_FROM_WISHLIST_FAILURE",

  /////////////////////////////////////////
  GET_CUSTOMERS_START = "GET_CUSTOMERS_START",
  GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS",
  GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE",

  GET_CUSTOMER_START = "GET_CUSTOMER_START",
  GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS",
  GET_CUSTOMER_FAILURE = "GET_CUSTOMER_FAILURE",

  GET_CUSTOMERS_STATS_START = "GET_CUSTOMERS_STATS_START",
  GET_CUSTOMERS_STATS_SUCCESS = "GET_CUSTOMERS_STATS_SUCCESS",
  GET_CUSTOMERS_STATS_FAILURE = "GET_CUSTOMERS_STATS_FAILURE",
}

// An interface for our actions
export interface UserAction {
  type: UserActionKind;
  payload?: User | User[] | CustomersStatsTypes;
  error?: string;
}

const INITIAL_STATE: UserInitialStateTypes = {
  user: JSON.parse(localStorage.getItem("user")!) || null,
  loading: false,
  verifyLoading: false,
  resetLoading: false,
  changePassLoading: false,
  updateMeLoading: false,
  error: null,
  customers: null,
  customersLoading: false,
  customer: null,
  customerLoading: false,
  customersStats: {
    total: 0,
    new: 0,
    thisMonth: 0,
  },
};

interface UserContextTypes {
  state: UserInitialStateTypes;
  dispatch: React.Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const UserReducer = (
  state: UserInitialStateTypes,
  action: UserAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    //// GET ME
    case UserActionKind.GETME_START:
      return { ...state, loading: true, error: null };
    case UserActionKind.GETME_SUCCESS:
      localStorage.setItem("persist", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case UserActionKind.GETME_FAILURE:
      localStorage.removeItem("persist");
      localStorage.removeItem("user");
      return { ...state, user: null, loading: false, error: action.error! };

    //// UPDATE ME
    case UserActionKind.UPDATE_ME_START:
      return { ...state, updateMeLoading: true, error: null };
    case UserActionKind.UPDATE_ME_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        updateMeLoading: false,
        error: null,
      };
    case UserActionKind.UPDATE_ME_FAILURE:
      return { ...state, updateMeLoading: false, error: action.error! };

    //// CHANGE PASSWORD
    case UserActionKind.CHANGE_PASSWORD_START:
      return { ...state, changePassLoading: true, error: null };
    case UserActionKind.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassLoading: false,
        error: null,
      };
    case UserActionKind.CHANGE_PASSWORD_FAILURE:
      return { ...state, changePassLoading: false, error: action.error! };

    //// VERIFY
    case UserActionKind.VERIFY_START:
      return { ...state, user: null, verifyLoading: true, error: null };
    case UserActionKind.VERIFY_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        verifyLoading: false,
        error: null,
      };
    case UserActionKind.VERIFY_FAILURE:
      return {
        ...state,
        user: null,
        verifyLoading: false,
        error: action.error!,
      };

    //// RESET PASSWORD
    case UserActionKind.RESET_PASSWORD_START:
      return { ...state, user: null, resetLoading: true, error: null };
    case UserActionKind.RESET_PASSWORD_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        resetLoading: false,
        error: null,
      };
    case UserActionKind.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        user: null,
        resetLoading: false,
        error: action.error as string,
      };

    ///// ADMIN
    case UserActionKind.GET_CUSTOMERS_START:
      return { ...state, customersLoading: true, error: null };
    case UserActionKind.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload as User[],
        customersLoading: false,
        error: null,
      };
    case UserActionKind.GET_CUSTOMERS_FAILURE:
      return { ...state, customersLoading: false, error: action.error! };

    case UserActionKind.GET_CUSTOMERS_STATS_START:
      return { ...state, error: null };
    case UserActionKind.GET_CUSTOMERS_STATS_SUCCESS:
      return {
        ...state,
        customersStats: action.payload as CustomersStatsTypes,
        error: null,
      };
    case UserActionKind.GET_CUSTOMERS_STATS_FAILURE:
      return { ...state, error: action.error! };

    case UserActionKind.GET_CUSTOMER_START:
      return { ...state, customerLoading: true, error: null };
    case UserActionKind.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload as User,
        customerLoading: false,
        error: null,
      };
    case UserActionKind.GET_CUSTOMER_FAILURE:
      return { ...state, customerLoading: false, error: action.error! };

    default:
      return state;
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const { auth } = useContext(AuthContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();

    const getUser = async () => {
      try {
        const { data } = await axiosPrivate.get("/users/me");
        isMounted &&
          dispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });
      } catch (err) {
        console.error(err);
        dispatch({
          type: UserActionKind.GETME_FAILURE,
          payload: err.name,
        });
      }
    };

    auth.accessToken && getUser();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, [auth.accessToken, axiosPrivate]);

  const values = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
