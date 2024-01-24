import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/UI/Inputs/TextInput";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";

const Signup = () => {
  const [agreement, setAgreement] = useState(false);

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Create Account</h6>
          <form className="form">
            <TextInput
              label="Your name*"
              placeholder="Laura Wilson"
              type="text"
            />
            <TextInput
              label="Your username*"
              placeholder="laurawilson"
              type="text"
            />
            <TextInput
              label="Your email*"
              placeholder="laurawilson@example.com"
              type="email"
            />
            <PasswordInput label="Password*" />
            <PasswordInput label="Confirm Password*" />
            <div className="form__content">
              <div className="form-check radio-input">
                <input
                  type="checkbox"
                  id="terms"
                  onClick={() => setAgreement(!agreement)}
                />
                <label htmlFor="terms">
                  <span className={`${agreement && "clicked"}`}></span>
                  Accept All Terms & Conditions*
                </label>
              </div>
            </div>
            <Link to="/auth/verify" className="button form__button">
              Create Account
            </Link>
            <div className="form__signup">
              Already have account?{" "}
              <Link to="/auth/login" className="form__signup--text">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
