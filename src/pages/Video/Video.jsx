import React, { useEffect, useState } from "react";
import {
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsBookmark,
  BsBookmarkCheckFill,
  BsFillChatDotsFill,
  BsShare,
  BsFolderPlus,
} from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { Modal, VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "./Video.module.css";
import toast from "react-hot-toast";

export const Video = () => {
  const [params] = useSearchParams();
  const youtubeId = params.get("id");
  const { videos, likedVideos, watchLater, dispatch } = useData();

  const [openModal, setModal] = useState(false);
  const isInWatchLater = watchLater.some((vid) => vid._id === youtubeId);
  const isInLikedVideos = likedVideos.some((vid) => vid._id === youtubeId);
  const video = videos?.find((vid) => vid._id === youtubeId);

  const dispatchHandler = (type) => {
    switch (type) {
      case "LIKE-VIDEO":
        isInLikedVideos
          ? dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: youtubeId })
          : dispatch({ type: "SET_LIKED_VIDEOS", payload: video });
        isInLikedVideos
          ? toast.success(`Removed ${video.name} from Liked Movies!`)
          : toast(`Added ${video.name} to Liked Movies!`, { icon: "👍" });
        break;

      case "WATCH-LATER":
        isInWatchLater
          ? dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: youtubeId })
          : dispatch({ type: "SET_WATCH_LATER", payload: video });
        isInWatchLater
          ? toast.success(`Removed ${video.name} from Watch Later!`)
          : toast(`Added ${video.name} to Watch Later!`, { icon: "⌚" });
        break;

      default:
        toast(`Unindentified request`, { icon: "❌" });
        break;
    }
  };
  // history = [{date,[{video,time}]}]
  useEffect(() => {
    if (video) {
      // temporarily subtracting somedays to check if its working for videos watched on previous days.
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: {
          timeStamp: {
            date: new Intl.DateTimeFormat(`en-IN`, {
              dateStyle: "long",
            }).format(new Date()),
            time: new Intl.DateTimeFormat("en-IN", {
              dayPeriod: "narrow",
            }).format(new Date()),
          },
          video,
        },
      });
      document.title = `${video.name} - Elevate Stream`;
    }
  }, [video]);

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
                <BsHandThumbsUpFill
                  size="3rem"
                  color="var(--primary)"
                  title="Unlike Video"
                />
              ) : (
                <BsHandThumbsUp
                  size="3rem"
                  color="var(--primary)"
                  title="Like Video"
                />
              )}
            </li>
            <Link className="px-sm pointer" to={`?id=${youtubeId}#comments`}>
              <BsFillChatDotsFill
                size="3rem"
                color="var(--primary)"
                title="Add a Comment"
              />
            </Link>
            <li className="px-sm pointer">
              <BsShare
                size="3rem"
                color="var(--primary)"
                title="Share this Video"
              />
            </li>
            <li className="px-sm pointer" onClick={() => setModal(true)}>
              <BsFolderPlus
                size="3rem"
                color="var(--primary)"
                title="Add To Playlist"
              />
            </li>
            <li
              className="px-sm pointer"
              onClick={() => dispatchHandler("WATCH-LATER")}
            >
              {isInWatchLater ? (
                <BsBookmarkCheckFill
                  size="3rem"
                  color="var(--primary)"
                  title="Remove from Saved"
                />
              ) : (
                <BsBookmark
                  size="3rem"
                  color="var(--primary)"
                  title="Add to Saved"
                />
              )}
            </li>
          </ul>
        </div>
        <div className="mx-md">
          <div
            className={`flex p-sm rounded-m ${styles.comment_section}`}
            id="comments"
          >
            <div
              className={`avatar avatar-sm m-xs bg-primary h3 flex flex-center rounded-circle ${styles.avatar}`}
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
        <h2 className="h1 ubuntu text-left my-sm">Related Videos:</h2>
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </ul>
      {openModal && <Modal {...{ setModal, video }} />}
    </div>
  );
};
