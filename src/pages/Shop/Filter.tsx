import { memo, useContext, useState } from "react";
import CloseIcon from "../../components/UI/Icons/CloseIcon";
import FilterOptions from "../../components/UI/FilterOptions";
import AddProductModal from "../../components/modals/AddProductModal";
import { CategoryContext } from "../../store/CategoryContext";
import { ProductContext } from "../../store/ProductContext";
import useToggleOptions from "../../hooks/useToggleOptions";
import {
  productPriceOptions,
  ratingOptions,
  sortOptions,
} from "../../data/helperData";
import { UserContext } from "../../store/UserContext";

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const { state } = useContext(UserContext);
  const [addProductModal, setAddProductModal] = useState(() => false);

  const {
    state: { categories },
  } = useContext(CategoryContext);
  const {
    state: { products },
  } = useContext(ProductContext);

  // This function opens the requested filter and closed other remaining open filters
  const { filtersOpen, toggleOptionsHandler } = useToggleOptions(4);

  return (
    <>
      {addProductModal && (
        <AddProductModal
          text="Add Product"
          closeModal={() => setAddProductModal(false)}
          categoryOptions={categories!.map((i) => {
            return { name: i.name, id: i._id };
          })}
        />
      )}

      <div className="filter">
        <div className="container">
          <div className="filter__top">
            {categories && (
              <FilterOptions
                options={categories.map((i) => {
                  return { name: i.name, id: i._id };
                })}
                title="Select Category"
                onToggle={toggleOptionsHandler.bind(null, 0)}
                onSelect={(id: string) => setSelectedCategory(id)}
                open={filtersOpen[0]}
              />
            )}

            <FilterOptions
              options={productPriceOptions}
              title="Select Price"
              onToggle={toggleOptionsHandler.bind(null, 1)}
              open={filtersOpen[1]}
              onSelect={(id: string) => setSelectedPrice(id)}
            />
            <FilterOptions
              options={ratingOptions}
              title="Select Rating"
              onToggle={toggleOptionsHandler.bind(null, 2)}
              open={filtersOpen[2]}
              onSelect={(id: string) => setSelectedRating(id)}
            />
            <FilterOptions
              options={sortOptions}
              title="Sort By: ~~~~~"
              onToggle={toggleOptionsHandler.bind(null, 3)}
              open={filtersOpen[3]}
              onSelect={(id: string) => setSelectedSort(id)}
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
                  {products?.length}
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

export default memo(Filter);
