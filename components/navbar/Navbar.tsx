import { Popover } from '@headlessui/react';
import { DesktopBar } from './DesktopBar';
import { MobileBar } from './MobileBar';

export const Navbar = () => {
  return (
    <Popover>
      <DesktopBar />

      <MobileBar />
    </Popover>
  );
};
