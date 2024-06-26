import { Request, Response } from "express";

export class SpotifyController {
  login(req: Request, res: Response) {
    res.json({
      success: true,
      url: "https://google.com",
    });
  }
}
