import { useState } from "react";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { useData } from "../../context";
import styles from "./Modal.module.css";
export const Modal = ({ setOpen, video }) => {
  const [input, setInput] = useState("");
  const { playlist, dispatch } = useData();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: { playlistName: input, firstVideo: video },
    });
    setInput("");
  };

  return (
    <div
      className={`pos-abs flex flex-center ${styles.playlist_modal}`}
      onClick={() => setOpen(false)}
    >
      <section className="p-md" onClick={(e) => e.stopPropagation()}>
        <h2 className={`h2 ubuntu ${styles.heading}`}>Add to playlist</h2>
        <form onSubmit={submitHandler}>
          <input
            className="input px-sm py-xs fs-m rounded-m"
            placeholder="Create New Playlist"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.form_submit_btn}></button>
        </form>
        {playlist.length !== 0 && (
          <ul className={`list ${styles.playlist_list}`}>
            {playlist.map((playlist) => {
              const isThisVideoInPlaylist = playlist.videos.some(
                (playListVideo) => playListVideo._id === video._id
              );
              return (
                <li
                  className="flex px-sm py-xs fs-m"
                  onClick={() =>
                    isThisVideoInPlaylist
                      ? dispatch({
                          type: "REMOVE_VIDEO_FROM_PLAYLIST",
                          payload: {
                            playlistId: playlist._id,
                            videoId: video._id,
                          },
                        })
                      : dispatch({
                          type: "ADD_VIDEO_TO_PLAYLIST",
                          payload: { playlistId: playlist._id, video },
                        })
                  }
                >
                  {playlist.playlistName}
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
        )}
      </section>
    </div>
  );
};
