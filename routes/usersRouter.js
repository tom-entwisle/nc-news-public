const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors.js");
const { sendUserData } = require("../controllers/users");

usersRouter.route("/").all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUserData)
  .all(methodNotAllowed);

module.exports = usersRouter;
