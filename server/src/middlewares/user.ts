import { NextFunction, Request, Response } from "express";
import { verifyJWT, createAccessToken, createRefreshToken } from "../utils/jwt";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    //! 두개 토큰 중에 1개라도 없으면 에러
    if (!accessToken && !refreshToken) return next();

    // accessToken, refreshToken 검증
    const accessData = await verifyJWT(accessToken, process.env.ACCESS_SECRET!);
    const refreshData = await verifyJWT(
      refreshToken,
      process.env.REFRESH_SECRET!
    );

    //? 둘 다 가능
    if (accessData && refreshData) {
      res.locals.user = accessData;
      return next();
    }

    //! 둘다 불가
    if (!accessData && !refreshData) throw new Error("Unauthenticated");

    //? accessToken 불가 > refreshToken 재발급
    if (!accessData) {
      // 비밀번호 제거
      const accessToken = createAccessToken(refreshData!);
      res.cookie("accessToken", accessToken, {
        path: "/",
        secure: false,
        httpOnly: true,
        sameSite: "strict",
      });

      // user info > res.local.user
      res.locals.user = { ...refreshData };
      return next();
    }

    //? refreshToken 불가 > accessToken 재발급
    if (!refreshData) {
      // 비밀번호 제거
      const refreshToken = createRefreshToken(accessData);
      res.cookie("refreshToken", refreshToken, {
        path: "/",
        secure: false,
        httpOnly: true,
        sameSite: "strict",
      });

      // user info > res.local.user
      res.locals.user = { ...accessData };
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
