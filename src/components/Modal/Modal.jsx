import { useState } from "react";
import { BsCheckSquareFill, BsSquare, BsX } from "react-icons/bs";
import { useData } from "../../context";
import styles from "./Modal.module.css";
import toast from "react-hot-toast";
export const Modal = ({ setModal, video }) => {
  const [input, setInput] = useState("");
  const { playlist, dispatch } = useData();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: { playlistName: input, firstVideo: video },
    });
    setInput("");
    setModal(false);
  };

  const playlistHandler = (isInPlaylist, playlist) => {
    isInPlaylist
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
        });

    isInPlaylist
      ? toast.success(`Removed ${video.name} from ${playlist.playlistName}`)
      : toast(`Added ${video.name} to ${playlist.playlistName}`, {
          icon: "🎧",
        });
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

        {playlist.length !== 0 && (
          <>
            <h2 className={`h3 ubuntu p-md ${styles.heading}`}>
              Add to previous playlist
            </h2>
            <ul className={`list ${styles.playlist_list}`}>
              {playlist.map((playlist) => {
                const isThisVideoInPlaylist = playlist.videos.some(
                  (playListVideo) => playListVideo._id === video._id
                );
                return (
                  <li
                    className="flex px-sm py-xs fs-m"
                    key={playlist._id}
                    onClick={() =>
                      playlistHandler(isThisVideoInPlaylist, playlist)
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
          </>
        )}
        <icon role="icon" className={`pos-abs ${styles.close_modal}`}>
          <BsX size="3rem" onClick={() => setModal(false)} />
        </icon>
      </section>
    </div>
  );
};
