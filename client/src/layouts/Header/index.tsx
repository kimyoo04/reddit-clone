import Logo from "./HeaderItem/Logo";
import MenuToggle from "./HeaderItem/MenuToggle";
import NavLink from "./NavLink";
import UserButton from "./UserButton";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-wrap items-center justify-between gap-5 p-5 mx-auto">
        <div className="row-center">
          <Logo />

          <div className="hidden gap-4 ml-6 md:flex ">
            <NavLink linkpath={""} name={"Home"} />
            <NavLink linkpath={"about"} name={"About"} />
            <NavLink linkpath={"contactus"} name={"Contact Us"} />
          </div>
        </div>

        <div className="gap-5 row-center">
          <UserButton />

          <div className="row-center md:hidden">
            <MenuToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
