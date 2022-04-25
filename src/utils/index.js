export { getImageLink } from "./getImageLink";

export const getSortedVideos = (videos, filters) => {
  switch (filters.sort) {
    case "MOST_RECENT":
      return [...videos].sort((a, b) => b.releaseYear - a.releaseYear);

    case "MOST_VIEWED":
      return [...videos].sort((a, b) => b.views - a.views);

    default:
      return videos;
  }
};

export const getFilteredLanguage = (videos, filters) =>
  filters.language
    ? videos.filter((video) => video.language === filters.language)
    : videos;

export const getFilteredCategory = (videos, filters) => {
  if (filters.category === "") return videos;
  return videos.filter((video) => video.category === filters.category);
};

export const getFilteredSearch = (videos, filters) =>
  filters.search
    ? videos.filter((video) =>
        video?.name?.toLowerCase().includes(filters?.search.toLowerCase())
      )
    : videos;

export const getViews = (views) =>
  views > 1000000
    ? (views / 1000000).toFixed(1) + "M+"
    : views > 1000
    ? (views / 1000).toFixed(1) + "K+"
    : views;

export const compose = (state, ...functions) => {
  return (filters) => {
    return functions.reduce((acc, fn) => {
      return fn(acc, filters);
    }, state);
  };
};

export const audioMessage = (message) => {
  const speak = new SpeechSynthesisUtterance(message);
  speechSynthesis.speak(speak);
};
