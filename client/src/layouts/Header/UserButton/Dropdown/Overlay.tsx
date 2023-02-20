import Portal from "@components/Portal";
import { Dispatch } from "react";

export default function Overlay({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>;
}) {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed top-0 left-0 z-10 w-full h-full"
    ></div>
  );
}
