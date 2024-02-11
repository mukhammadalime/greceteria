import { useContext, useState } from "react";
import FilterOptions from "../UI/FilterOptions";
import AddNewsModal from "../modals/AddNewsModal";
import { AuthContext } from "../../store/AuthContext";
const sortOptions = ["Sort by: Newest", "Sort by: Oldest"];

const NewsFilter = () => {
  const { state } = useContext(AuthContext);

  const [addNewsModal, setAddNewsModal] = useState(() => false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <>
      {addNewsModal && (
        <AddNewsModal
          text="Add News"
          closeModal={() => setAddNewsModal(false)}
        />
      )}
      <div className="section__head">
        <div className="news__filter">
          <div className="header__search">
            <input type="text" placeholder="Search for news" />
            <img
              className="search-icon"
              src="/assets/icons/search-icon.svg"
              alt="Search Icon"
            />
          </div>
          {/* <FilterOptions
            options={sortOptions}
            title="Sort By: Newest"
            onOpenHandler={() => setSortOpen((prev) => !prev)}
            open={sortOpen}
          /> */}
          <div className="date-filter">
            <input type="date" />
          </div>
          <div className="date-filter">
            <input type="month" />
          </div>

          {state.user && state.user.role !== "user" && (
            <button
              className="button add-button"
              onClick={() => setAddNewsModal(true)}
              children="Add News"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewsFilter;
