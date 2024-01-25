import { useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import UserPassword from "../../components/settings/UserPassword";
import DashboardNav from "../../components/dashboard/DashboardNav";
import AddAddressModal from "../../components/modals/AddAddressModal";
import AccountSettings from "../../components/settings/AccountSettings";

const Settings = () => {
  const [addressModalShown, setAddressModalShown] = useState(false);

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}
      <div className="section-lg">
        <div className="container">
          <div className="settings">
            <DashboardNav activeNavItem="Settings" />
            <div className="settings__main">
              <div className="container">
                <AccountSettings />
                {/* /////////////////////////////////// */}
                <div className="user-addresses">
                  <div className="address-book__header">Shipping Addresses</div>
                  <AddressList select={false} />
                  <div className="address-book__bottom">
                    <button
                      className="button button-md"
                      onClick={() => setAddressModalShown(true)}
                      children="Add New Address"
                    />
                  </div>
                </div>
                {/* /////////////////////////////////// */}
                <UserPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
