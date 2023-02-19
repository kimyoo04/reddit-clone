import Link from "next/link";

export default function NavLink({
  linkpath,
  name,
}: {
  linkpath: string;
  name: string;
}) {
  const link = `/${linkpath}`;

  return (
    <Link href={link}>
      <span className="transition-all duration-500">{name}</span>
    </Link>
  );
}
