import { useState } from "react";
import AddAddressModal from "../modals/AddAddressModal";
import { AddressItemTypes } from "../../utils/types";

const AddressItem = (props: Combined) => {
  const [addressModalShown, setAddressModalShown] = useState(() => false);

  const selectAddress = (e: React.MouseEvent<HTMLSpanElement>) => {
    props.selectAddress((e.target as HTMLSpanElement).dataset.id!);
  };

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Edit Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}

      <div className="address-book__item" key={props.id}>
        <h5>{props.receiverName}</h5>
        <p>{`${props.address1}, ${props.address2}, ${props.city}, ${props.postalCode}, `}</p>
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

interface PropsTypes {
  selectAddress: (id: string) => void;
  select: boolean;
  selectedAddress: string;
}

interface Combined extends PropsTypes, AddressItemTypes {}

export default AddressItem;
