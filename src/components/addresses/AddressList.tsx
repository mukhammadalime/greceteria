import { useState } from "react";
import AddressItem from "./AddressItem";

const addresses = [
  {
    id: 1,
    name: "Laura Wilson",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    phoneNumber: "+82 1054678921",
  },
  {
    id: 2,
    name: "Amelia",
    address: "5250 Parker Rd. Allentown, California 35522",
    phoneNumber: "+82 1054678921",
  },
  {
    id: 3,
    name: "Laura",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    phoneNumber: "+82 1054653921",
  },
];

const AddressList = ({ select }: { select: boolean }) => {
  const [selectedAddress, setSelectedAddress] = useState(() => 1);
  const selectAddress = (value: any) => {
    setSelectedAddress(value);
  };

  return (
    <div className="address-book">
      {addresses.length !== 0 && (
        <div className="address-book__items">
          {addresses.map((item) => (
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
    </div>
  );
};

export default AddressList;
