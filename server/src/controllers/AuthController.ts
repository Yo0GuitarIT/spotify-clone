import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login(req: Request, res: Response): void {
    const token = this.authService.login();
    res.json({
      success: true,
      message: "Login successfully",
      token: token,
    });
  }

  async verify(req: any, res: Response): Promise<void> {
    const token = req.token;
    const isVaild = await this.authService.verify(token);
    if (isVaild) {
      res.json({
        success: true,
        Message: "Token is valid",
      });
    } else {
      res.status(403).json({
        success: true,
        message: "Token is inVaild",
      });
    }
  }

  logout(req: any, res: Response) {
    const token = req.token;
    this.authService.logout(token);

    res.json({
      success: true,
      message: "logged out successfully",
    });
  }
}
