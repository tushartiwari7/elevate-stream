import React from "react";
import { BsTrash } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context";
import styles from "./Section.module.css";
import toast from "react-hot-toast";
import { removePlaylist } from "../../services";

export const Section = ({ children, title, size, playlistId }) => {
  const isInPlaylistsPage = useLocation().pathname === "/playlists";

  const { setUser } = useUser();
  const deletePlaylistHandler = async () => {
    const { playlists } = await removePlaylist(playlistId);
    setUser((user) => ({ ...user, playlists }));
    toast(`Deleted ${title} Playlist!`, { icon: <BsTrash /> });
  };

  return (
    <section className={`p-md ${styles.section}`} aria-label={title}>
      <h3 className={`h1 Montserrat px- md flex ${styles.playlist_title}`}>
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
