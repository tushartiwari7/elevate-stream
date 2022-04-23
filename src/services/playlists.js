import axios from "axios";
import toast from "react-hot-toast";
const token = localStorage.getItem("token");

export const createPlaylist = async (playlistName) => {
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
