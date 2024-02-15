import { useContext, useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import AdditionalInfo from "../../components/checkout/AdditionalInfo";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { AuthContext } from "../../store/AuthContext";
import { CartContext } from "../../store/CartContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import BillCard from "../../components/cart/BillCard";

const Checkout = () => {
  const [addressModalShown, setAddressModalShown] = useState(false);

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { cart, cartLoading },
  } = useContext(CartContext);

  if (cartLoading) return <LoadingSpinner />;

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
            {cart !== null && <BillCard cart={cart} type="checkout" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
