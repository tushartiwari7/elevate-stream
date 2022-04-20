import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Saved Videos are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles adding videos to user's Saved Videos.
 * send POST Request at /api/user/saved
 * body contains {video}
 * */

export const addItemToSavedVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { video } = JSON.parse(request.requestBody);
    if (user.saved.some((item) => item.id === video.id)) {
      return new Response(
        409,
        {},
        {
          errors: ["The video is already in your Saved videos"],
        }
      );
    }
    user.saved.push(video);
    return new Response(201, {}, { saved: user.saved });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};

/**
 * This handler handles removing videos from user's saved.
 * send DELETE Request at /api/user/likes/:videoId
 * */

export const removeItemFromSavedVideos = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const filteredSaved = user.saved.filter((item) => item._id !== videoId);
    this.db.users.update({ saved: filteredSaved });
    return new Response(200, {}, { saved: filteredSaved });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};
