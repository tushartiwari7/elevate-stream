import { useState } from "react";
import styles from "./VideoCard.module.css";
import {
  BsFillPlayFill,
  BsThreeDotsVertical,
  BsShare,
  BsSave2,
  BsHandThumbsUp,
  BsFolderPlus,
  BsClock,
} from "react-icons/bs";
import { getViews } from "../../utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../";
import { useUser } from "../../context";
import toast from "react-hot-toast";
import { removeVideoFromHistory } from "../../services";
export const VideoCard = (video) => {
  const {
    _id,
    thumbnail,
    name,
    category,
    language,
    releaseYear,
    duration,
    views,
    actors,
  } = video;
  const [menu, toggleMenu] = useState(false);
  const { user, setUser, handlers } = useUser();

  const isInWatchLater = user.saved?.some((vid) => vid._id === _id);
  const isInLikedVideos = user.likes?.some((vid) => vid._id === _id);
  const isInHistory = user.history?.some((vid) => vid._id === _id);

  const [openModal, setModal] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();

  const contextMenuHandler = (e) => {
    switch (e.target.title) {
      case "Share with Friends":
        handlers.shareVideoHandler(video._id);
        break;

      case "like-video":
        isInLikedVideos
          ? handlers.likedVideosHandler(video._id, false)
          : handlers.likedVideosHandler(video);
        break;

      case "watch-later":
        isInWatchLater
          ? handlers.savedVideosHandler(video._id, false)
          : handlers.savedVideosHandler(video);
        break;

      default:
        break;
    }
    toggleMenu(!menu);
  };

  const path = location.pathname;

  const openPlaylistModal = () => {
    if (!user.isLoggedIn) {
      toast.error("You need to be logged in to add videos to a playlist");
      return navigator("/login", { state: { from: location } });
    }
    setModal(true);
  };

  const removeFromHistory = async () => {
    const { history } = await removeVideoFromHistory(video._id);
    setUser((user) => ({ ...user, history }));
    toast.success("Video removed from history");
  };

  return (
    <li
      className={`card rounded-m ${styles.card} ${
        path.includes("/watch") ? styles.on_video_page_card : ""
      }`}
      onClick={() => menu && toggleMenu(!menu)}
    >
      <Link className="flex pos-rel" to={`/watch/${_id}`}>
        <img
          className={styles.card_img}
          src={thumbnail}
          alt={name}
          width="100%"
          height="100%"
        />
        <div
          className={`card-badge pos-abs fs-m Montserrat fw-bold p-xs ${styles.card_badge}`}
        >
          {getViews(views)}
        </div>
        <span
          className={`pos-abs ${styles.card_time_duration}`}
        >{`${duration.hours}h ${duration.minutes}m`}</span>
        <div className={`pos-abs flex flex-center  ${styles.card_hover}`}>
          <BsFillPlayFill size={"10rem"} color={"white"} />
        </div>
      </Link>
      <div className={`flex flex-col p-md pos-rel ${styles.card_details}`}>
        <h3 className={`h3 ${styles.card_title}`}>{name}</h3>
        <label className="fs-m">{actors.join(", ")}</label>
        <label className={`fs-m ${styles.card_meta}`}>
          {category} ▫ {language} ▫ {releaseYear}
        </label>
        <button
          className={`pos-abs btn btn-icon pointer ${styles.contextMenuBtn}`}
          onClick={() => toggleMenu((menu) => !menu)}
        >
          <BsThreeDotsVertical size="3rem" />
        </button>
        {menu && (
          <ul
            className={`flex flex-col pos-abs list card ${styles.contextMenu}`}
            onClick={contextMenuHandler}
          >
            <li className="flex px-sm py-xs" title="Share with Friends">
              <BsShare
                className={styles.contextMenuItemIcon}
                size="1.5rem"
                title="Share"
              />
              <span className="fs-m" title="Share">
                Share
              </span>
            </li>
            <li className="flex px-sm py-xs" title="watch-later">
              <BsSave2
                className={styles.contextMenuItemIcon}
                size="1.5rem"
                title="watch-later"
              />
              <span className="fs-m" title="watch-later">
                {isInWatchLater ? "Unsave Video" : "Save Video"}
              </span>
            </li>
            <li className="flex px-sm py-xs" title="like-video">
              <BsHandThumbsUp
                className={styles.contextMenuItemIcon}
                size="1.5rem"
                title="like-video"
              />
              <span className="fs-m" title="like-video">
                {isInLikedVideos
                  ? "Remove From Liked Videos"
                  : "Add To Liked Videos"}
              </span>
            </li>
            <li
              className="flex px-sm py-xs"
              title="Add to Playlist"
              onClick={openPlaylistModal}
            >
              <BsFolderPlus
                className={styles.contextMenuItemIcon}
                size="1.5rem"
                title="like-video"
              />
              <span className="fs-m" title="Add to Playlist">
                Add To Playlist
              </span>
            </li>
            {isInHistory && (
              <li
                className="flex px-sm py-xs"
                title="Remove From History"
                onClick={removeFromHistory}
              >
                <BsClock
                  className={styles.contextMenuItemIcon}
                  size="1.5rem"
                  title="Remove from History"
                />
                <span className="fs-m" title="Remove From History">
                  Remove From History
                </span>
              </li>
            )}
          </ul>
        )}
      </div>
      {openModal && <Modal {...{ setModal, video }} />}
    </li>
  );
};
