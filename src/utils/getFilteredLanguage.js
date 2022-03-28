export const getFilteredLanguage = (videos, filters) =>
  filters.language
    ? videos.filter((video) => video.language === filters.language)
    : videos;
