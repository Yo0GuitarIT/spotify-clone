import express from "express";
import morgan from "morgan";
import { PORT } from "./config/constants";
import router from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
