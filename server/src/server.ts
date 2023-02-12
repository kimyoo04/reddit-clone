import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

const origin = process.env.ORIGIN;
app.use(
  cors({
    origin,
    credentials: true, // 쿠키 전송
  })
);
app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server running at ${process.env.APP_URL}:${process.env.PORT}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
