import { useContext } from "react";
import NewsCard from "../components/newsCard";
import NewsFilter from "../components/newsCard/NewsFilter";
import { AuthContext } from "../store/AuthContext";
import LoginFirst from "../components/LoginFirst";

const NewsPage = () => {
  const { state } = useContext(AuthContext);
  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-md news-page">
      <div className="container">
        <NewsFilter />
        <div className="all-news">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
