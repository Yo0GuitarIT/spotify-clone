import express from "express";
import morgan from "morgan";
import { PORT } from "./config/constants";
import spotifyRouter from "./routes/spotifyRoutes";
import { errorhandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/spotify", spotifyRouter);

app.use(errorhandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
