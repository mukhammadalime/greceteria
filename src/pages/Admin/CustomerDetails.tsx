import { useState } from "react";
import usePaginate from "../../hooks/usePaginate";
import WarningModal from "../../components/modals/WarningModal";
import { OrderTable } from "../../components/orders/OrderTable";
import DashboardNav from "../../components/dashboard/DashboardNav";
import PaginationButtons from "../../components/UI/PaginationButtons";

const addresses = [
  {
    id: 1,
    name: "Laura Wilson",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    phoneNumber: "+82 1054678921",
  },
  {
    id: 2,
    name: "Amelia",
    address: "5250 Parker Rd. Allentown, California 35522",
    phoneNumber: "+82 1054678921",
  },
  {
    id: 3,
    name: "Laura",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    phoneNumber: "+82 1054653921",
  },
];

const orders = [
  {
    id: "#123",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
  {
    id: "#234",
    date: "14 Aug, 2021",
    total: "$150.00",
    numOfProducts: 6,
    status: "Delivered",
  },
  {
    id: "#355",
    date: "12 Jan, 2022",
    total: "$300.00",
    numOfProducts: 7,
    status: "Delivered",
  },
  {
    id: "#400",
    date: "12 Mar, 2022",
    total: "$490.00",
    numOfProducts: 10,
    status: "Delivered",
  },
  {
    id: "#444",
    date: "20 Apr, 2022",
    total: "$500.00",
    numOfProducts: 13,
    status: "Processing",
  },
  {
    id: "#244",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
  {
    id: "#563",
    date: "12 Mar, 2022",
    total: "$490.00",
    numOfProducts: 10,
    status: "Delivered",
  },

  {
    id: "#254",
    date: "12 Jan, 2022",
    total: "$300.00",
    numOfProducts: 7,
    status: "Delivered",
  },

  {
    id: "#632",
    date: "20 Apr, 2022",
    total: "$500.00",
    numOfProducts: 13,
    status: "Processing",
  },
  {
    id: "#643",
    date: "14 Aug, 2021",
    total: "$150.00",
    numOfProducts: 6,
    status: "Delivered",
  },
  {
    id: "#224",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
];

const CustomerDetails = () => {
  const [warningModal, setWarningModal] = useState(() => false);
  const { handlePageClick, pageCount, currentItems } = usePaginate(orders);

  return (
    <>
      {warningModal && (
        <WarningModal
          text="Are your sure that you want to make this user manager?"
          closeModal={() => setWarningModal(false)}
        />
      )}
      <div className="section-sm">
        <div className="container">
          <div className="dashboard">
            <DashboardNav activeNavItem="Customers" />

            <div className="customer-details">
              <div className="user__details">
                <div className="user__details--left">
                  <img src="/assets/images/users/default.jpg" alt="" />
                  <div className="user__details--info">
                    <h5>Laura Wilson</h5>
                    <p>laurawilson</p>
                    <p>laurawilson@gmail.com</p>
                  </div>
                </div>
                <div className="user__details--address-book">
                  <div className="address-book__header">Shipping Addresses</div>
                  <div className="address-book__items">
                    {addresses.map((item) => (
                      <div className="address-book__item" key={item.name}>
                        <h5>{item.name}</h5>
                        <p>{item.address}</p>
                        <span>{item.phoneNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="customer-details__actions">
                <button
                  className="button add-button"
                  onClick={() => setWarningModal(true)}
                >
                  Make me Manager
                </button>
              </div>
              <div className="cutomer-orders">
                <div className="order-history">
                  <div className="order-history__header">
                    <h2>Order History</h2>
                    <PaginationButtons
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  </div>

                  <div className="order-history__main">
                    <OrderTable orders={currentItems} notHeader={true} text={""} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
