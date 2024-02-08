import TextInput from "../UI/Inputs/TextInput";
import { User } from "../../utils/user-types";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

const AccountSettings = ({ user }: { user: User | null }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    user?.phoneNumber || ""
  );

  const [countryCode, setCountryCode] = useState<any>();

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

    fetchCountry();
  }, []);

  return (
    <div className="account-settings">
      <div className="address-book__header-2">Account Settings</div>
      <div className="account-settings__form">
        <form className="account-settings__inputs">
          <TextInput label="Name" placeholder={""} defaultValue={user?.name} />
          <TextInput
            label="Username"
            defaultValue={user?.username}
            placeholder={""}
          />
          <TextInput
            label="Email"
            defaultValue={user?.email}
            type="email"
            placeholder={""}
          />
          {/* Third-party phone number input (npm package) */}
          <div className="input">
            <label htmlFor="Receiver phone number">Receiver phone number</label>
            <PhoneInput
              placeholder="Receiver phone number"
              value={"+" + phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry={countryCode || "KR"}
              error={
                phoneNumber && isPossiblePhoneNumber(phoneNumber)
                  ? "true"
                  : "false"
              }
            />
          </div>

          <button className="button button-md">Save Changes</button>
        </form>
        <div className="account-settings__photo">
          <img src={user?.photo} alt="" />
          <label htmlFor="photo" className="button button__outline">
            Change Image
          </label>
          <input id="photo" type="file" accept="image/*" />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
