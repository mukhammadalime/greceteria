import { useContext, useState } from "react";
import AddCategoryModal from "../../components/modals/AddCategoryModal";
import { CategoryContext } from "../../store/CategoryContext";
import { CategoryItemTypes } from "../../utils/user-types";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import CategoryItem from "../../components/category";
import { AuthContext } from "../../store/AuthContext";

const Categories = () => {
  const [openModal, setOpenModal] = useState(() => false);

  const { state } = useContext(CategoryContext);
  const { state: userState } = useContext(AuthContext);

  return (
    <>
      {openModal && (
        <AddCategoryModal
          text="Create Category"
          closeModal={() => setOpenModal(false)}
        />
      )}

      {state.categoriesLoading && <LoadingSpinner />}

      {!state.categoriesLoading && (
        <div className="section-sm">
          <div className="categories">
            <div className="container">
              {userState.user?.role === "admin" && (
                <div className="section__head">
                  <button
                    className="button add-button"
                    onClick={() => setOpenModal(true)}
                    children="Add Category"
                  />
                </div>
              )}

              <div className="categories__main">
                {state.categories.map((category: CategoryItemTypes) => (
                  <CategoryItem
                    category={category}
                    key={category._id}
                    forAdmin={userState.user?.role === "admin" && true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
