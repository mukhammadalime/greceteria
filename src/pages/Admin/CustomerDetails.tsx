import { useContext, useEffect, useRef, useState } from "react";
import WarningModal from "../../components/modals/WarningModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import DashboardNav from "../../components/dashboard/DashboardNav";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { getCustomerApi } from "../../api/customers";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { toast } from "react-toastify";
import { getUserOrders } from "../../api/orders";
import { OrderContext } from "../../store/OrderContext";
import { AuthContext } from "../../store/AuthContext";

const CustomerDetails = () => {
  const [warningModal, setWarningModal] = useState(() => false);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const { customerId } = useParams();
  const {
    state: { customer, user, customerLoading },
    dispatch,
  } = useContext(UserContext);
  const {
    state: { orders, loading },
    dispatch: orderDisatch,
  } = useContext(OrderContext);
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getCustomerApi(dispatch, axiosPrivate, customerId as string);
    })();
    (async () => {
      await getUserOrders(orderDisatch, axiosPrivate, customerId as string);
    })();
  }, [auth.accessToken, axiosPrivate, customerId, dispatch, orderDisatch]);

  // Copy email to clipboard
  const copyEmailHandler = async () => {
    const email = emailRef.current?.textContent;
    if ((await navigator.clipboard.readText()) === email) return;
    navigator.clipboard.writeText(email!);
    toast.success("Email copied.");
  };

  return (
    <>
      {/* {warningModal && (
        <WarningModal
          text="Are you sure that you want to make this user manager?"
          closeModal={() => setWarningModal(false)}
        />
      )} */}

      <div className="section-sm">
        <div className="container">
          <div className="dashboard">
            <DashboardNav activeNavItem="Customers" />

            {customer && !customerLoading && (
              <div className="customer-details dashboard__main">
                <div className="user__details">
                  <div className="user__details--left">
                    <img src={customer?.photo} alt="" />
                    <div className="user__details--info">
                      <h5>{customer?.name}</h5>
                      <p>{customer?.username}</p>
                      {customer?.phoneNumber && <p>{customer?.phoneNumber}</p>}
                      <p ref={emailRef}>
                        <ContentCopyIcon onClick={copyEmailHandler} />
                        {customer?.email}
                      </p>
                    </div>
                  </div>

                  <div className="address-book">
                    <div className="address-book__header">
                      Shipping Addresses
                    </div>
                    <div className="address-book__items">
                      {customer.addresses?.length > 0 &&
                        customer.addresses?.map((item) => (
                          <div className="address-book__item" key={item._id}>
                            <h5>{item.name}</h5>
                            <p>{`${item.address1}, ${
                              item.address2 ? item.address2 : ""
                            }, ${item.city}, ${item.postalCode}, `}</p>
                            <span>{item.phoneNumber}</span>
                          </div>
                        ))}
                      {customer?.addresses.length === 0 && (
                        <p className="no-addresses">No addresses yet</p>
                      )}
                    </div>
                  </div>
                </div>
                {user?._id !== customer?._id && (
                  <div className="customer-details__actions">
                    <button
                      className="button add-button"
                      onClick={() => setWarningModal(true)}
                      children="Make me Manager"
                    />
                  </div>
                )}

                <OrdersTable orders={orders} loading={loading} />
              </div>
            )}

            {customerLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
