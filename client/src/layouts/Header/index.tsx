import { useEffect } from "react";
import { authActions } from "@features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import axios from "axios";
import { motion } from "framer-motion";

import Logo from "./HeaderItem/Logo";
import MenuToggle from "./HeaderItem/MenuToggle";
import NavLink from "./NavLink";
import UserButton from "./UserButton";

export default function Header() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  //앱 실행 시 토큰 존재하면 로그인 활성화!
  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(`/auth/me`);
        dispatch(authActions.signin(response.data));
        dispatch(authActions.stopLoading());
      } catch (error) {
        console.log("Header - useEffect - Error : ", error);
        dispatch(authActions.stopLoading());
      }
    };

    getAuth();
  }, []);

  return (
    <header className="text-gray-600 h-[68px] body-font">
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container flex flex-wrap items-center justify-between gap-5 p-5 mx-auto"
        >
          <div className="row-center">
            <Logo />

            <div className="hidden gap-4 ml-6 md:flex ">
              <NavLink linkpath={""} name={"Home"} />
              <NavLink linkpath={"about"} name={"About"} />
              <NavLink linkpath={"contactus"} name={"Contact Us"} />
            </div>
          </div>

          <div className="gap-5 row-center">
            <UserButton />

            <div className="row-center md:hidden">
              <MenuToggle />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
