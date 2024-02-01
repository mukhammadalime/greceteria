import { useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import OrderSummary from "../../components/checkout/OrderSummary";
import AdditionalInfo from "../../components/checkout/AdditionalInfo";
import AddAddressModal from "../../components/modals/AddAddressModal";

const Checkout = () => {
  const [addressModalShown, setAddressModalShown] = useState(false);
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
                select={false}
                onOpenAddressModal={() => setAddressModalShown(true)}
                filledButton={true}
                headerTwo
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
