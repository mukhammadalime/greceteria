import PasswordInput from "../../components/UI/Inputs/PasswordInput";

const ResetPassword = () => {
  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Reset Password</h6>
          <form className="form">
            <PasswordInput label="Password" placeholder="Password" />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
            />
            <div className="button form__button">Reset Password</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
