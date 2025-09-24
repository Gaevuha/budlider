import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import themeRouter from "./routers/themeRouter.js";
import path from "path";

export const TEMP_UPLOAD_DIR = path.resolve("uploads/temp");
export const UPLOAD_DIR = path.resolve("uploads");

const setupServer = (port = 5000) => {
  // порт передається сюди
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
  });

  app.use("/api/theme", themeRouter);

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
};

export default setupServer;
