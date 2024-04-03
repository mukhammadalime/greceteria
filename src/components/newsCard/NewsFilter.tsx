import { useContext, useState } from "react";
import FilterOptions from "../UI/FilterOptions";
import AddNewsModal from "../modals/AddNewsModal";
import { UserContext } from "../../store/UserContext";

export const sortOptions = [
  { name: "Sort by: Newest", _id: "newest" },
  { name: "Sort by: Latest", _id: "latest" },
];

const NewsFilter = () => {
  const [addNewsModal, setAddNewsModal] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const { state } = useContext(UserContext);

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
