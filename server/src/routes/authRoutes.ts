import express from "express";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../repositories/UserRepository";

const authRouter = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  const isVaild = await authService.verify(token);
  if (!isVaild) return res.sendStatus(403);

  req.token = token;
  next();
};

authRouter.post("/login", (req, res) => authController.login(req, res));

authRouter.get("/verify", authenticateToken, (req, res) =>
  authController.verify(req, res)
);

authRouter.post("/logout", authenticateToken, (req, res) =>
  authController.logout(req, res)
);

export default authRouter;
