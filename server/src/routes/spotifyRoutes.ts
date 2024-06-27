import express from "express";
import { SpotifyRepository } from "../repositories/SpotifyResposity";
import { SpotifyService } from "../services/SpotifyService";
import { SpotifyController } from "../controllers/SpotifyController";

const spotifyRouter = express.Router();

const spotifyRepository = new SpotifyRepository();
const spotifyService = new SpotifyService(spotifyRepository);
const spotifyController = new SpotifyController(spotifyService);

spotifyRouter.post("/login", spotifyController.login.bind(spotifyController));
spotifyRouter.get("/callback", spotifyController.callback.bind(spotifyController));

export default spotifyRouter;
