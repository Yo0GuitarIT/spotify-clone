import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { typeDefs, createResolvers } from "../graphQL/schema";
import { IDataService } from "../interface/interface";

export class GraphQLService {
  private server: ApolloServer;

  constructor(httpServer: http.Server, private dataService: IDataService) {
    this.server = new ApolloServer({
      typeDefs,
      resolvers: createResolvers(dataService),
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