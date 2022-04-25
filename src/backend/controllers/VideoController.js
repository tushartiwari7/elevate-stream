import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function () {
  try {
    return new Response(200, {}, { videos: this.db.videos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */

// TODO: postVideoHandler

export const postVideoHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["This User is not Registered. Not Found error"],
        }
      );
    }
    const { video } = JSON.parse(request.requestBody);
    console.log("VIDEO", video);
    const alreadyExists = schema.videos.findBy({ _id: video._id });
    if (alreadyExists) {
      return new Response(
        422,
        {},
        {
          errors: ["This Video is Already present. Unprocessable Entity error"],
        }
      );
    }
    schema.videos.create({
      ...video,
      releaseYear: video.releaseYear - 0,
      startAt: video.startAt - 0,
    });

    return new Response(
      200,
      {},
      { status: "success", video: schema.videos.findBy({ _id: video._id }) }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/video/:videoId
 * */

export const getVideoHandler = function (schema, request) {
  const { videoId } = request.params;
  console.log(videoId);
  try {
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    console.log("VIDEO", video);
    return new Response(200, {}, { video });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const addCommentsHandler = function (schema, request) {
  // const user = requiresAuth.call(this, request);
  const { videoId } = request.params;
  console.log(videoId);

  if (user) {
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    const { comment } = JSON.parse(request.requestBody);
    return new Response(
      201,
      {},
      { video: { ...video, comments: [...video.comments, comment] } }
    );
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};
