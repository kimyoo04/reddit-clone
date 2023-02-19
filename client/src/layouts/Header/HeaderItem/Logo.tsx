import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <span className="text-xl font-bold">Logo</span>
    </Link>
  );
}
