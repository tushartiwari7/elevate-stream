import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

export const initialState = {
  videos: [],
  categories: [],
  languages: [],
  // history: [],
  // playlist: [],
};

export const initialFilters = {
  sort: "",
  category: "",
  language: "",
  search: "",
};

export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT":
      return {
        ...state,
        sort: payload,
      };

    case "CATEGORIES":
      return {
        ...state,
        category: payload.isDel ? "" : payload.categoryName,
      };

    case "LANGUAGES":
      return {
        ...state,
        language: payload.isDel ? "" : payload.lang,
      };

    case "CLEAR_FILTERS":
      return initialFilters;

    case "VIDEOS_SEARCH":
      return {
        ...state,
        search: payload,
      };

    default:
      return state;
  }
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DATA":
      return {
        ...state,
        videos: payload.videos,
        categories: payload.categories,
        languages: payload.languages,
      };

    case "ADD_VIDEO":
      return {
        ...state,
        videos: [...state.videos, payload],
      };

    // case "ADD_TO_HISTORY":
    //   return {
    //     ...state,
    //     history: state.history.some(
    //       (day) => day.date === payload.timeStamp.date
    //     )
    //       ? state.history.map((day) =>
    //           day.date === payload.timeStamp.date
    //             ? {
    //                 ...day,
    //                 videos: [
    //                   { ...payload.video, time: payload.timeStamp.time },
    //                   ...day.videos,
    //                 ],
    //               }
    //             : day
    //         )
    //       : [
    //           ...state.history,
    //           {
    //             date: payload.timeStamp.date,
    //             _id: uuid(),
    //             videos: [{ ...payload.video, time: payload.timeStamp.time }],
    //           },
    //         ],
    //   };

    // case "CLEAR_HISTORY":
    //   return {
    //     ...state,
    //     history: [],
    //   };

    // case "CREATE_NEW_PLAYLIST":
    //   const { playlistName, firstVideo } = payload;
    //   if (
    //     state.playlist.some(
    //       (playlist) => playlist.playlistName === playlistName
    //     )
    //   ) {
    //     console.error("Playlist with this name already exists");
    //     toast.error("Playlist with this name already exists");
    //     return state;
    //   }
    //   toast.success(
    //     `Created ${playlistName} Playlist and added ${firstVideo.name} to it`
    //   );
    //   return {
    //     ...state,
    //     playlist: [
    //       ...state.playlist,
    //       { _id: uuid(), playlistName, videos: [firstVideo] },
    //     ],
    //   };

    // case "DELETE_PLAYLIST":
    //   return {
    //     ...state,
    //     playlist: state.playlist.filter((playlist) => playlist._id !== payload),
    //   };

    // case "ADD_VIDEO_TO_PLAYLIST":
    //   return {
    //     ...state,
    //     playlist: state.playlist.map((playlist) =>
    //       playlist._id === payload.playlistId
    //         ? { ...playlist, videos: playlist.videos.concat(payload.video) }
    //         : playlist
    //     ),
    //   };

    // case "REMOVE_VIDEO_FROM_PLAYLIST":
    //   return {
    //     ...state,
    //     playlist: state.playlist.map((playlist) =>
    //       playlist._id === payload.playlistId
    //         ? {
    //             ...playlist,
    //             videos: playlist.videos.filter(
    //               (video) => video._id !== payload.videoId
    //             ),
    //           }
    //         : playlist
    //     ),
    //   };

    default:
      return state;
  }
};
