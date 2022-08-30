import { Popover } from "@headlessui/react";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MenuNav } from "../../constants";
import { ActiveLink } from "./ActiveLink";

export const DesktopBar = () => {
  return (
    <div className="relative h-auto w-auto">
      <nav
        className="z-10 mt-6 flex w-full items-center justify-between px-4 sm:h-10 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link href="/">
              <a className="flex text-white">
                <span className="bg-white py-1 px-2 text-xl font-bold text-black">
                  Jose
                </span>
                <p className="bg-black py-1 px-2 text-lg font-bold text-white dark:text-white">
                  Sanchez S.
                </p>
              </a>
            </Link>

            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2">
                <span className="sr-only">Open main menu</span>
                <HiOutlineMenuAlt3 className="h-7 w-7" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
        </div>

        <ul className="mr-10 hidden md:flex md:space-x-8 lg:mr-0">
          {MenuNav.map((menu) => (
            <ActiveLink
              key={menu.name}
              text={menu.name}
              href={menu.href}
              className="cursor-pointer font-medium text-gray-500 hover:text-black dark:text-zinc-300 dark:hover:text-white"
            />
          ))}
        </ul>

        <div className="hidden md:flex">Get started</div>
      </nav>
    </div>
  );
};
