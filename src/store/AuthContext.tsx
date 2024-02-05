import { createContext, useEffect, useReducer } from "react";
import { User } from "../utils/user-types";

interface AuthInitialStateTypes {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum AuthActionKind {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

// type AuthActionKind = "LOGIN_START" | "LOGIN_SUCCESS"

// An interface for our actions
export interface AuthAction {
  type: AuthActionKind;
  payload?: User | null;
  error?: string;
}

const INITIAL_STATE: AuthInitialStateTypes = {
  user: JSON.parse(localStorage.getItem("user")!) || null,
  loading: false,
  error: null,
};

export interface AuthContextTypes {
  state: AuthInitialStateTypes;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const AuthReducer = (
  state: AuthInitialStateTypes,
  action: AuthAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case AuthActionKind.LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case AuthActionKind.LOGIN_SUCCESS:
      return {
        user: action.payload!,
        loading: false,
        error: null,
      };
    case AuthActionKind.LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.error!,
      };
    case AuthActionKind.LOGOUT:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
