import express from "express";
import { SpotifyController } from "../controllers/SpotifyController";

const spotifyRouter = express.Router();
const spotifyController = new SpotifyController();

spotifyRouter.post("/login", (req, res) => spotifyController.login(req, res));

export default spotifyRouter;
