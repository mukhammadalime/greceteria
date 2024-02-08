import { useContext, useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import OrderSummary from "../../components/checkout/OrderSummary";
import AdditionalInfo from "../../components/checkout/AdditionalInfo";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { AuthContext } from "../../store/AuthContext";

const Checkout = () => {
  const [addressModalShown, setAddressModalShown] = useState(false);

  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}
      <div className="section-sm">
        <div className="container">
          <div className="checkout">
            <div>
              <AddressList
                select={true}
                onOpenAddressModal={() => setAddressModalShown(true)}
                filledButton={true}
                headerTwo
                addresses={user?.addresses || []}
              />
              <AdditionalInfo />
            </div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
