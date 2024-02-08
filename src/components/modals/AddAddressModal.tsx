import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import { useEffect, useState } from "react";
import TextInput from "../UI/Inputs/TextInput";
import { AddressItemTypes } from "../../utils/user-types";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddAddressOverlay = ({
  addressItem,
  text,
  closeModal,
}: {
  text: string;
  closeModal: () => void;
  addressItem?: AddressItemTypes;
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    addressItem?.phoneNumber!
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
    <div className="address-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Your name*"
            placeholder="Your name"
            defaultValue={addressItem?.name || ""}
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
        </div>
        <div className="form-inputs">
          <TextInput
            label="Your city*"
            placeholder="Your city"
            defaultValue={addressItem?.city || ""}
          />
          <TextInput
            label="Postal code*"
            placeholder="Postal code"
            defaultValue={JSON.stringify(addressItem?.postalCode)}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            label="Address*"
            placeholder="Receiver address"
            defaultValue={addressItem?.address1 || ""}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            span={<span>(Optional)</span>}
            label="Additional address"
            placeholder="Additional address"
            defaultValue={addressItem?.address2 || ""}
          />
        </div>
      </div>
      <ModalActions closeModal={closeModal} text={text} />
    </div>
  );
};

const AddAddressModal = (props: {
  text: string;
  closeModal: () => void;
  addressItem?: AddressItemTypes;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddAddressOverlay
          text={props.text}
          closeModal={props.closeModal}
          addressItem={props.addressItem}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default AddAddressModal;
