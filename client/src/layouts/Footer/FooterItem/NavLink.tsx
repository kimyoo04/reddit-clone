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
    <div className="w-full lg:w-1/4 md:w-1/2">
      <Link href={link} className="mb-3 text-sm font-medium tracking-widest">
        <span className={`block`}>{name}</span>
      </Link>
    </div>
  );
}
