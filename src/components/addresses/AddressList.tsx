import { useState } from "react";
import AddressItem from "./AddressItem";
import { AddressItemTypes } from "../../utils/types";

const addresses: AddressItemTypes[] = [
  {
    id: "1",
    receiverName: "Laura Wilson",
    address1: "4140 Parker Rd. Allentown",
    city: "New Mexico",
    postalCode: 31134,
    phoneNumber: 821054678921,
  },
  {
    id: "2",
    receiverName: "Ameila",
    address1: "5250 Parker Rd. Allentown",
    city: "California",
    postalCode: 35522,
    phoneNumber: 821054678921,
  },
  {
    id: "3",
    receiverName: "Muhammadali",
    address1: "5250 Parker Rd. Allentown",
    city: "New York",
    postalCode: 23451,
    phoneNumber: 821057012806,
  },
];

const AddressList = ({
  select,
  filledButton,
  onOpenAddressModal,
  headerTwo,
}: AddressListTypes) => {
  const [selectedAddress, setSelectedAddress] = useState(() => "1");
  const selectAddress = (value: string) => {
    setSelectedAddress(value);
  };

  return (
    <div className="address-book">
      <div className={`address-book__header${headerTwo ? "-2" : ""}`}>
        Shipping Addresses
      </div>

      {addresses.length !== 0 && (
        <div className="address-book__items">
          {addresses.map((item: AddressItemTypes) => (
            <AddressItem
              key={item.id}
              {...item}
              select={select}
              selectedAddress={selectedAddress}
              selectAddress={selectAddress}
            />
          ))}
        </div>
      )}

      {addresses.length === 0 && (
        <div className="address-book__items no-address-box">
          <p className="no-addresses">No addresses yet</p>
        </div>
      )}

      <div className="address-book__bottom">
        {filledButton ? (
          <button
            className="button button-md"
            onClick={onOpenAddressModal}
            children="Add New Address"
          />
        ) : (
          <span onClick={onOpenAddressModal}>Add New Address</span>
        )}
      </div>
    </div>
  );
};

interface AddressListTypes {
  select: boolean;
  filledButton: boolean;
  onOpenAddressModal?: () => void;
  headerTwo?: boolean;
}

export default AddressList;
