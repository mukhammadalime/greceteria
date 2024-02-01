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
          <div className="settings dashboard">
            <DashboardNav activeNavItem="Settings" />
            <div className="dashboard__main">
              <AccountSettings />
              {/* /////////////////////////////////// */}
              <div className="user-addresses">
                <AddressList
                  select={false}
                  onOpenAddressModal={() => setAddressModalShown(true)}
                  filledButton={true}
                  headerTwo
                />
              </div>
              {/* /////////////////////////////////// */}
              <UserPassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
