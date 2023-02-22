import { authActions } from "@features/auth/authSlice";
import { useAppDispatch } from "@toolkit/hook";
import { fadeDownIn } from "@util/variants/dropdown";
import axios from "axios";
import { motion } from "framer-motion";
import DropdownItem from "./DropdownItem";

export default function DropdownMenu() {
  const dispatch = useAppDispatch();
  return (
    <motion.ul
      variants={fadeDownIn}
      initial="init"
      animate="open"
      exit="close"
      className="absolute z-20 w-32 mt-2 overflow-hidden text-sm divide-y divide-gray-200 rounded-lg shadow bg-light_bg_1 dark:bg-night_bg_1 dark:divide-gray-500 text-light_font_1 dark:text-night_font_1 md:right-0"
    >
      {/* 링크 모음 */}
      <DropdownItem linkpath="/dashboard" name="Dashboard" />
      <DropdownItem linkpath="/settings" name="Settings" />

      {/* 로그아웃 */}
      <div className="block px-4 py-2 transition-all duration-200 hover:bg-light_gray_4 dark:hover:bg-night_gray_4">
        <button
          className="text-red-500"
          onClick={async () => {
            const response = await axios.get("/auth/logout");
            console.log(response.data);
            dispatch(authActions.logout());
          }}
        >
          Sign out
        </button>
      </div>
    </motion.ul>
  );
}
