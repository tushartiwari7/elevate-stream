import React, { useState } from "react";
import { Section, VideoCard } from "../../components";
import { useUser } from "../../context";
import { createPlaylist } from "../../services";
import styles from "../Explore/Explore.module.css";
export const Playlists = () => {
  const { user, setUser } = useUser();
  const [newPlaylist, setNewPlaylist] = useState("");

  const createPlaylistHandler = async () => {
    const { playlists } = await createPlaylist(newPlaylist);
    setUser((user) => ({ ...user, playlists }));
    setNewPlaylist("");
  };

  return (
    <div>
      <h1 className="h1 Montserrat text-left p-md ">Your Playlists</h1>
      {user.playlists.length ? (
        user.playlists?.map((list) => (
          <Section
            title={list.title}
            size={list.videos.length}
            playlistId={list._id}
            key={list._id}
          >
            <ul className={`list grid ${styles.video_list}`}>
              {list.videos.map((video) => (
                <VideoCard key={video._id} {...video} />
              ))}
            </ul>
          </Section>
        ))
      ) : (
        <section className="flex flex-center flex-col">
          <h3 className="h3 my-sm">
            You don't have any playlists yet, Create One Now!
          </h3>
          <input
            type="text"
            className="input my-sm px-sm fs-m rounded-m"
            placeholder="Playlist Name"
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
          />
          <button
            className={`btn-secondary fs-m text-center pointer ${styles.sort_button}`}
            onClick={createPlaylistHandler}
          >
            Create New Playlist
          </button>
        </section>
      )}
    </div>
  );
};
