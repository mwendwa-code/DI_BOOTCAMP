import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import storyRoutes from "./routes/stories";
import { errorHandler } from "./middleware/errors";

const app = express();
const allowedOrigin = process.env.FRONTEND_URL ?? "http://localhost:5173";

app.disable("x-powered-by");
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use((req, _res, next) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    req.body = {};
  }
  next();
});
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api", storyRoutes);
app.use((_req, res) => {
  res.status(404).json({ message: "The requested endpoint was not found." });
});
app.use(errorHandler);

export default app;
