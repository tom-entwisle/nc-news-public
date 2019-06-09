const connection = require("../db/connection");

const updateCommentVote = ({ comment_id }, { inc_votes = 0 }) => {
  return connection("comments")
    .where({ comment_id: comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length < 1) {
        return Promise.reject({ status: 404, message: "comment not found" });
      }
      return comment[0];
    });
};

const postComment = (article_id, userInput) => {
  const commentToInsert = { ...userInput };
  commentToInsert.article_id = article_id;
  commentToInsert.author = commentToInsert.username;
  delete commentToInsert.username;
  return connection
    .insert(commentToInsert)
    .into("comments")
    .returning("*");
};

const deleteComment = comment_id => {
  return connection("comments")
    .where(comment_id)
    .del()
    .then(comment => {
      if (comment < 1) {
        return Promise.reject({ status: 404, message: "comment not found" });
      }
      return comment;
    });
};

module.exports = { updateCommentVote, deleteComment, postComment };
