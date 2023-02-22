import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../entities/User";
import { IUser } from "../types/user";

export const verifyJWT = async (token: string, secret: string) => {
  try {
    const data = jwt.verify(token, secret) as JwtPayload;
    const { username, email, ...others } = (await User.findOneBy({
      email: data.email,
    })) as IUser;

    return { username, email };
  } catch (error) {
    return undefined;
  }
};

export const createAccessToken = (user: {
  username: string;
  email: string;
}) => {
  const token = jwt.sign({ ...user }, process.env.ACCESS_SECRET!, {
    expiresIn: "1h", // 1시간
    issuer: "Yoo Kim",
  });
  return token;
};

export const createRefreshToken = (user: {
  username: string;
  email: string;
}) => {
  const token = jwt.sign({ ...user }, process.env.REFRESH_SECRET!, {
    expiresIn: "1w", // 1일주일
    issuer: "Yoo Kim",
  });
  return token;
};
