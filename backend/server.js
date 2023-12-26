const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connectMondoDb } = require("./database/mongoDbConnect");
const { config } = require("./utils/apolloConfig");
require("dotenv").config();

connectMondoDb();
startApolloServer(config);

async function startApolloServer(config) {
  const app = express();
  const server = new ApolloServer(config);
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at http://localhost:${process.env.PORT}/graphql`
    );
  });
}