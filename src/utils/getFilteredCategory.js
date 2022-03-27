export const getFilteredCategory = (videos, filters) => {
  if (filters.category === "") return videos;
  return videos.filter((video) => video.category === filters.category);
};
