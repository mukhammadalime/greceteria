import { Link } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import FilterOptions from "../../components/UI/FilterOptions";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { getCustomersApi } from "../../api/customers";
import ReloadIcon from "../../components/UI/Icons/ReloadIcon";
import { AuthContext } from "../../store/AuthContext";
import CustomersSkeleton from "../../skeletons/TableItemsSkeleton";

export const sortOptions = [
  { name: "Sort by: Active", id: "active" },
  { name: "Sort by: Inactive", id: "inactive" },
  { name: "Sort by: Pending", id: "pending" },
];
const customerItemsWidths = ["100%", "100%", "100%", "100%", "100%"];

const Customers = () => {
  const [selectedSort, setSelectedSort] = useState<String>("");
  console.log("selectedSort:", selectedSort);
  const [sortOpen, setSortOpen] = useState(false);
  const [reload, setReload] = useState<boolean>(false);

  const {
    state: { customers, customersLoading },
    dispatch,
  } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // We do no fetch customers if there is already data until the 'reload' button is clicked.
    if ((customers && !reload) || !auth.accessToken) return;

    (async () => {
      await getCustomersApi(dispatch, axiosPrivate);
      setReload(false);
    })();
  }, [axiosPrivate, dispatch, reload, customers, auth.accessToken]);

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
                onToggle={() => setSortOpen((prev) => !prev)}
                onSelect={(arg: string) => setSelectedSort(arg)}
                open={sortOpen}
              />
            </div>

            <div className="order-history">
              <div className="order-history__header">
                <h2>Customer List ({customers?.length || 0})</h2>
                <button
                  className="reload"
                  disabled={reload && true}
                  onClick={() => setReload(true)}
                >
                  <ReloadIcon />
                </button>
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
                    {customersLoading && !customers && (
                      <CustomersSkeleton widths={customerItemsWidths} />
                    )}

                    {customers?.map((customer) => (
                      <tr className="table__item" key={customer._id}>
                        <td>
                          <p>{customer.name}</p>
                        </td>
                        <td>
                          <p>{customer.email}</p>
                        </td>
                        <td>
                          <p>{customer.phoneNumber || "not added"}</p>
                        </td>
                        <td>
                          <p>{customer.status}</p>
                        </td>
                        <td>
                          <Link
                            to={`/customers/${customer._id}`}
                            className="view-details"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {customers?.length === 0 && (
                      <tr className="order-history__empty">
                        <td>No Customers found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
