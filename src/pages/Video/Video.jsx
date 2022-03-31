import dayjs from "dayjs";
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
export const Video = () => {
  const [params] = useSearchParams();
  const youtubeId = params.get("id");
  const { videos, likedVideos, watchLater, dispatch } = useData();
  const [open, setOpen] = useState(false);

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
  // history = [{date,[{video,time}]}]
  useEffect(() => {
    if (video) {
      // temporarily subtracting somedays to check if its working for videos watched on previous days.
      const today = dayjs().subtract(Math.floor(Math.random() * 5), "day");
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: {
          timeStamp: {
            date: today.format("DD/MM/YYYY"),
            time: today.format("HH:mm"),
          },
          video,
        },
      });
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
            <li className="px-sm pointer" onClick={() => setOpen(true)}>
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
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </ul>
      {open && <Modal {...{ setOpen, video }} />}
    </div>
  );
};
