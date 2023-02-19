import Link from "next/link";

export default function SigninButton() {
  return (
    <Link href="/signin">
      <button className="px-3 py-[2px] bg-gray-300 rounded-full">
        Sign In
      </button>
    </Link>
  );
}
