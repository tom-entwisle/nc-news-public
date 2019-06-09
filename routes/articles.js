const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors");
const {
  sendArticle,
  updatedArticle,
  updatedComment,
  sendComments,
  sendArticles
} = require("../controllers/articles");

articlesRouter
  .route("/:article_id/")
  .get(sendArticle)
  .patch(updatedArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(updatedComment)
  .get(sendComments)
  .all(methodNotAllowed);

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

module.exports = articlesRouter;
