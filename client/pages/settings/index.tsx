import MainLayout from "@layouts/MainLayout";
import Settings from "@scenes/Settings";
import axios from "axios";
import { GetServerSideProps } from "next";

export default function SettingsPage() {
  return (
    <MainLayout>
      <Settings />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    // 쿠키 확인 및 에러 전송
    const refreshToken = req.headers.cookie;
    if (!refreshToken) throw new Error("Missing auth token refreshToken");

    // 백엔드 인증
    await axios.get("/auth/me", { headers: { cookie: refreshToken } });

    return { props: {} };
  } catch (error) {
    // 백엔드 인증 실패 시 /login 으로 이동
    res.writeHead(307, { Location: "/signin" }).end();
    return { props: {} };
  }
};
