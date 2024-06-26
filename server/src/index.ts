import express from "express";
import morgan from "morgan";
import { PORT } from "./config/constants";
import authRouter from "./routes/authRoutes";
import spotifyRouter from "./routes/spotifyRoutes";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", authRouter);
app.use("/api/spotify", spotifyRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
