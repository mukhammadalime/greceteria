import { useState } from "react";
import { Link } from "react-router-dom";
import AddressList from "../addresses/AddressList";
import AddAddressModal from "../modals/AddAddressModal";

const UserDetails = () => {
  const [addressModalShown, setAddressModalShown] = useState(() => false);

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}
      <div className="user__details">
        <div className="user__details--left">
          <img src="/assets/images/users/default.jpg" alt="" />
          <div className="user__details--info">
            <h5>Laura Wilson</h5>
            <p>laurawilson</p>
            <p>laurawilson@gmail.com</p>
            <div className="user__details--edit">
              <Link to="/settings">Edit Profile </Link>
            </div>
          </div>
        </div>
        <AddressList
          select={false}
          onOpenAddressModal={() => setAddressModalShown(true)}
          filledButton={false}
        />
      </div>
    </>
  );
};

export default UserDetails;
