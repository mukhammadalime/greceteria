import { useContext, useState } from "react";
import AddCategoryModal from "../../components/modals/AddCategoryModal";
import { CategoryContext } from "../../store/CategoryContext";
import { CategoryItemTypes } from "../../utils/user-types";
import CategoryItem from "../../components/category";
import { UserContext } from "../../store/UserContext";
import CategorySkeleton from "../../skeletons/CategorySkeleton";

const Categories = () => {
  const [openModal, setOpenModal] = useState(() => false);

  const { state } = useContext(CategoryContext);
  const { state: userState } = useContext(UserContext);

  return (
    <>
      {openModal && (
        <AddCategoryModal
          text="Create Category"
          closeModal={() => setOpenModal(false)}
        />
      )}

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
              {state.categoriesLoading ? (
                <>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <CategorySkeleton key={i} />
                  ))}
                </>
              ) : (
                <>
                  {state.categories.map((category: CategoryItemTypes) => (
                    <CategoryItem
                      category={category}
                      key={category._id}
                      forAdmin={userState.user?.role === "admin" && true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
