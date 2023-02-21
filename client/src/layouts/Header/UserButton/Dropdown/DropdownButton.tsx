import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@toolkit/hook";

export default function DropdownButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const username = useAppSelector((state) => state.auth.user.username);

  return (
    <button
      className={`flex items-center justify-between w-full font-medium  rounded  md:p-0 md:w-auto dark:text-night_font_1 dark:hover:text-white dark:focus:text-white hover:text-main_color`}
      onClick={() =>
        setIsOpen((prev) => {
          return !prev;
        })
      }
    >
      {username}
      <svg
        className="w-5 h-5 ml-1"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
