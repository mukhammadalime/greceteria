import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/UI/Inputs/TextInput";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Sign in</h6>
          <form className="form">
            <div className="third-party-login">
              <button>
                <img src="/assets/icons/google-icon.svg" alt="" /> Google
              </button>
              <button>
                <img src="/assets/icons/github-icon.svg" alt="" /> GitHub
              </button>
            </div>
            <div className="or">or</div>
            <TextInput
              label="Email | Username"
              placeholder="Email | Username"
              type="email"
            />
            <PasswordInput label="Password" placeholder="Password" />
            <div className="form__content">
              <h4 onClick={() => navigate("/auth/forgot-password")}>
                Forgot you password?
              </h4>
            </div>
            <div className="button form__button">Sign in</div>
            <div className="form__signup">
              Don't have account?{" "}
              <Link to="/auth/signup" className="form__signup--text">
                Sing up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
