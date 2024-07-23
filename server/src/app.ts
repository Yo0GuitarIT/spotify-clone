import express from "express";
import http from "http";
import morgan from "morgan";
import { PORT } from "./config/constants";
import spotifyRouter from "./routes/spotifyRoutes";
import { errorhandler } from "./middleware/errorHandler";
import { ServerStartupError } from "./utils/customError";
import { GraphQLService } from "./services/GraphQLService";

import { DataService } from "./services/DataService";
import { DataRepository } from "./repositories/DataRepository";


async function startServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const dataRepository = new DataRepository();
    const dataService = new DataService(dataRepository);

    app.use(express.json());
    app.use(morgan("dev"));

    const graphQLService = new GraphQLService(httpServer, dataService);
    await graphQLService.start();
    app.use("/graphql", graphQLService.getMiddleware());

    app.use("/api/spotify", spotifyRouter);

    app.use(errorhandler);

    await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));

    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}/graphql`);
  } catch (error) {
    const startupError = new ServerStartupError(
      `Unexpected error during server startup: ${error}`
    );
    console.error(startupError.message);
    process.exit(1);
  }
}

startServer();
