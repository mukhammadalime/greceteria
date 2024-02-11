import TextInput from "../UI/Inputs/TextInput";
import { User } from "../../utils/user-types";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneNumber, { CountryCode } from "libphonenumber-js";

const AccountSettings = ({ user }: { user: User | null }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    user?.phoneNumber || ""
  );
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const nameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = URL.createObjectURL((e.target as HTMLInputElement).files![0]);
    setUploadedImage(image);
  };

  const {
    state: { loading },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Fetch the user's IP-based location
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setCountryCode(data.country);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    user?.phoneNumber === undefined && fetchCountry();
  }, [user?.phoneNumber]);

  const validatePhoneNumber = (number: string, code: CountryCode) => {
    return PhoneNumber(number, code)!.isValid() ? true : false;
  };

  const onUpdateMeHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = userNameRef.current?.value;
    const email = emailRef.current?.value;

    // Check if phonenumber is in correct format.
    if (phoneNumber) {
      if (!validatePhoneNumber(phoneNumber, countryCode!)) {
        toast.error("Please enter a valid phone number.");
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
          Authorization: `Bearer ${user?.token}`,
        },
        method: "PATCH",
        url: "http://localhost:8000/api/v1/users/updateMe",
        data: formData,
      });

      dispatch({
        type: AuthActionKind.UPDATE_ME_SUCCESS,
        payload: { token: user?.token, ...data.user },
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

  return (
    <div className="account-settings">
      <div className="address-book__header-2">Account Settings</div>
      <div className="account-settings__form">
        <form className="account-settings__inputs" onSubmit={onUpdateMeHandler}>
          <TextInput
            label="Name"
            placeholder={""}
            defaultValue={user?.name}
            ref={nameRef}
          />
          <TextInput
            label="Username"
            defaultValue={user?.username}
            placeholder={""}
            ref={userNameRef}
          />
          <TextInput
            label="Email"
            defaultValue={user?.email}
            type="email"
            placeholder={""}
            ref={emailRef}
          />
          {/* Third-party phone number input (npm package) */}
          <div className="input">
            <label htmlFor="Receiver phone number">Receiver phone number</label>
            <PhoneInput
              placeholder="Receiver phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              onCountryChange={setCountryCode}
              defaultCountry={countryCode || "KR"}
              international
              countryCallingCodeEditable={false}
            />
          </div>

          <button className="button button-md" disabled={loading && true}>
            Save Changes
          </button>
        </form>
        <div className="account-settings__photo">
          <img src={uploadedImage ? uploadedImage : user?.photo} alt="" />
          <label htmlFor="photo" className="button button__outline">
            Change Image
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            ref={photoRef}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
