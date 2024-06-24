import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

app.get("/api/login", (req: Request, res: Response) => {
  res.json({
    state: {
      login: true,
    },
  });
});

app.get("/api/user", (req: Request, res: Response) => {
  const data = {
    user: {
      name: "Yo0",
      email: "yo0@test.com",
    },
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
