export { loginHandler, signupHandler } from "./AuthController";

export {
  getHistoryVideosHandler,
  addVideoToHistoryHandler,
  removeVideoFromHistoryHandler,
  clearHistoryHandler,
} from "./HistoryController";

export {
  getAllVideosHandler,
  getVideoHandler,
  addCommentsHandler,
  postVideoHandler,
} from "./VideoController";

export { getAllLanguagesHandler } from "./LanguageController";
export {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./CategoryController";

export {
  getLikedVideosHandler,
  addItemToLikedVideos,
  removeItemFromLikedVideos,
} from "./LikeController";

export {
  getAllPlaylistsHandler,
  addNewPlaylistHandler,
  removePlaylistHandler,
  getVideosFromPlaylistHandler,
  addVideoToPlaylistHandler,
  removeVideoFromPlaylistHandler,
} from "./PlaylistController";

export {
  addItemToSavedVideos,
  removeItemFromSavedVideos,
} from "./SavedController";
