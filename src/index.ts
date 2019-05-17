require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import path from "path";

import * as allTypes from "./schemas";
import { Db } from "./db";
import { getServices } from "./services";

const start = async () => {
  /**
   * This method utilizes nexus to auto-generate schemas for graphql.
   */
  const schema = makeSchema({
    types: [allTypes],
    outputs: {
      schema: path.join(__dirname, "./../generated/schema.graphql"),
      typegen: path.join(__dirname, "./../generated/typings.ts")
    }
  });

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
        services: getServices()
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
