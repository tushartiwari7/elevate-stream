import React from "react";
import {
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsBookmark,
  BsBookmarkCheckFill,
  BsFillChatDotsFill,
  BsShare,
} from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "./Video.module.css";
export const Video = () => {
  const [params] = useSearchParams();
  const youtubeId = params.get("id");
  const { videos, likedVideos, watchLater, dispatch } = useData();

  const isInWatchLater = watchLater.some((vid) => vid._id === youtubeId);
  const isInLikedVideos = likedVideos.some((vid) => vid._id === youtubeId);
  const video = videos?.find((vid) => vid._id === youtubeId);

  const dispatchHandler = (type) => {
    switch (type) {
      case "LIKE-VIDEO":
        isInLikedVideos
          ? dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: youtubeId })
          : dispatch({ type: "SET_LIKED_VIDEOS", payload: video });
        break;

      case "WATCH-LATER":
        isInWatchLater
          ? dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: youtubeId })
          : dispatch({ type: "SET_WATCH_LATER", payload: video });
        break;

      default:
        break;
    }
    toggleMenu(!menu);
  };

  return (
    <div className={`grid m-md ${styles.video_page}`}>
      <section className={styles.main_video}>
        <div className="mx-md">
          {youtubeId ? (
            <iframe
              width="100%"
              height="450px"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&start=${
                video?.startAt ?? "0"
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <h2>Video Id not Found</h2>
          )}
          <ul className={`flex list py-md full-width ${styles.video_actions}`}>
            <li
              className="px-sm pointer"
              onClick={() => dispatchHandler("LIKE-VIDEO")}
            >
              {isInLikedVideos ? (
                <BsHandThumbsUpFill size="3rem" color="var(--primary)" />
              ) : (
                <BsHandThumbsUp size="3rem" color="var(--primary)" />
              )}
            </li>
            <li
              className="px-sm pointer"
              onClick={() => dispatchHandler("WATCH-LATER")}
            >
              {isInWatchLater ? (
                <BsBookmarkCheckFill size="3rem" color="var(--primary)" />
              ) : (
                <BsBookmark size="3rem" color="var(--primary)" />
              )}
            </li>
            <li className="px-sm pointer">
              <BsFillChatDotsFill size="3rem" color="var(--primary)" />
            </li>
            <li className="px-sm pointer">
              <BsShare size="3rem" color="var(--primary)" />
            </li>
          </ul>
        </div>
        <div className="mx-md">
          <div className={`flex p-sm rounded-m ${styles.comment_section}`}>
            <div
              class={`avatar avatar-sm m-xs bg-primary h3 flex flex-center rounded-circle ${styles.avatar}`}
            >
              MK
            </div>
            <div className="flex flex-col full-width">
              <input
                className="input m-xs p-xs rounded-m"
                placeholder="Add a Comment... (non-functional)"
              />
              <div className={`flex ${styles.comment_btns}`}>
                <button className="btn btn-primary m-xs p-xs">Cancel</button>
                <button className="btn btn-primary m-xs p-xs">Post</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul className={`mx-md flex flex-col ${styles.other_videos_list}`}>
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </ul>
    </div>
  );
};
