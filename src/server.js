import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  getHistoryVideosHandler,
  addVideoToHistoryHandler,
  removeVideoFromHistoryHandler,
  clearHistoryHandler,
  getAllVideosHandler,
  getVideoHandler,
  getAllCategoriesHandler,
  getCategoryHandler,
  getAllLanguagesHandler,
  getLikedVideosHandler,
  addItemToLikedVideos,
  removeItemFromLikedVideos,
  getAllPlaylistsHandler,
  addNewPlaylistHandler,
  removePlaylistHandler,
  getVideosFromPlaylistHandler,
  addVideoToPlaylistHandler,
  removeVideoFromPlaylistHandler,
  addItemToSavedVideos,
  removeItemFromSavedVideos,
  postVideoHandler,
  addCommentsHandler,
} from "./backend/controllers";

import { videos } from "./backend/db/videos";
import { categories } from "./backend/db/categories";
import { languages } from "./backend/db/languages";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      video: Model,
      category: Model,
      language: Model,
      user: Model,
      like: Model,
      history: Model,
      playlist: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      videos.forEach((item) => {
        server.create("video", { ...item, comments: [] });
      });
      categories.forEach((item) => server.create("category", { ...item }));
      languages.forEach((item) => server.create("language", { ...item }));
      users.forEach((item) =>
        server.create("user", {
          ...item,
          likes: [],
          saved: [],
          history: [],
          playlists: [],
        })
      );
    },

    routes() {
      this.namespace = "api";

      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // video routes (public)
      this.get("/videos", getAllVideosHandler.bind(this));
      this.get("video/:videoId", getVideoHandler.bind(this));

      // video routes (private)
      this.post("comments/:videoId", addCommentsHandler.bind(this));

      // TODO: POST VIDEO TO DB
      this.post("/video", postVideoHandler.bind(this));

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // language routes (public)
      this.get("/languages", getAllLanguagesHandler.bind(this));

      // likes routes (private)
      this.get("/user/likes", getLikedVideosHandler.bind(this));
      this.post("/user/likes", addItemToLikedVideos.bind(this));
      this.delete("/user/likes/:videoId", removeItemFromLikedVideos.bind(this));

      // saved routes (private)
      this.post("/user/saved", addItemToSavedVideos.bind(this));
      this.delete("/user/saved/:videoId", removeItemFromSavedVideos.bind(this));

      // playlist routes (private)
      this.get("/user/playlists", getAllPlaylistsHandler.bind(this));
      this.post("/user/playlists", addNewPlaylistHandler.bind(this));
      this.delete(
        "/user/playlists/:playlistId",
        removePlaylistHandler.bind(this)
      );

      this.get(
        "/user/playlists/:playlistId",
        getVideosFromPlaylistHandler.bind(this)
      );
      this.post(
        "/user/playlists/:playlistId",
        addVideoToPlaylistHandler.bind(this)
      );
      this.delete(
        "/user/playlists/:playlistId/:videoId",
        removeVideoFromPlaylistHandler.bind(this)
      );

      // history routes (private)
      this.get("/user/history", getHistoryVideosHandler.bind(this));
      this.post("/user/history", addVideoToHistoryHandler.bind(this));
      this.delete(
        "/user/history/:videoId",
        removeVideoFromHistoryHandler.bind(this)
      );
      this.delete("/user/history/all", clearHistoryHandler.bind(this));

      this.passthrough((request) => {
        return request.url.includes("cloudinary");
      });
    },
  });
}
