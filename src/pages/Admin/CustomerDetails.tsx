import { useContext, useEffect, useState } from "react";
// import WarningModal from "../../components/modals/WarningModal";
import { OrdersTable } from "../../components/orders/OrdersTable";
import DashboardNav from "../../components/dashboard/DashboardNav";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { getCustomerApi } from "../../api/customers";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getUserOrders } from "../../api/orders";
import { OrderContext } from "../../store/OrderContext";
import { AuthContext } from "../../store/AuthContext";
import UserDetailsMain from "../../components/dashboard/UserDetailsMain";

const CustomerDetails = () => {
  const [warningModal, setWarningModal] = useState(() => false);
  console.log("warningModal:", warningModal);
  const { customerId } = useParams();
  const {
    state: { customer, user, customerLoading },
    dispatch,
  } = useContext(UserContext);
  const {
    state: { userOrders, loading, error },
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
                  <UserDetailsMain
                    edit
                    photo={customer.photo}
                    name={customer.name}
                    username={customer.username}
                    phoneNumber={customer.phoneNumber}
                    email={customer.email}
                  />

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

                <OrdersTable
                  orders={userOrders}
                  loading={loading}
                  error={error}
                />
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
