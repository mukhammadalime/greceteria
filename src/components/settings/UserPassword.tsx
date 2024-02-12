import { FormEvent, useContext, useRef } from "react";
import PasswordInput from "../UI/Inputs/PasswordInput";
import { AuthContext } from "../../store/AuthContext";
import { changeMyPassword } from "../../api/auth";

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

    await changeMyPassword(
      dispatch,
      currentPasswordRef,
      newPasswordRef,
      newPasswordConfirmRef,
      user?.token
    );
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
