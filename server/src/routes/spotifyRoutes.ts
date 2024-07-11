import { Router } from "express";

import { AuthRepository } from "../repositories/AuthRepository";
import { DataRepository } from "../repositories/DataRepository";


import { AuthService } from "../services/AuthService";
import { DataService } from "../services/DataService";

import { AuthController } from "../controllers/AuthController";
import { DataController } from "../controllers/DataController";

const spotifyRouter = Router();

const authRepository = new AuthRepository();
const dataRepository = new DataRepository();

const authService = new AuthService(authRepository);
const dataService = new DataService(dataRepository);

const authController = new AuthController(authService);
const dataController = new DataController(dataService);

spotifyRouter.post("/login", authController.login);
spotifyRouter.post("/logout", authController.logout);
spotifyRouter.get("/getAccessToken", authController.getAccessToken);
spotifyRouter.get("/callback", authController.callback);
spotifyRouter.post("/validLoginState", authController.validLoginState);

spotifyRouter.get("/getUserProfile", dataController.getUserProfile);
spotifyRouter.get("/getMyRecentlyPlayedTracks",dataController.getMyRecentlyPlayedTracks);
spotifyRouter.get("/getNewReleases", dataController.getNewReleases);
spotifyRouter.get("/getMyTopArtists", dataController.getMyTopArtists);
spotifyRouter.get("/getMyTopTracks", dataController.getMyTopTracks);

export default spotifyRouter;
