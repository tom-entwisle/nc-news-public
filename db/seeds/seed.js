const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");
const {
  convertToDateTime,
  pairKeys,
  replaceKeys,
  swapKeyID
} = require("../data/utils/dataManip");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(topicsData)
        .into("topics")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(usersData)
        .into("users")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(convertToDateTime(articlesData))
        .into("articles")
        .returning("*");
    })
    .then(articles => {
      const idTitle = pairKeys(articles);
      const replacedWithId = replaceKeys(commentsData, idTitle);
      const withTimeStamp = convertToDateTime(replacedWithId);
      const withAuthor = swapKeyID(withTimeStamp);
      return knex
        .insert(withAuthor)
        .into("comments")
        .returning("*");
    });
};
