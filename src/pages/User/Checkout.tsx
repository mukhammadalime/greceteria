import { useContext, useEffect, useRef, useState } from "react";
import AddressList from "../../components/addresses/AddressList";
import AdditionalInfo from "../../components/checkout/AdditionalInfo";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { CartContext } from "../../store/CartContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import BillCard from "../../components/cart/BillCard";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { loadStripe } from "@stripe/stripe-js";
import PaypalModal from "../../components/modals/PaypalModal";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const [addressModalShown, setAddressModalShown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [paypalOpen, setPaypalOpen] = useState(false);
  const [orderData, setOrderData] = useState<any>();

  ///////////////////////
  const axiosPrivate = useAxiosPrivate();
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { cart, cartLoading },
  } = useContext(CartContext);

  useEffect(() => {
    if (!cart) navigate("/my-cart");
  }, [cart, navigate]);

  const placeOrder = async () => {
    if (!cart) return;

    const shippingFee: number = cart?.totalPrice < 50 ? 5.0 : 0;
    const total: number = cart?.totalPrice + shippingFee;
    const order = {
      orderedProducts: cart?.cartProducts,
      totalPrice: total,
      user: user?._id,
      paymentMethod,
      deliveryFee: shippingFee,
      address: user?.addresses.find((i) => i._id === selectedAddressId),
      notes: notesRef.current?.value,
    };
    setOrderData(order);

    if (paymentMethod === "Paypal") setPaypalOpen(true);

    if (paymentMethod === "Stripe") {
      setLoading(true);
      try {
        const { data } = await axiosPrivate(`orders/stripe-publishable-key`);

        // 1) Get checkout session from API
        const session = await axiosPrivate.post(
          `orders/checkout-session`,
          order
        );

        // 2) Create checkout form + charge credit card
        const stripe = await loadStripe(data.publishableKey);
        stripe?.redirectToCheckout({ sessionId: session.data.session.id });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  if (cartLoading) return <LoadingSpinner />;

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}

      {paypalOpen && (
        <PaypalModal
          closeModal={() => setPaypalOpen(false)}
          orderData={orderData}
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
                setSelectedAddressId={setSelectedAddressId}
                selectedAddressId={selectedAddressId}
              />
              <AdditionalInfo ref={notesRef} />
            </div>
            {cart !== null && (
              <BillCard
                cart={cart}
                type="checkout"
                placeOrder={placeOrder}
                setPaymentMethod={setPaymentMethod}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
