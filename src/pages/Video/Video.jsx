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

import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, VideoCard } from "../../components";
import { useData, useUser } from "../../context";
import styles from "./Video.module.css";
import toast from "react-hot-toast";
import { addCommment, addVideoToHistory } from "../../services";

export const Video = () => {
  const { videos, dispatch } = useData();
  const { user, setUser, handlers } = useUser();
  const { youtubeId } = useParams();
  const [openModal, setModal] = useState(false);
  const navigator = useNavigate();
  const isInWatchLater = user.saved?.some((vid) => vid._id === youtubeId);
  const isInLikedVideos = user.likes?.some((vid) => vid._id === youtubeId);
  const video = videos?.find((vid) => vid._id === youtubeId);
  const dispatchHandler = (type) => {
    switch (type) {
      case "SHARE-VIDEO":
        handlers.shareVideoHandler(youtubeId);
        break;

      case "LIKE-VIDEO":
        isInLikedVideos
          ? handlers.likedVideosHandler(video._id, false)
          : handlers.likedVideosHandler(video);
        break;

      case "WATCH-LATER":
        isInWatchLater
          ? handlers.savedVideosHandler(video._id, false)
          : handlers.savedVideosHandler(video);
        break;

      default:
        toast(`Unindentified request`, { icon: "❌" });
        break;
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      toast("You need to login to comment", { icon: "❌" });

      return;
    }
    const [input] = e.target.elements;
    const comment = {
      text: input.value,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      timestamp: new Intl.DateTimeFormat("en-IN", { dayPeriod: "long" }).format(
        new Date()
      ),
    };
    const { video } = await addCommment(youtubeId, comment);

    video
      ? dispatch({
          type: "UPDATE_VIDEO",
          payload: video,
        })
      : toast("Comment Not added - Request Failed", { icon: "❌" });
    e.target.reset();
  };

  const openPlaylistModal = () => {
    if (!user.isLoggedIn) {
      toast.error("You need to be logged in to add videos to a playlist");
      return navigator("/login");
    }
    setModal(true);
  };

  useEffect(() => {
    if (video && user.isLoggedIn) {
      (async () => {
        const { history } = await addVideoToHistory(video);
        setUser((user) => ({ ...user, history }));
      })();
      document.title = `${video.name} - Elevate Stream`;
    }
  }, [youtubeId]);

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
            <li
              className="px-sm pointer"
              onClick={() => dispatchHandler("SHARE-VIDEO")}
            >
              <BsShare
                size="3rem"
                color="var(--primary)"
                title="Share this Video"
              />
            </li>
            <li className="px-sm pointer" onClick={openPlaylistModal}>
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
        <div className="mx-md" id="comments">
          <div className={`flex p-sm rounded-m ${styles.comment_section}`}>
            <div
              className={`avatar avatar-sm m-xs bg-primary h3 flex flex-center rounded-circle ${styles.avatar}`}
            >
              {`${user.firstName?.[0] ?? "M"}${user.lastName?.[0] ?? "K"}`}
            </div>
            <form
              className="flex flex-col full-width"
              onSubmit={commentHandler}
            >
              <input
                className="input m-xs p-xs rounded-m"
                placeholder="Add a Comment..."
              />
              <div className={`flex ${styles.comment_btns}`}>
                <button type="reset" className="btn btn-primary m-xs p-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary m-xs p-xs">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul className={`mx-md list ${styles.comment_list}`}>
          {video?.comments?.map((comment) => (
            <li
              key={comment._id}
              className="my-md p-md rounded-m full-width flex"
            >
              <div
                className={`avatar avatar-sm m-xs bg-primary h3 flex flex-center rounded-circle ${styles.avatar}`}
              >
                {`${comment?.user.firstName[0]}${comment?.user.lastName[0]}`}
              </div>
              <div>
                <p className="fs-m">
                  {`${comment?.user.firstName} ${comment?.user.lastName}`}
                  <span className="fs-s mx-xs">{comment?.timestamp}</span>
                </p>
                <p className={`fs-m ${styles.comment}`}>{comment?.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <ul className={`mx-md flex flex-col ${styles.other_videos_list}`}>
        <h2 className="h1 Montserrat text-left my-sm">Related Videos:</h2>
        {videos
          .filter((vid) => vid.category === video.category)
          .map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}
      </ul>
      {openModal && <Modal {...{ setModal, video }} />}
    </div>
  );
};
