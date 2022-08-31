import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import { MenuNav } from "../../constants";
import { ActiveLink } from "./ActiveLink";

export const MobileBar = () => {
  return (
    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
      >
        <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 dark:bg-black">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="flex text-white">
              <p className="bg-black py-1 px-2 text-lg font-bold text-white dark:text-white">
                LOGO
              </p>
            </div>

            <div className="-mr-2">
              <Popover.Button className="inline-flex items-center justify-center p-2">
                <span className="sr-only">Close main menu</span>
                <HiX className="h-7 w-7" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>

          <ul className="space-y-1 px-2 pt-2 pb-3">
            {MenuNav.map((menu) => (
              <ActiveLink
                key={menu.name}
                href={menu.href}
                text={menu.name}
                className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              />
            ))}
          </ul>

          <p className="block w-full bg-gray-50 px-5 py-3 text-center font-medium hover:bg-gray-100 dark:bg-zinc-900">
            Get started
          </p>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
