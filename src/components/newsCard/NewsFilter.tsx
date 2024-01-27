import { useState } from "react";
import FilterOptions from "../UI/FilterOptions";
import AddNewsModal from "../modals/AddNewsModal";
const sortOptions = ["Sort by: Newest", "Sort by: Oldest"];

const NewsFilter = () => {
  const [addNewsModal, setAddNewsModal] = useState(() => false);

  return (
    <>
      {addNewsModal && (
        <AddNewsModal
          text="Add News"
          closeModal={() => setAddNewsModal(false)}
        />
      )}
      <div className="section__head">
        <div className="news-page__header-left">
          <div className="header__search">
            <input type="text" placeholder="Search for news" />
            <img
              className="search-icon"
              src="/assets/icons/search-icon.svg"
              alt="Search Icon"
            />
          </div>
          <div className="news__filter">
            <FilterOptions
              options={sortOptions}
              title="Sort By: Newest"
              className="choose-news-filter"
            />
            <div className="date-filter">
              <input type="date" />
            </div>
            <div className="date-filter">
              <input type="month" />
            </div>
          </div>
        </div>

        <button
          className="button add-button"
          onClick={() => setAddNewsModal(true)}
          children="Add News"
        />
      </div>
    </>
  );
};

export default NewsFilter;
