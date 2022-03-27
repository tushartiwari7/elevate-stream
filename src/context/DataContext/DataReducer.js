export const initialState = {
  videos: [],
  categories: [],
  watchLater: [],
  likedVideos: [],
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return {
        ...state,
        sort: action.payload,
      };

    case "CATEGORIES":
      return {
        ...state,
        category: action.payload.isDel ? "" : action.payload.categoryName,
      };
    default:
      return state;
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        videos: action.payload.videos,
        categories: action.payload.categories,
      };

    case "SET_WATCH_LATER":
      return {
        ...state,
        watchLater: [...state.watchLater, action.payload],
      };

    case "SET_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: [...state.likedVideos, action.payload],
      };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video._id !== action.payload
        ),
      };

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          (video) => video._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
