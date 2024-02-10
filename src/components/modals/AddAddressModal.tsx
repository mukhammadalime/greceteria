import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import { useContext, useEffect, useRef, useState } from "react";
import TextInput from "../UI/Inputs/TextInput";
import { AddressItemTypes } from "../../utils/user-types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import PhoneNumber, { CountryCode } from "libphonenumber-js";
import { toast } from "react-toastify";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import axios from "axios";

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
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const {
    state: { loading, user },
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

    fetchCountry();
  }, []);

  const validatePhoneNumber = (number: string, code: CountryCode) => {
    return PhoneNumber(number, code)!.isValid() ? true : false;
  };

  const onUpdateOrDeleteOrAddAddress = async (
    actionType: "update" | "delete" | "add"
  ) => {
    if (!user) return;

    // 1. Get all values from input
    const name = nameRef.current?.value!;
    const city = cityRef.current?.value!;
    const address1 = address1Ref.current?.value!;
    const address2 = address2Ref.current?.value!;
    const postalCode = Number(postalCodeRef.current?.value!);

    let newAddresses: AddressItemTypes[] = [];

    // Check if phonenumber is in correct format.
    if (phoneNumber && !validatePhoneNumber(phoneNumber, countryCode!)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const newAddress: AddressItemTypes = {
      name,
      phoneNumber: phoneNumber!,
      city,
      address1,
      address2,
      postalCode,
    };

    switch (actionType) {
      case "delete":
        newAddresses = user?.addresses.filter(
          (item) => item._id !== addressItem?._id
        );
        break;

      case "add":
        user.addresses.length > 0
          ? (newAddresses = [...user?.addresses!, newAddress])
          : (newAddresses = [newAddress]);
        break;

      case "update":
        if (user.addresses.length === 1) newAddresses = [newAddress];
        else if (user.addresses.length > 1) {
          // Find the index of the updating address and replaces it with new updated address
          const updatingAddressIndex = user.addresses.findIndex(
            (item) => item._id === addressItem?._id
          );
          const userAddressesCopy = [...user.addresses];
          userAddressesCopy[updatingAddressIndex] = newAddress;
          newAddresses = userAddressesCopy;
        }
        break;

      default:
        break;
    }

    // The same for all action types
    try {
      dispatch({ type: AuthActionKind.UPDATE_ME_START });
      const { data } = await axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        method: "PATCH",
        url: "http://localhost:8000/api/v1/users/updateMe",
        data: { addresses: newAddresses },
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
    closeModal();
  };

  return (
    <div className="address-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Your name*"
            placeholder="Your name"
            defaultValue={addressItem?.name || ""}
            ref={nameRef}
          />

          {/* Third-party phone number input (npm package) */}
          <div className="input">
            <label htmlFor="Receiver phone number">
              Receiver phone number*
            </label>

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
        </div>
        <div className="form-inputs">
          <TextInput
            label="Your city*"
            placeholder="Your city"
            defaultValue={addressItem?.city || ""}
            ref={cityRef}
          />
          <TextInput
            label="Postal code*"
            placeholder="Postal code"
            defaultValue={JSON.stringify(addressItem?.postalCode)}
            ref={postalCodeRef}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            label="Address*"
            placeholder="Receiver address"
            defaultValue={addressItem?.address1 || ""}
            ref={address1Ref}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            span={<span>(Optional)</span>}
            label="Additional address"
            placeholder="Additional address"
            defaultValue={addressItem?.address2 || ""}
            ref={address2Ref}
          />
        </div>
      </div>
      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onUpdateOrDeleteOrAddAddress.bind(null, "add")}
        onUpdateHandler={onUpdateOrDeleteOrAddAddress.bind(null, "update")}
        onDeleteHandler={onUpdateOrDeleteOrAddAddress.bind(null, "delete")}
        loading={loading}
      />
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
