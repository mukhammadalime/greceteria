import { useContext, useState } from "react";
import FilterOptions from "../UI/FilterOptions";
import AddNewsModal from "../modals/AddNewsModal";
import { UserContext } from "../../store/UserContext";
export const sortOptions = [
  { name: "Sort by: Newest", id: "newest" },
  { name: "Sort by: Latest", id: "latest" },
];

const NewsFilter = () => {
  const { state } = useContext(UserContext);

  const [addNewsModal, setAddNewsModal] = useState(() => false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");

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
          <FilterOptions
            options={sortOptions}
            title="Sort By: Newest"
            onToggle={() => setSortOpen((prev) => !prev)}
            onSelect={(id: string) => setSortOption(id)}
            open={sortOpen}
          />
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
