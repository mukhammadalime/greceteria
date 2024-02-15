import axios from "axios";
import { AuthAction, AuthActionKind } from "../store/AuthContext";
import { toast } from "react-toastify";
import PhoneNumber, { CountryCode } from "libphonenumber-js";

export const getUserApi = async (dispatch: React.Dispatch<AuthAction>) => {
  if (JSON.parse(localStorage.getItem("user")!) === null) return;
  dispatch({ type: AuthActionKind.GETME_START });

  try {
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")!).token
        }`,
      },
      method: "GET",
      url: "http://localhost:8000/api/v1/users/me",
    });

    const userData = { token: data.token, ...data.user };
    dispatch({ type: AuthActionKind.GETME_SUCCESS, payload: userData });
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.GETME_FAILURE,
      error: err.response.data.message,
    });
  }
};

export const login = async (
  dispatch: React.Dispatch<AuthAction>,
  userData: { username: string | undefined; password: string | undefined },
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  const { username, password } = userData;

  if (!username || !password) toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: AuthActionKind.LOGIN_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:8000/api/v1/users/login",
      data: { username, password },
    });

    dispatch({
      type: AuthActionKind.LOGIN_SUCCESS,
      payload: { token: data.token, ...data.user },
    });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");
    window.location.reload();
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.LOGIN_FAILURE,
      error: err.response.data.message,
    });

    if (err.response.data.message.startsWith("Your account")) {
      navigate(`/auth/verify?username=${username}`);
    }

    toast.error(err.response.data.message);
  }
};

export const logout = async (
  dispatch: React.Dispatch<AuthAction>,
  token: string | undefined
) => {
  try {
    await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: "http://localhost:8000/api/v1/users/logout",
    });

    dispatch({ type: AuthActionKind.LOGOUT });
    localStorage.removeItem("user");
    window.location.reload();
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
};

export const signup = async (
  dispatch: React.Dispatch<AuthAction>,
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
    dispatch({ type: AuthActionKind.SIGNUP_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:8000/api/v1/users/signup",
      data: { name, username, email, password, passwordConfirm },
    });

    dispatch({ type: AuthActionKind.SIGNUP_SUCCESS });
    toast.success(data.message);
    if (location.search !== "") {
      navigate(`/auth/verify${location.search}&username=${data.username}`);
    } else {
      navigate(`/auth/verify?username=${data.username}`);
    }
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.SIGNUP_FAILURE,
      error: err.response.data.message,
    });

    toast.error(err.response.data.message);
  }
};

export const verify = async (
  dispatch: React.Dispatch<AuthAction>,
  verificationCode: string,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  if (!/^\d*$/.test(verificationCode)) {
    return toast.warning("Please enter only numbers");
  }

  try {
    dispatch({ type: AuthActionKind.VERIFY_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:8000/api/v1/users/verify",
      data: { verificationCode },
    });

    dispatch({
      type: AuthActionKind.VERIFY_SUCCESS,
      payload: { token: data.token, ...data.user },
    });

    toast.success("You`ve successfully registered.");

    if (location.search.startsWith("?next-page")) {
      navigate(`/${String(location.search.match(/(?<==\s*).*?(?=\s*&)/gs))}`);
    } else navigate("/home");
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.VERIFY_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const sendCodeAgain = async (
  dispatch: React.Dispatch<AuthAction>,
  setCode: (i: string) => void,
  location: { search: string }
) => {
  try {
    dispatch({ type: AuthActionKind.SEND_V_CODE_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:8000/api/v1/users/send-code-again",
      data: { username: location.search.split("=").pop() },
    });

    dispatch({ type: AuthActionKind.SEND_V_CODE_SUCCESS });
    toast.success(data.message);
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.SEND_V_CODE_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }

  setCode("");
};

export const forgotPassword = async (
  dispatch: React.Dispatch<AuthAction>,
  email: string | undefined,
  location: { search: string }
) => {
  if (!email) toast.warning("Please enter the email.");
  try {
    dispatch({ type: AuthActionKind.FORGOT_PASSWORD_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:8000/api/v1/users/forgotPassword",
      data: { email, searchLink: location.search },
    });

    dispatch({ type: AuthActionKind.FORGOT_PASSWORD_SUCCESS });
    toast.success(data.message);
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.FORGOT_PASSWORD_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const resetPassword = async (
  dispatch: React.Dispatch<AuthAction>,
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
    dispatch({ type: AuthActionKind.RESET_PASSWORD_START });

    const { data } = await axios({
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      url: `http://localhost:8000/api/v1/users/resetPassword/${resetToken}`,
      data: { password, passwordConfirm },
    });

    dispatch({
      type: AuthActionKind.RESET_PASSWORD_SUCCESS,
      payload: { token: data.token, ...data.user },
    });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");

    toast.success("Password has been successfully reset.");
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.RESET_PASSWORD_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const checkResetTokenExistApi = async (
  resetToken: string | undefined,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  try {
    await axios({
      headers: { "Content-Type": "application/json" },
      method: "GET",
      url: `http://localhost:8000/api/v1/users/checkResetToken/${resetToken}`,
    });
  } catch (err: any) {
    toast.error(
      err.response.data.message +
        '. You will be redirected to the "Forgot password" page in 5 seconds.'
    );

    setTimeout(() => navigate(`/auth/forgot-password${location.search}`), 5000);
  }
};

export const updateMe = async (
  dispatch: React.Dispatch<AuthAction>,
  userData: {
    phoneNumber: string | undefined;
    name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    photoRef: React.RefObject<HTMLInputElement>;
    countryCode: CountryCode | undefined;
    token: string | undefined;
  }
) => {
  const validatePhoneNumber = (number: string, code: CountryCode) => {
    return PhoneNumber(number, code)!.isValid() ? true : false;
  };

  const { phoneNumber, name, username, email, photoRef, countryCode, token } =
    userData;

  // Check if phonenumber is in correct format.
  if (phoneNumber) {
    if (!validatePhoneNumber(phoneNumber, countryCode!)) {
      toast.warning("Please enter a valid phone number.");
      return;
    }
  }

  const formData = new FormData();
  formData.append("phoneNumber", phoneNumber ? (phoneNumber as string) : "");
  formData.append("name", name as string);
  formData.append("username", username as string);
  formData.append("email", email as string);
  const userPhoto = photoRef.current?.files![0]
    ? (photoRef.current.files[0] as Blob)
    : "";
  formData.append("photo", userPhoto);

  try {
    dispatch({ type: AuthActionKind.UPDATE_ME_START });

    const { data } = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: "http://localhost:8000/api/v1/users/updateMe",
      data: formData,
    });

    dispatch({
      type: AuthActionKind.UPDATE_ME_SUCCESS,
      payload: { token: token, ...data.user },
    });
    toast.success("Your data's been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.UPDATE_ME_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }
};

export const changeMyPassword = async (
  dispatch: React.Dispatch<AuthAction>,
  currentPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordConfirmRef: React.RefObject<HTMLInputElement>,
  token: string | undefined
) => {
  const currentPassword = currentPasswordRef.current?.value;
  const password = newPasswordRef.current?.value;
  const passwordConfirm = newPasswordConfirmRef.current?.value;

  if (!currentPassword || !password || !passwordConfirm)
    return toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: AuthActionKind.CHANGE_PASSWORD_START });

    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      url: "http://localhost:8000/api/v1/users/updateMyPassword",
      data: { currentPassword, password, passwordConfirm },
    });

    dispatch({
      type: AuthActionKind.CHANGE_PASSWORD_SUCCESS,
      payload: { token: data.token, ...data.user },
    });
    toast.success("Your data's been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: AuthActionKind.CHANGE_PASSWORD_FAILURE,
      error: err.response.data.message,
    });
    toast.error(err.response.data.message);
  }

  currentPasswordRef.current.value = "";
  newPasswordRef.current.value = "";
  newPasswordConfirmRef.current.value = "";
};

export const getCountryCode = async (
  setCountryCode: (code: CountryCode | undefined) => void
) => {
  try {
    // Fetch the user's IP-based location
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country);
  } catch (error) {
    console.error("Error fetching country:", error);
  }
};
