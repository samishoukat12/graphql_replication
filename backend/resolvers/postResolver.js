const { PostModel } = require("../models/postModal");

const resolvers = {
  Query: {
    getPosts: async () => {
      return await PostModel.find();
    },
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      console.log("ff",title, content);
      const post = new PostModel({ title, content });
      await post.save();
      return post;
    },
  },
};

module.exports = {
  resolvers,
};
