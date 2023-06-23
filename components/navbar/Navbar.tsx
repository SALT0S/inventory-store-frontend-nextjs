import { Popover } from "@headlessui/react";
import React, { useState } from "react";
import { MenuNav } from "../../constants/MenuNav";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover>
      <MobileNavbar navigation={MenuNav} open={open} setOpen={setOpen} />

      <DesktopNavbar navigation={MenuNav} setOpen={setOpen} />
    </Popover>
  );
};
