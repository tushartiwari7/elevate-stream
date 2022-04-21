import { useState } from "react";
import { BsCheckSquareFill, BsSquare, BsX } from "react-icons/bs";
import { useData, useUser } from "../../context";
import styles from "./Modal.module.css";
import toast from "react-hot-toast";
import {
  addVideoToPlaylist,
  createPlaylist,
  removeVideoFromPlaylist,
} from "../../services";
export const Modal = ({ setModal, video }) => {
  const [input, setInput] = useState("");
  const { dispatch } = useData();
  const { user, setUser } = useUser();

  const submitHandler = async (e) => {
    e.preventDefault();
    // create new playlist and add current video to it

    const { playlists } = await createPlaylist(input);
    const { playlist } = await addVideoToPlaylist(
      playlists.find((playlist) => playlist.title === input)._id,
      video
    );
    setUser((user) => ({ ...user, playlists: [...user.playlists, playlist] }));
    setInput("");
    setModal(false);
  };

  const playlistHandler = async (isInPlaylist, playlistId) => {
    if (isInPlaylist) {
      // remove video from playlist
      const { playlist } = await removeVideoFromPlaylist(playlistId, video._id);
      setUser((user) => ({
        ...user,
        playlists: user.playlists.map((older) =>
          older._id === playlist._id ? playlist : older
        ),
      }));
      return;
    }

    // add video to playlist
    const { playlist } = await addVideoToPlaylist(playlistId, video);
    setUser((user) => ({
      ...user,
      playlists: user.playlists.map((older) =>
        older._id === playlist._id ? playlist : older
      ),
    }));
  };

  return (
    <div
      className={`pos-abs flex flex-center ${styles.playlist_modal}`}
      onClick={() => setModal(false)}
    >
      <section className="p-md pos-rel" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submitHandler}>
          <input
            className="input px-sm py-xs fs-m rounded-m"
            placeholder="Create New Playlist"
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.form_submit_btn}></button>
        </form>
        {user.playlists.length !== 0 && (
          <>
            <h2 className={`h3 Montserrat p-md ${styles.heading}`}>
              Add to previous playlist
            </h2>
            <ul className={`list ${styles.playlist_list}`}>
              {user.playlists.map((playlist) => {
                const isThisVideoInPlaylist = playlist.videos.some(
                  (playListVideo) => playListVideo._id === video._id
                );
                return (
                  <li
                    className="flex px-sm py-xs fs-m"
                    key={playlist._id}
                    onClick={() =>
                      playlistHandler(isThisVideoInPlaylist, playlist._id)
                    }
                  >
                    {playlist.title}
                    <span className={styles.check_icon}>
                      {isThisVideoInPlaylist ? (
                        <BsCheckSquareFill size="2rem" color="var(--primary)" />
                      ) : (
                        <BsSquare size="2rem" color="var(--primary)" />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <i role="icon" className={`pos-abs ${styles.close_modal}`}>
          <BsX size="3rem" onClick={() => setModal(false)} />
        </i>
      </section>
    </div>
  );
};
