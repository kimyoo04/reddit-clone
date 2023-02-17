import NavLink from "./FooterItem/NavLink";
import Logo from "./FooterItem/Logo";
import SimpleFooter from "./SimpleFooter";

export default function Footer() {
  return (
    <footer className="text-gray-600 border-t border-t-light_gray_3/30 dark:border-t-night_gray_3/30">
      {/* main footer */}
      <div className="container flex flex-wrap col-center gap-4 justify-between px-5 py-8 mx-auto md:items-center  md:flex-row md:flex-nowrap">
        {/* 네비게이션 */}
        <div className="flex flex-wrap flex-grow order-first my-auto text-center md:pr-32 md:text-left ">
          <NavLink linkpath={""} name={"Home"} />
          <NavLink linkpath={"about"} name={"About"} />
          <NavLink linkpath={"contactus"} name={"Contact Us"} />
          <NavLink linkpath={"signin"} name={"Sign In"} />
        </div>

        {/* 로고 */}
        <div className="mx-auto text-center row-center md:mx-0 lg:text-right">
          <Logo />
        </div>
      </div>

      {/* sub footer */}
      <SimpleFooter />
    </footer>
  );
}
