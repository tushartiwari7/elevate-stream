import toast from "react-hot-toast";
import { axiosCall } from "../utils";

export const createPlaylist = async (playlistName) => {
  try {
    const {
      data: { playlists },
      status,
    } = await axiosCall(`/api/user/playlists`, "POST", {
      playlist: { title: playlistName },
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
    const { data, status } = await axiosCall(
      `/api/user/playlists/${playlistId}`,
      "DELETE"
    );
    return { playlists: data.playlists, status };
  } catch (err) {
    toast.error("Failed to remove playlist");
    console.log(err);
    return err;
  }
};

export const addVideoToPlaylist = async (playlistId, video) => {
  try {
    const { data, status } = await axiosCall(
      `/api/user/playlists/${playlistId}`,
      "POST",
      { video }
    );

    return { playlist: data.playlist, status };
  } catch (err) {
    toast.error("Failed to add video to playlist");
    console.log(err);
    return err;
  }
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const { data, status } = await axiosCall(
      `/api/user/playlists/${playlistId}/${videoId}`,
      "DELETE"
    );
    return { playlist: data.playlist, status };
  } catch (err) {
    toast.error("Failed to remove video from playlist");
    console.log(err);
    return err;
  }
};
