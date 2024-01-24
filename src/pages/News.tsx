import NewsCard from "../components/newsCard";
import NewsFilter from "../components/newsCard/NewsFilter";

const NewsPage = () => {
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
