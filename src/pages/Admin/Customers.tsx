import { Link } from "react-router-dom";
import usePaginate from "../../hooks/usePaginate";
import DashboardNav from "../../components/dashboard/DashboardNav";
import PaginationButtons from "../../components/UI/PaginationButtons";
import FilterOptions from "../../components/UI/FilterOptions";
import { useState } from "react";

const sortOptions = [
  "Sort by: Active",
  "Sort by: Inactive",
  "Sort by: Pending",
];

const customers = [
  {
    id: "#123",
    name: "Laura Wilson",
    email: "laurawilson2324wdaw@gmail.com ",
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

const Customers = () => {
  const { handlePageClick, pageCount, currentItems } = usePaginate(customers);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Customers" />

          <div className="customers">
            <div className="filter__top">
              <FilterOptions
                options={sortOptions}
                title="Sort By: Status"
                onOpenHandler={() => setSortOpen((prev) => !prev)}
                open={sortOpen}
              />
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
                <table className="table">
                  <thead>
                    <tr className="table__header">
                      <th className="table__header--item">NAME</th>
                      <th className="table__header--item">EMAIL</th>
                      <th className="table__header--item">TELEPHONE</th>
                      <th className="table__header--item">STATUS</th>
                      <th className="table__header--item"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((customer: customersTypes, i: number) => (
                      <tr className="table__item" key={i}>
                        <td>{customer.name}</td>
                        <td>
                          <p>{customer.email}</p>
                        </td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.status}</td>
                        <td>
                          <Link
                            to="/customers/details"
                            className="view-details"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <div className="order-history__empty">
                  <h2>No Customers found</h2>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
