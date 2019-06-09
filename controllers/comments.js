const {
  updateCommentVote,
  deleteComment,
  postComment
} = require("../models/comments");

const updatedComment = (req, res, next) => {
  updateCommentVote(req.params, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => next(err));
};

const handleCommentToDelete = (req, res, next) => {
  deleteComment(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => next(err));
};

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const queries = req.query;
  fetchCommentsByArticle(article_id, queries)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({
          status: 400,
          msg: "No comments found for this article"
        });
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = { updatedComment, handleCommentToDelete };
