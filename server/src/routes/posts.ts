import { Request, Response, Router } from "express";

import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

import Post from "../entities/Post";

const getPosts = async (req: Request, res: Response) => {
  return res.json({});
};

const router = Router();
router.get("/", userMiddleware, authMiddleware, getPosts);

export default router;
