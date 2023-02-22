import Link from "next/link";

export default function SigninButton() {
  return (
    <Link href="/signin" className="row-center">
      <i className="text-xl cursor-pointer ri-user-3-line hover:text-main_color" />
    </Link>
  );
}
