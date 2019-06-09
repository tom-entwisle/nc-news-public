const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors");
const { sendTopics } = require("../controllers/topics");
const { sendUser } = require("../controllers/users");
const articlesRouter = require("./articles");
const {
  updatedComment,
  handleCommentToDelete
} = require("../controllers/comments");

apiRouter
  .route("/topics/")
  .get(sendTopics)
  .all(methodNotAllowed);

apiRouter
  .route("/users/:username/")
  .get(sendUser)
  .all(methodNotAllowed);

apiRouter.use("/articles", articlesRouter).all(methodNotAllowed);

apiRouter
  .route("/comments/:comment_id")
  .patch(updatedComment)
  .delete(handleCommentToDelete)
  .all(methodNotAllowed);

module.exports = apiRouter;
