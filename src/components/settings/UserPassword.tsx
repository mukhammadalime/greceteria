import { FormEvent, useContext, useRef } from "react";
import PasswordInput from "../UI/Inputs/PasswordInput";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserPassword = () => {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const {
    state: { loading, user },
    dispatch,
  } = useContext(AuthContext);

  const onChangeMyPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentPassword = currentPasswordRef.current?.value;
    const password = newPasswordRef.current?.value;
    const passwordConfirm = newPasswordConfirmRef.current?.value;

    if (!currentPassword || !password || !passwordConfirm) return;

    try {
      dispatch({ type: AuthActionKind.CHANGE_PASSWORD_START });

      const { data } = await axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
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

  return (
    <div className="user-password">
      <div className="address-book__header-2">Change Password</div>
      <form
        className="user-password__form"
        onSubmit={onChangeMyPasswordHandler}
      >
        <PasswordInput label="Current Password*" ref={currentPasswordRef} />
        <div className="new-passwords">
          <PasswordInput label="New Password*" ref={newPasswordRef} />
          <PasswordInput
            label="Confirm Password*"
            ref={newPasswordConfirmRef}
          />
        </div>
        <button className="button button-md" disabled={loading && true}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default UserPassword;
