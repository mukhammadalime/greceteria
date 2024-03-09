import { useContext } from "react";
import NewsCard from "../components/newsCard";
import NewsFilter from "../components/newsCard/NewsFilter";
import LoginFirst from "../components/LoginFirst";
import { NewsContext } from "../store/NewsContext";
import { UserContext } from "../store/UserContext";
import NewsItemSkeleton from "../skeletons/NewsItemSkeleton";

const NewsPage = () => {
  const { state } = useContext(UserContext);
  const {
    state: { news, newsLoading },
  } = useContext(NewsContext);

  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-md news-page">
      <div className="container">
        <NewsFilter />

        {newsLoading && <div className="all-news"></div>}

        <div className="all-news">
          {(newsLoading || !news) && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <NewsItemSkeleton key={i} />
              ))}
            </>
          )}

          {news?.map((item) => (
            <NewsCard newsItem={item} key={item._id} />
          ))}
        </div>
        {news?.length === 0 && (
          <div>
            <h2>Sorry, we couldn't find any news.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
