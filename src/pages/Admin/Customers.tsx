import { Link } from "react-router-dom";
import usePaginate from "../../hooks/usePaginate";
import DashboardNav from "../../components/dashboard/DashboardNav";
import PaginationButtons from "../../components/UI/PaginationButtons";
import FilterOptions from "../../components/UI/FilterOptions";

const sortOptions = [
  "Sort by: Active",
  "Sort by: Inactive",
  "Sort by: Pending",
];

const customers = [
  {
    id: "#123",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com ",
    phoneNumber: "+821057012806",
    numOfProducts: 5,
    status: "Active",
  },
  {
    id: "#234",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 6,
    status: "Inactive",
  },
  {
    id: "#355",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 7,
    status: "Active",
  },
  {
    id: "#400",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 10,
    status: "Active",
  },
  {
    id: "#444",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 13,
    status: "Inactive",
  },
  {
    id: "#244",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 5,
    status: "Pending",
  },
  {
    id: "#563",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 10,
    status: "Active",
  },

  {
    id: "#254",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 7,
    status: "Active",
  },

  {
    id: "#632",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 13,
    status: "Pending",
  },
  {
    id: "#643",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 6,
    status: "Active",
  },
  {
    id: "#224",
    name: "Laura Wilson",
    email: "laurawilson@gmail.com",
    phoneNumber: "+821057012806",
    numOfProducts: 5,
    status: "Active",
  },
];
interface customersTypes {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  numOfProducts: number;
  status: string;
}

const UsersList = () => {
  const { handlePageClick, pageCount, currentItems } = usePaginate(customers);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Customers" />

          <div className="customers">
            <div className="container">
              <div className="filter__top">
                <FilterOptions options={sortOptions} title="Sort By: Status"  className=""/>
              </div>
              <div className="order-history">
                <div className="order-history__header">
                  <h2>Customer List (1234)</h2>
                  <PaginationButtons
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                  />
                </div>
                <div className="order-history__table">
                  <div className="table__header">
                    <div className="table__header--item">Name</div>
                    <div className="table__header--item">Email</div>
                    <div className="table__header--item">Telephone</div>
                    <div className="table__header--item">Status</div>
                  </div>
                  {/* <div className="order-history__empty">
          <h2>No Customers found</h2>
        </div> */}
                  {currentItems.map((item: customersTypes) => (
                    <div className="table__item" key={item.id}>
                      <p>{item.name}</p>
                      <p>{item.email}</p>
                      <p>{item.phoneNumber}</p>
                      <p>{item.status}</p>
                      <Link to="/customers/details" className="view-details">
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
