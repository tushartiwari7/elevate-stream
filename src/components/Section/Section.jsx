import React from "react";
import { BsTrash } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useData } from "../../context";
import styles from "./Section.module.css";

export const Section = ({ children, title, size, playlistId }) => {
  const isInPlaylistsPage = useLocation().pathname === "/playlists";

  const { dispatch } = useData();

  const deletePlaylistHandler = () => {
    dispatch({ type: "DELETE_PLAYLIST", payload: playlistId });
  };

  return (
    <section className={`p-md ${styles.section}`} aria-label={title}>
      <h3 className={`h1 ubuntu px- md flex ${styles.playlist_title}`}>
        {title}
        <span className="mx-xs fs-l fw-regular">
          ({size} {size == 1 ? "video" : "videos"})
        </span>
        {isInPlaylistsPage && (
          <button
            className={` flex flex-center ${styles.delete_playlist_btn}`}
            onClick={deletePlaylistHandler}
          >
            Delete Playlist
            <span>
              <BsTrash size="2rem" />
            </span>
          </button>
        )}
      </h3>
      <div className="content p-md">{children}</div>
    </section>
  );
};
