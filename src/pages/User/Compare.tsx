import { useContext, useEffect } from "react";
import CompareItem from "../../components/compare/CompareItem";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { getCompareApi } from "../../api/user";
import { ProductItemTypes } from "../../utils/user-types";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Compare = () => {
  const { state } = useContext(UserContext);
  const { state: userState, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getCompare = async () => await getCompareApi(dispatch);
    getCompare();
  }, [dispatch]);

  if (state.user === null) return <LoginFirst />;
  // if (userState.compareLoading) return <LoadingSpinner />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {/* {userState.compare.length > 0 &&
            userState.compare.map((item: ProductItemTypes) => (
              <CompareItem key={item.id} product={item} />
            ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Compare;
