require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import { applyMiddleware } from "graphql-middleware";
import path from "path";

import * as allTypes from "./schemas";
import { Db } from "./db";
import { getServices } from "./services";
import { permissions } from "./rules/permissions";
import AuthorizationService from "./services/authorization.service";
import { ContextualizedQueryLatencyStats } from "apollo-engine-reporting-protobuf";

const start = async () => {
  /**
   * This method utilizes nexus to auto-generate schemas for graphql.
   */
  const schema = applyMiddleware(
    makeSchema({
      types: [allTypes],
      outputs: {
        schema: path.join(__dirname, "./../../generated/schema.graphql"),
        typegen: path.join(__dirname, "./../../generated/nexus-typings.ts")
      }
    }),
    permissions
  );

  /**
   * Attempt to connect to database and start Apollo Sever.
   */
  try {
    const db = Db.get();
    await db.connect();
    const server = new ApolloServer({
      schema,
      mocks: false,
      context: async ({ req }) => ({
        req,
        services: getServices(),
        userId: (() => {
          const token =
            req && req.headers && req.headers.authorization
              ? req.headers.authorization.trim()
              : null;
          if (token) {
            return AuthorizationService.getUserId(token);
          }
        })()
      }),
      formatError: err => {
        // write generic graphql error intercepting logic here.
        return err;
      },
      tracing: process.env.NODE_ENV === "development",
      debug: process.env.NODE_ENV === "development"
    });

    const stats = await server.listen(process.env.PORT || 4000);
    console.log(`🚀 Server ready at ${stats.url}`);
  } catch (ex) {
    console.log("Error starting server", ex);
  }
};

start();
