import { useAppSelector } from "@toolkit/hook";
import Dropdown from "./Dropdown";
import SigninButton from "./SigninButton";

export default function UserButton() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="row-center">
      {!isAuthenticated ? <SigninButton /> : <Dropdown />}
    </div>
  );
}
