const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.com"],
  })
);
app.use(express.json());
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

app.get("/api/hello", (req: any, res: any) => {
  res.json({
    message: "Привет с бэкенда (на TypeScript)!",
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || "development",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
