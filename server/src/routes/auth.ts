import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

import User from "../entities/User";

const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

const me = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const signup = async (req: Request, res: Response) => {
  const { email, username, phone, password } = req.body;

  try {
    let errors: any = {};

    // 이메일과 유저이름이 이미 저장 사용되고 있는 것인지 확인.
    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });
    const phoneUser = await User.findOneBy({ phone });

    // 이미 있다면 errors 객체에 넣어줌.
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
    if (usernameUser) errors.username = "이미 이 사용자 이름이 사용되었습니다.";
    if (phoneUser) errors.phone = "이미 전화번호가 사용되었습니다.";

    // 에러가 있다면 return으로 에러를 response 보내줌.
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    user.phone = phone;

    // 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 해줌.
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapError(errors));

    // 유저 정보를 user table에 저장.
    await user.save();
    console.log(user);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let errors: any = {};

    // 에러메시지 프론트로 응답
    if (isEmpty(email)) errors.email = "이메일을 입력해주세요.";
    if (isEmpty(password)) errors.password = "비밀번호를 입력해주세요.";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // 디비 유저 조회
    const userData = await User.findOneBy({ email });
    if (!userData) return res.status(404).json({ email: "없는 사용자입니다." });

    // 유저 비밀번호 비교
    const passwordMatches = await bcrypt.compare(password, userData.password);
    if (!passwordMatches)
      return res.status(401).json({ password: "비밀번호를 확인해주세요." });

    // 비밀번호 제외
    const givenData = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };

    // accessToken, refreshToken 생성 및 발급
    const accessToken = jwt.sign(givenData, process.env.ACCESS_SECRET!, {
      expiresIn: "1h", // 1시간
      issuer: "Yoo Kim",
    });
    const refreshToken = jwt.sign(givenData, process.env.REFRESH_SECRET!, {
      expiresIn: "7d", // 일주일
      issuer: "Yoo Kim",
    });

    // 쿠키 저장
    res.cookie("accessToken", accessToken, {
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60, // 1시간
    });
    res.cookie("refreshToken", refreshToken, {
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 일주일
    });

    return res.status(200).json({ message: "Sign in success." });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("accessToken", "", {
      path: "/",
      secure: false,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      path: "/",
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({ message: "Log out success." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const accessToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;
    const userData = await User.findOneBy({ email: data.email });
    if (!userData) return res.status(404).json({ email: "없는 사용자입니다." });

    res.status(200).json({ message: "Access token is valid." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;

    const userData = await User.findOneBy({ email: data.email });
    if (!userData) return res.status(404).json({ email: "없는 사용자입니다." });

    // 비밀번호 제외
    const givenData = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };

    // accessToken 생성 및 재발급
    const accessToken = jwt.sign(givenData, process.env.ACCESS_SECRET!, {
      expiresIn: "1h", // 1시간
      issuer: "Yoo Kim",
    });
    res.cookie("accessToken", accessToken, {
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60, // 1시간
    });

    res.status(200).json({ message: "Access token is recreated" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const signinSuccess = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;

  const userData = await User.findOneBy({ email: data.email });
  if (!userData) return res.status(404).json({ email: "없는 사용자입니다." });
  const givenData = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
  };
  res.status(200).json(givenData);
};

const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);

router.get("/accesstoken", accessToken);
router.get("/refreshtoken", refreshToken);
router.get("/signin/success", signinSuccess);

router.get("/me", userMiddleware, authMiddleware, me);
router.get("/logout", userMiddleware, authMiddleware, logout);

export default router;
