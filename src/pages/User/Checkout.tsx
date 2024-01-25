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
              <div className="checkout__address-book">
                <div className="address-book__header">Shipping Addresses</div>
                <AddressList select={true} />

                <div className="address-book__bottom">
                  <button
                    className="button button-md"
                    onClick={() => setAddressModalShown(true)}
                  >
                    Add New Address
                  </button>
                </div>
              </div>
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
