import { useState } from "react";
import { Link } from "react-router-dom";
import AddressList from "../addresses/AddressList";
import AddAddressModal from "../modals/AddAddressModal";
import { User } from "../../utils/user-types";

const UserDetails = ({ user }: { user: User }) => {
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
          <img src={user.photo} alt="" />
          <div className="user__details--info">
            <h5>{user.name}</h5>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <div className="user__details--edit">
              <Link to="/settings">Edit Profile </Link>
            </div>
          </div>
        </div>
        <AddressList
          select={false}
          onOpenAddressModal={() => setAddressModalShown(true)}
          filledButton={false}
          addresses={user.addresses}
        />
      </div>
    </>
  );
};

export default UserDetails;
