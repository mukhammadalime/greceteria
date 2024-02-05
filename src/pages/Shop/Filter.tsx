import { useContext, useState } from "react";
import CloseIcon from "../../components/UI/Icons/CloseIcon";
import FilterOptions from "../../components/UI/FilterOptions";
import AddProductModal from "../../components/modals/AddProductModal";
import { AuthContext } from "../../store/AuthContext";

const categoryOptions = [
  "Water and Drinks",
  "Fresh Fruit",
  "Meat Products",
  "Vegetables",
  "Oil",
  "Soda",
  "Snacks",
  "Beauty",
];
const priceOptions = [
  "Min $5 -  Max $10",
  "Min $10 - Max $20",
  "Min $20 - Max $30",
  "Min $30 - Max $40",
  "Min $40 - Max $50",
];

const sortOptions = ["Sort by: Latest", "Sort by: Newest", "Sort by: Trending"];
const ratingOptions = ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐"];

const Filter = () => {
  const { state } = useContext(AuthContext);
  const [addProductModal, setAddProductModal] = useState(() => false);

  const [filtersOpen, setFiltersOpen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  // This function opens the requested filter and closed other remaining open filters
  const onOpenHandler = (num: number) => {
    const array = [...filtersOpen];
    filtersOpen.fill(false);
    filtersOpen[num] = !array[num];
    setFiltersOpen([...filtersOpen]);
  };

  return (
    <>
      {addProductModal && (
        <AddProductModal
          text="Add Product"
          closeModal={() => setAddProductModal(false)}
          images={[]}
        />
      )}

      <div className="filter">
        <div className="container">
          <div className="filter__top">
            <FilterOptions
              options={categoryOptions}
              title="Select Category"
              onOpenHandler={onOpenHandler.bind(null, 0)}
              open={filtersOpen[0]}
            />
            <FilterOptions
              options={priceOptions}
              title="Select Price"
              onOpenHandler={onOpenHandler.bind(null, 1)}
              open={filtersOpen[1]}
            />
            <FilterOptions
              options={ratingOptions}
              title="Select Rating"
              onOpenHandler={onOpenHandler.bind(null, 2)}
              open={filtersOpen[2]}
            />
            <FilterOptions
              options={sortOptions}
              title="Sort By: Latest"
              onOpenHandler={onOpenHandler.bind(null, 3)}
              open={filtersOpen[3]}
            />
            {state.user && state.user.role !== "user" && (
              <button
                className="button add-button"
                onClick={() => setAddProductModal(true)}
                children="Add Product"
              />
            )}
          </div>
        </div>
        <div className="filter__bottom">
          <div className="container">
            <div className="filter__bottom--main">
              <div className="active__filters">
                <h5>Active Filters:</h5>
                <div className="active__filter">
                  Vegetables
                  <CloseIcon />
                </div>
                <div className="active__filter">
                  Min $10 - Max $20
                  <CloseIcon />
                </div>
                <div className="active__filter">
                  Min $10 - Max $20
                  <CloseIcon />
                </div>
                <div className="active__filter">
                  Min $10 - Max $20
                  <CloseIcon />
                </div>
                <div className="active__filter">
                  Min $10 - Max $20
                  <CloseIcon />
                </div>
              </div>
              <div className="filter__result">
                <p>
                  89
                  <span>Products found.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
