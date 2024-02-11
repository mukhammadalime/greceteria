import { useContext, useState } from "react";
import CloseIcon from "../../components/UI/Icons/CloseIcon";
import FilterOptions from "../../components/UI/FilterOptions";
import AddProductModal from "../../components/modals/AddProductModal";
import { AuthContext } from "../../store/AuthContext";
import { CategoryContext } from "../../store/CategoryContext";
import { ProductContext } from "../../store/ProductContext";

const priceOptions = [
  { name: "Min $5 -  Max $10", id: "5-10" },
  { name: "Min $10 - Max $20", id: "10-20" },
  { name: "Min $20 - Max $30", id: "20-30" },
  { name: "Min $30 - Max $40", id: "30-40" },
  { name: "Min $40 - Max $50", id: "40-50" },
];

const sortOptions = [
  { name: "Sort by: Latest", id: "latest" },
  { name: "Sort by: Newest", id: "newest" },
  { name: "Sort by: Trending", id: "trending" },
];
const ratingOptions = [
  { name: "⭐⭐⭐⭐⭐", id: "5" },
  { name: "⭐⭐⭐⭐", id: "4" },
  { name: "⭐⭐⭐", id: "3" },
  { name: "⭐⭐", id: "2" },
  { name: "⭐", id: "1" },
];

const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const { state } = useContext(AuthContext);
  const [addProductModal, setAddProductModal] = useState(() => false);
  const [filtersOpen, setFiltersOpen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const {
    state: { categories },
  } = useContext(CategoryContext);
  const {
    state: { products },
  } = useContext(ProductContext);

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
          categoryOptions={categories.map((i) => {
            return { name: i.name, id: i._id };
          })}
        />
      )}

      <div className="filter">
        <div className="container">
          <div className="filter__top">
            <FilterOptions
              options={categories.map((i) => {
                return { name: i.name, id: i._id };
              })}
              title="Select Category"
              onToggle={onOpenHandler.bind(null, 0)}
              onSelect={(id: string) => setSelectedCategory(id)}
              open={filtersOpen[0]}
            />
            <FilterOptions
              options={priceOptions}
              title="Select Price"
              onToggle={onOpenHandler.bind(null, 1)}
              open={filtersOpen[1]}
              onSelect={(id: string) => setSelectedPrice(id)}
            />
            <FilterOptions
              options={ratingOptions}
              title="Select Rating"
              onToggle={onOpenHandler.bind(null, 2)}
              open={filtersOpen[2]}
              onSelect={(id: string) => setSelectedRating(id)}
            />
            <FilterOptions
              options={sortOptions}
              title="Sort By: ~~~~~"
              onToggle={onOpenHandler.bind(null, 3)}
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
                  {products.length}
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
