export const getSortedVideos = (videos, filters) => {
  switch (filters.sort) {
    case "Most Recent":
      return [...videos].sort((a, b) => b.releaseYear - a.releaseYear);

    case "Most Viewed":
      return [...videos].sort((a, b) => b.views - a.views);

    default:
      return videos;
  }
};
