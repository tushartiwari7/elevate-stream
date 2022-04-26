export const initialVideoCreds = {
  _id: "",
  name: "",
  category: "",
  language: "",
  releaseYear: "",
  duration: { hours: 0, minutes: 0 },
  startAt: "",
  thumbnail: "",
  actors: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_ID":
      return {
        ...state,
        _id: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "SET_RELEASE_YEAR":
      return {
        ...state,
        releaseYear: action.payload,
      };
    case "SET_DURATION_HOURS":
      return {
        ...state,
        duration: {
          ...state.duration,
          hours: action.payload,
        },
      };
    case "SET_DURATION_MINUTES":
      return {
        ...state,
        duration: {
          ...state.duration,
          minutes: action.payload,
        },
      };
    case "SET_START_AT":
      return {
        ...state,
        startAt: action.payload,
      };
    case "SET_THUMBNAIL":
      return {
        ...state,
        thumbnail: action.payload,
      };
    case "ADD_ACTOR":
      return {
        ...state,
        actors: [...state.actors, action.payload],
      };
    case "RESET":
      return initialVideoCreds;

    default:
      return state;
  }
};
