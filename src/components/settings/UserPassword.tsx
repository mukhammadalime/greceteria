import PasswordInput from "../UI/Inputs/PasswordInput";

const UserPassword = () => {
  return (
    <div className="user-password">
      <div className="address-form__header">Change Password</div>
      <form className="user-password__form">
        <PasswordInput label="Current Password*" />
        <div className="new-passwords">
          <PasswordInput label="New Password*" />
          <PasswordInput label="Confirm Password*" />
        </div>
        <button className="button button-md">Change Password</button>
      </form>
    </div>
  );
};

export default UserPassword;
