import { useContext, useEffect, useState } from "react";
import AddNewsModal from "../components/modals/AddNewsModal";
import NewsImagesSlider from "../components/UI/Slider/NewsImagesSlider";
import SocialShareModal from "../components/modals/SocialShareModal";
import { AuthContext } from "../store/AuthContext";
import { getNewsItemApi } from "../api/news";
import { NewsContext } from "../store/NewsContext";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const NewsDetails = () => {
  const { newsId } = useParams();
  const [shareModal, setShareModal] = useState(() => false);
  const [addNewsModal, setAddNewsModal] = useState(() => false);
  const { state } = useContext(AuthContext);
  const { state: newsState, dispatch } = useContext(NewsContext);

  useEffect(() => {
    const getNewsItem = async () => await getNewsItemApi(dispatch, newsId);

    getNewsItem();
  }, [dispatch, newsId]);

  if (newsState.newsItemLoading || !newsState.newsItem)
    return <LoadingSpinner />;

  return (
    <>
      {shareModal && (
        <SocialShareModal
          text="news"
          closeModal={() => setShareModal(false)}
          url={""}
        />
      )}
      {addNewsModal && (
        <AddNewsModal
          text="Edit News"
          closeModal={() => setAddNewsModal(false)}
          images={newsState.newsItem.images}
          news={newsState.newsItem}
        />
      )}
      <div className="section-sm">
        <div className="container">
          <div className="news">
            <div className="news__header">
              <h4>
                <svg>
                  <use href="/assets/icons/icons.svg#icon-bell"></use>
                </svg>
                News
              </h4>
              <span>2 days ago</span>
            </div>
            <NewsImagesSlider images={newsState.newsItem?.images!} />
            <div className="news__title">
              <h5>{newsState.newsItem?.title}</h5>
              <img
                onClick={() => setShareModal(!shareModal)}
                className="news__share"
                src="/assets/icons/share-icon.svg"
                alt=""
              />
            </div>
            <div className="news__text">
              <div
                dangerouslySetInnerHTML={{ __html: newsState.newsItem?.text }}
              />

              {state.user && state.user.role !== "user" && (
                <button
                  className="button edit-news"
                  onClick={() => setAddNewsModal(true)}
                  children="Edit News"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
