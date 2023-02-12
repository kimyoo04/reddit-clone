import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const origin = process.env.ORIGIN;
app.use(
  cors({
    origin,
    credentials: true, // 쿠키 전송
  })
);
app.use(express.json());
app.use(morgan("dev"));

// CORS 에러 해결
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Content-Language, Accept, Accept-Language,"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE"]);
  next();
});

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
