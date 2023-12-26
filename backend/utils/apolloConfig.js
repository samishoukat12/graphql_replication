const { postSchema } = require("../gqlSchema/postSchema");
const { resolvers } = require("../resolvers/postResolver");
const config = {
  typeDefs: postSchema,
  resolvers: resolvers,
};
module.exports = {
  config,
};
