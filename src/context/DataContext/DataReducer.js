export const initialState = {
  videos: [],
  categories: [],
  languages: [],
  watchLater: [],
  likedVideos: [],
  history: [],
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
      return {
        sort: "",
        category: "",
        language: "",
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

    case "SET_WATCH_LATER":
      return {
        ...state,
        watchLater: [...state.watchLater, payload],
      };

    case "ADD_TO_HISTORY":
      console.log(payload);
      return {
        ...state,
        history: state.history.some(
          (day) => day.date === payload.timeStamp.date
        )
          ? state.history.map((day) =>
              day.date === payload.timeStamp.date
                ? {
                    ...day,
                    videos: [
                      { ...payload.video, time: payload.timeStamp.time },
                      ...day.videos,
                    ],
                  }
                : day
            )
          : [
              ...state.history,
              {
                date: payload.timeStamp.date,
                videos: [{ ...payload.video, time: payload.timeStamp.time }],
              },
            ],
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
      };

    case "SET_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: [...state.likedVideos, payload],
      };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter((video) => video._id !== payload),
      };

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter((video) => video._id !== payload),
      };

    default:
      return state;
  }
};
