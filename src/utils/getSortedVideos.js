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
