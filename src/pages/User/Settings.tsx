import { useContext, useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import UserPassword from "../../components/settings/UserPassword";
import DashboardNav from "../../components/dashboard/DashboardNav";
import AddAddressModal from "../../components/modals/AddAddressModal";
import AccountSettings from "../../components/settings/AccountSettings";
import { AuthContext } from "../../store/AuthContext";

const Settings = () => {
  const [addressModalShown, setAddressModalShown] = useState(false);
  const { state } = useContext(AuthContext);

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
              <AccountSettings user={state.user} />
              {/* /////////////////////////////////// */}
              <div className="user-addresses">
                <AddressList
                  select={false}
                  onOpenAddressModal={() => setAddressModalShown(true)}
                  filledButton={true}
                  headerTwo
                  addresses={state.user?.addresses || []}
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
