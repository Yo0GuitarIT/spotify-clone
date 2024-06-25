import express, { Request, Response } from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'))

const SECRET_KEY = "my-secret-key";

let activeTokens = new Set();

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  if (!activeTokens.has(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, SECRET_KEY, (error: any, payload: any) => {
    if (error) return res.sendStatus(403);
    req.token = token;
    next();
  });
};

app.post("/api/login", (req: Request, res: Response) => {
  const payLoad = {
    timestamp: new Date().getTime(),
  };

  const token = jwt.sign(payLoad, SECRET_KEY, { expiresIn: "1m" });
  activeTokens.add(token);

  res.json({
    success: true,
    message: "Login successful",
    token: token,
  });
});

app.get("/api/verify", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is vaild",
  });
});

app.post("/api/logout", authenticateToken, (req: any, res) => {
  activeTokens.delete(req.token);
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
