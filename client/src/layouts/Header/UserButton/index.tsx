import { useAppSelector } from "@toolkit/hook";
import SigninButton from "./SigninButton";

export default function UserButton() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
        <button
          type="button"
          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <div className="w-[24px] h-[24px] bg-black rounded-full" />
        </button>
      ) : (
        <SigninButton />
      )}
    </div>
  );
}
