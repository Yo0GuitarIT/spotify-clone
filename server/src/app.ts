import express from "express";
import http from "http";
import { PORT } from "./config/constants";
import { GraphQLService } from "./services/GraphQLService";
import spotifyRouter from "./routes/spotifyRoutes";
import { errorHandler } from "./middleware/errorHandler";

async function startServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    app.use(express.json());

    const graphQLService = new GraphQLService(httpServer);
    await graphQLService.start();
    app.use("/graphql", graphQLService.getMiddleware());

    app.use("/api/spotify", spotifyRouter);
    app.use(errorHandler);

    await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error(`Unexpected error during server startup: ${error}`);
    process.exit(1);
  }
}

startServer();
