import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { typeDefs, createResolvers } from "../graphQL/schema";
import { DataRepository } from "../repositories/DataRepository";
import { DataService } from "./DataService";

export class GraphQLService {
  private server: ApolloServer;
  private dataService: DataService;

  constructor(httpServer: http.Server) {
    const dataRepository = new DataRepository();
    this.dataService = new DataService(dataRepository);

    this.server = new ApolloServer({
      typeDefs,
      resolvers: createResolvers(this.dataService),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }

  async start() {
    await this.server.start();
  }

  getMiddleware() {
    return expressMiddleware(this.server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    });
  }

  getDataService() {
    return this.dataService;
  }
}
