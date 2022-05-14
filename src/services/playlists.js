import axios from "axios";
import toast from "react-hot-toast";

export const createPlaylist = async (playlistName) => {
  const token = localStorage.getItem("token");
  console.log({ playlistName, token });
  try {
    const {
      data: { playlists },
      status,
    } = await axios({
      url: `/api/user/playlists`,
      method: "POST",
      data: { playlist: { title: playlistName } },
      headers: {
        authorization: token,
      },
    });
    return { playlists, status };
  } catch (err) {
    toast.error("Failed to create playlist");
    console.log(err);
    return err;
  }
};

export const removePlaylist = async (playlistId) => {
  const token = localStorage.getItem("token");
  try {
    const {
      data: { playlists },
      status,
    } = await axios({
      url: `/api/user/playlists/${playlistId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { playlists, status };
  } catch (err) {
    toast.error("Failed to remove playlist");
    console.log(err);
    return err;
  }
};

export const addVideoToPlaylist = async (playlistId, video) => {
  const token = localStorage.getItem("token");
  try {
    const {
      data: { playlist },
      status,
    } = await axios({
      url: `/api/user/playlists/${playlistId}`,
      method: "POST",
      data: { video },
      headers: {
        authorization: token,
      },
    });
    return { playlist, status };
  } catch (err) {
    toast.error("Failed to add video to playlist");
    console.log(err);
    return err;
  }
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  const token = localStorage.getItem("token");
  try {
    const {
      data: { playlist },
      status,
    } = await axios({
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { playlist, status };
  } catch (err) {
    toast.error("Failed to remove video from playlist");
    console.log(err);
    return err;
  }
};
