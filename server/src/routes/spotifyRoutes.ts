import express from "express";
import { SpotifyRepository } from "../repositories/SpotifyResposity";
import { SpotifyService } from "../services/SpotifyService";
import { SpotifyController } from "../controllers/SpotifyController";

const spotifyRouter = express.Router();

const spotifyRepository = new SpotifyRepository();
const spotifyService = new SpotifyService(spotifyRepository);
const spotifyController = new SpotifyController(spotifyService);

spotifyRouter.post("/login", spotifyController.login.bind(spotifyController));
spotifyRouter.post("/logout", spotifyController.logout.bind(spotifyController));
spotifyRouter.get(
  "/callback",
  spotifyController.callback.bind(spotifyController)
);
spotifyRouter.post(
  "/validLoginState",
  spotifyController.validLoginState.bind(spotifyController)
);
spotifyRouter.get(
  "/getUserProfile",
  spotifyController.getUserProfile.bind(spotifyController)
);

spotifyRouter.get(
  "/getMyRecentlyPlayedTracks",
  spotifyController.getMyRecentlyPlayedTracks.bind(spotifyController)
);
export default spotifyRouter;
