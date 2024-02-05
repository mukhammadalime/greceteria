import { useContext } from "react";
import CompareItem from "../../components/compare/CompareItem";
import { AuthContext } from "../../store/AuthContext";
import LoginFirst from "../../components/LoginFirst";

const products = [
  {
    id: "almond-california",
    name: "Almond California",
  },
  {
    id: "qurtob",
    name: "Qurtob",
  },
  {
    id: "chicken",
    name: "Chicken",
  },
  {
    id: "chicken-legs",
    name: "Chicken Legs",
  },
  {
    id: "milk",
    name: "Milk",
  },
  {
    id: "canned-palow",
    name: "Canned Palow",
  },
  {
    id: "canned",
    name: "Canned",
  },
  {
    id: "bottle",
    name: "Bottle",
  },
  {
    id: "snack",
    name: "Snack",
  },
];

const Compare = () => {
  const { state } = useContext(AuthContext);
  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {products.map((item) => (
            <CompareItem
              key={item.id}
              name={item.name}
              brandName={""}
              features={""}
              weight={""}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Compare;
