import { useState } from "react";
import AddCategoryModal from "../../components/modals/AddCategoryModal";

const CategoryItems = [
  {
    id: 1,
    image: "/assets/images/categories/icon-drinks.png",
    name: "Water and Drinks",
    quantity: 24,
  },
  {
    id: 2,
    image: "/assets/images/categories/icon-fruits.png",
    name: "Fresh Fruit",
    quantity: 35,
  },
  {
    id: 3,
    image: "/assets/images/categories/icon-meat.png",
    name: "Meat Products",
    quantity: 12,
  },
  {
    id: 4,
    image: "/assets/images/categories/icon-vegetable.png",
    name: "Vegetables",
    quantity: 17,
  },
  {
    id: 5,
    image: "/assets/images/categories/image-oil.png",
    name: "Oil",
    quantity: 3,
  },
  {
    id: 6,
    image: "/assets/images/categories/icon-drinks.png",
    name: "Water and Drinks",
    quantity: 24,
  },
  {
    id: 7,
    image: "/assets/images/categories/image-soda.png",
    name: "Soda",
    quantity: 14,
  },
  {
    id: 8,
    image: "/assets/images/categories/image-icon-beauty.png",
    name: "Beauty",
    quantity: 14,
  },
  {
    id: 9,
    image: "/assets/images/categories/image-icon-snaks.png",
    name: "Snacks",
    quantity: 14,
  },
];

const Categories = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(() => false);
  const [editCategoryModal, setEditCategoryModal] = useState(() => false);

  return (
    <>
      {addCategoryModal && (
        <AddCategoryModal
          text="Create Category"
          closeModal={() => setAddCategoryModal(false)}
          image={""}
        />
      )}
      {editCategoryModal && (
        <AddCategoryModal
          text="Edit Category"
          image="/assets/images/categories/icon-drinks.png"
          closeModal={() => setEditCategoryModal(false)}
        />
      )}
      <div className="section-sm">
        <div className="categories">
          <div className="container">
            <div className="section__head">
              <h2>All Categories</h2>
              <button
                className="button add-button"
                onClick={() => setAddCategoryModal(true)}
                children="Add Category"
              />
            </div>
            <div className="categories__main">
              {CategoryItems.map((category, i) => (
                <div className="category__item" key={i}>
                  <img src={category.image} alt="" />
                  <h5>{category.name}</h5>
                  <div className="quantity">{category.quantity} Products</div>
                  <button
                    className="button add-button"
                    onClick={() => setEditCategoryModal(true)}
                    children="Edit"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
