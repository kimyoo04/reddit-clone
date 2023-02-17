import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({
  linkpath,
  name,
}: {
  linkpath: string;
  name: string;
}) {
  const router = useRouter();
  const link = `/${linkpath}`;

  return (
    <Link href={link} className="group">
      <span className={`text-4xl transition-all duration-500 `}>{name}</span>
    </Link>
  );
}
