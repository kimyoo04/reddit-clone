import Link from "next/link";
import { motion } from "framer-motion";
import { liVariants } from "@util/variants/dropdown";

export default function DropdownItem({
  linkpath,
  name,
}: {
  linkpath: string;
  name: string;
}) {
  return (
    <motion.li variants={liVariants}>
      <Link
        href={linkpath}
        className="block px-4 py-2 transition-all duration-200 hover:bg-light_gray_4 dark:hover:bg-night_gray_4 dark:hover:text-white"
      >
        {name}
      </Link>
    </motion.li>
  );
}
