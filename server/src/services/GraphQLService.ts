import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { typeDefs, resolvers } from "../graphQL/schema";

export class GraphQLService {
  private server: ApolloServer;

  constructor(httpServer: http.Server) {
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }

  async start() {
    await this.server.start();
  }

  getMiddleware() {
    return expressMiddleware(this.server);
  }
}
