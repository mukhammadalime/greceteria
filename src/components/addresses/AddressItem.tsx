import { useState } from "react";
import AddAddressModal from "../modals/AddAddressModal";

const AddressItem = (props: {
  selectAddress: (id: number) => void;
  name: string;
  address: string;
  phoneNumber: string;
  select: boolean;
  id: number;
  selectedAddress: any;
}) => {
  const [addressModalShown, setAddressModalShown] = useState(() => false);

  const selectAddress = (e: any) => {
    props.selectAddress(Number(e.target.dataset.id));
  };

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Edit Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}

      <div className="address-book__item" key={props.name}>
        <h5>{props.name}</h5>
        <p>{props.address}</p>
        <span>{props.phoneNumber}</span>
        {/* It is for dashboard and settings pages */}
        {!props.select && (
          <h2
            className="address-book__edit"
            onClick={() => setAddressModalShown(true)}
            children="Edit Address"
          />
        )}

        {/* It is for checkout page with select option */}
        {props.select && (
          <span
            data-id={props.id}
            onClick={selectAddress}
            className={`address-book__select ${
              props.selectedAddress === props.id && "selected"
            }`}
          ></span>
        )}
      </div>
    </>
  );
};

export default AddressItem;
