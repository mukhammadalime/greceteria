import { useContext } from "react";
import NewsCard from "../components/newsCard";
import NewsFilter from "../components/newsCard/NewsFilter";
import { AuthContext } from "../store/AuthContext";
import LoginFirst from "../components/LoginFirst";
import { NewsContext } from "../store/NewsContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const NewsPage = () => {
  const { state } = useContext(AuthContext);

  const {
    state: { news, newsLoading },
  } = useContext(NewsContext);

  if (state.user === null) return <LoginFirst />;
  if (newsLoading) return <LoadingSpinner />;

  return (
    <div className="section-md news-page">
      <div className="container">
        <NewsFilter />

        {news.length > 0 && (
          <div className="all-news">
            {news.map((item) => (
              <NewsCard newsItem={item} key={item._id} />
            ))}
          </div>
        )}
        {news.length === 0 && (
          <div>
            <h2>Sorry, we couldn't find any news.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
