import { Popover } from "@headlessui/react";
import { DesktopBar } from "./DesktopBar";
import { MobileBar } from "./MobileBar";

export const Navbar = () => {
  return (
    <Popover>
      {/* TODO: Arreglar el navbar, eliminar el codigo inservible y hacerlo lo mas simple posible :) */}
      <DesktopBar />
      <MobileBar />
    </Popover>
  );
};
