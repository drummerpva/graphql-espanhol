import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//graphql
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./data/schema";
import { resolvers } from "./data/resolvers";

dotenv.config({ path: ".env" });

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    if (token !== "null") {
      try {
        const usuarioAtual = await jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioAtual = usuarioAtual;

        return { usuarioAtual };
      } catch (error) {
        // console.log(error);
      }
    }
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Servidor rodando...  ${server.graphqlPath}`)
);
