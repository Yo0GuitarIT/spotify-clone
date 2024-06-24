import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(express.json());

const SECRET_KEY = "my-secret-key";

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

app.post("/api/login", (req: Request, res: Response) => {
  const payLoad = {
    timestamp: new Date().getTime(),
  };

  const token = jwt.sign(payLoad, SECRET_KEY, { expiresIn: "5m" });

  res.json({
    success: true,
    message: "Login successful",
    token: token,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
