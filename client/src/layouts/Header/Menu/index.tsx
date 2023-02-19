import Portal from "@components/Portal";
import ThemeChanger from "@util/Theme/ThemeChanger";
import { LayoutGroup } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import NavLink from "./NavLink";
import Overlay from "./Overlay";

const Menu = ({
  setIsClicked,
}: {
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Overlay setIsClicked={setIsClicked}>
      <div className="z-40 gap-10 col-center">
        <nav className="w-48 gap-4 col-center sm:mt-auto ">
          <LayoutGroup>
            <NavLink linkpath={""} name={"Home"} />
            <NavLink linkpath={"about"} name={"About"} />
            <NavLink linkpath={"contactus"} name={"Contact Us"} />
          </LayoutGroup>
        </nav>

        {/* 토글 버튼 */}
        <ThemeChanger />
      </div>
    </Overlay>
  );
};

// HOC 적용
export default Portal(Menu);
