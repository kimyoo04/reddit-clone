import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="relative w-[72px]">
        <div className="z-30 block">Logo</div>
      </div>
    </Link>
  );
}
