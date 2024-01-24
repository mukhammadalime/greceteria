import { useNavigate } from "react-router-dom";
import TextInput from "../../components/UI/Inputs/TextInput";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Enter your email</h6>
          <form className="form">
            <TextInput
              text="Your email"
              placeholder="laurawilson@example.com"
              type="email"
            />
            <div
              onClick={() => navigate("/auth/reset-password")}
              className="button form__button"
              children="Enter"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
