import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";
import Overlay from "./Overlay";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <ul className="relative row-center">
        <div>
          <DropdownButton setIsOpen={setIsOpen} />

          <AnimatePresence>
            {isOpen && (
              <>
                <Overlay setIsOpen={setIsOpen} />
                <DropdownMenu />
              </>
            )}
          </AnimatePresence>
        </div>
      </ul>
    </div>
  );
}
