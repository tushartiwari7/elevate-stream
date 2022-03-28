import { Response } from "miragejs";

export const getAllLanguagesHandler = function () {
  try {
    return new Response(200, {}, { languages: this.db.languages });
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
