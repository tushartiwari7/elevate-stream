import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
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
      views: Math.floor(Math.random() * 1000000),
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
  try {
    const video = schema.videos.findBy({ _id: videoId }).attrs;
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
  const user = requiresAuth.call(this, request);
  const { videoId } = request.params;
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

    if (user) {
      const { comment } = JSON.parse(request.requestBody);
      const video = schema.videos.findBy({ _id: videoId })?.attrs;
      const updatedComments = [{ ...comment, _id: uuid() }, ...video.comments];
      this.db.videos.update({ _id: videoId }, { comments: updatedComments });
      return new Response(
        201,
        {},
        { video: { ...video, comments: updatedComments } }
      );
    }
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
