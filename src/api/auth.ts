import { toast } from "react-toastify";
import axios, { axiosPrivate } from "./axios";
import { UserAction, UserActionKind } from "../store/UserContext";

export const login = async (
  location: { search: string },
  navigate: (arg: string) => void,
  dispatch: React.Dispatch<UserAction>,
  userData: {
    username?: string;
    password?: string;
    token?: string;
    email?: string;
  }
) => {
  try {
    const { data } = await axios.post(
      `/users/login${userData.token ? `?token=${userData.token}` : ""}`,
      {
        username: userData?.username,
        email: userData?.email,
        password: userData?.password,
      }
    );
    dispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");
    window.location.reload();
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: UserActionKind.GETME_FAILURE, error });
    if (
      err.response?.data.message.startsWith("Your account") &&
      !userData.token
    )
      navigate(`/auth/verify?username=${userData?.username}`);

    toast.error(error);
  }
};

export const logout = async () => {
  try {
    await axiosPrivate.get("/users/logout");

    localStorage.removeItem("persist");
    localStorage.removeItem("user");
    window.location.reload();
  } catch (err: any) {
    toast.error(err.response?.data?.message);
  }
};

export const signup = async (
  userData: {
    username: string | undefined;
    password: string | undefined;
    name: string | undefined;
    email: string | undefined;
    passwordConfirm: string | undefined;
    agreement: boolean | undefined;
  },
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  const { username, password, name, email, passwordConfirm, agreement } =
    userData;

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !passwordConfirm ||
    !agreement
  ) {
    return toast.warning("Please fill in all the inputs.");
  }
  try {
    const userData = { name, username, email, password, passwordConfirm };

    const { data } = await axios.post("/users/signup", userData);

    toast.success(data.message);
    if (location.search !== "") {
      navigate(`/auth/verify${location.search}&username=${data.username}`);
    } else {
      navigate(`/auth/verify?username=${data.username}`);
    }
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const verify = async (
  dispatch: React.Dispatch<UserAction>,
  verificationCode: string,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  if (!/^\d*$/.test(verificationCode)) {
    toast.warning("Please enter only numbers");
    return;
  }

  try {
    dispatch({ type: UserActionKind.VERIFY_START });

    const { data } = await axios.post("/users/verify", {
      verificationCode,
    });

    dispatch({ type: UserActionKind.VERIFY_SUCCESS, payload: data.user });

    toast.success("You`ve successfully registered.");

    if (location.search.startsWith("?next-page")) {
      navigate(`/${String(location.search.match(/(?<==\s*).*?(?=\s*&)/gs))}`);
    } else navigate("/home");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.VERIFY_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const sendCodeAgain = async (
  setCode: (i: string) => void,
  location: { search: string }
) => {
  try {
    const { data } = await axios.post("/users/send-code-again", {
      username: location.search.split("=").pop(),
    });

    toast.success(data.message);
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }

  setCode("");
};

export const forgotPassword = async (
  email: string | undefined,
  location: { search: string }
) => {
  if (!email) toast.warning("Please enter the email.");
  try {
    const requestData = { email, searchLink: location.search };
    const { data } = await axios.post("users/forgotPassword", requestData);
    localStorage.setItem("forgotPassSuccess", JSON.stringify(true));
    toast.success(data.message);
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const resetPassword = async (
  dispatch: React.Dispatch<UserAction>,
  passwords: {
    password: string | undefined;
    passwordConfirm: string | undefined;
  },
  resetToken: string | undefined,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  const { password, passwordConfirm } = passwords;
  if (!passwordConfirm || !password)
    toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: UserActionKind.RESET_PASSWORD_START });
    const { data } = await axios.patch(`/users/resetPassword/${resetToken}`, {
      password,
      passwordConfirm,
    });

    dispatch({
      type: UserActionKind.RESET_PASSWORD_SUCCESS,
      payload: data.user,
    });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");

    localStorage.removeItem("forgotPassSuccess");
    toast.success("Password has been successfully reset.");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.RESET_PASSWORD_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const checkResetTokenExistApi = async (
  resetToken: string | undefined,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  try {
    await axios(`/users/checkResetToken/${resetToken}`);
  } catch (err: any) {
    toast.error(
      err.response?.data.message +
        '. You will be redirected to the "Forgot password" page in 5 seconds.'
    );

    localStorage.removeItem("forgotPassSuccess");
    setTimeout(() => navigate(`/auth/forgot-password${location.search}`), 5000);
  }
};

export const changeMyPassword = async (
  dispatch: React.Dispatch<UserAction>,
  currentPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordConfirmRef: React.RefObject<HTMLInputElement>
) => {
  const currentPassword = currentPasswordRef.current?.value;
  const password = newPasswordRef.current?.value;
  const passwordConfirm = newPasswordConfirmRef.current?.value;

  if (!currentPassword || !password || !passwordConfirm)
    return toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: UserActionKind.CHANGE_PASSWORD_START });

    const { data } = await axiosPrivate.patch("/users/updateMyPassword", {
      currentPassword,
      password,
      passwordConfirm,
    });

    dispatch({
      type: UserActionKind.CHANGE_PASSWORD_SUCCESS,
      payload: data.user,
    });
    toast.success("Your password's been successfully updated.");

    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    newPasswordConfirmRef.current.value = "";
  } catch (err: any) {
    dispatch({
      type: UserActionKind.CHANGE_PASSWORD_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
