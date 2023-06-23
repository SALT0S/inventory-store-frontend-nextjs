import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../lib/useAuth";
import { ActiveLink } from "./ActiveLink";

type DesktopNavbarProps = {
  navigation: {
    name: string;
    href: string;
  }[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopNavbar: React.FC<DesktopNavbarProps> = (props) => {
  const { navigation, setOpen } = props;
  const { user, logout } = useAuth();

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="flex text-white">
                  <span className="sr-only">Developed by Jose SS</span>
                  <span className="bg-sky-800 py-1 px-2 text-xl font-bold">
                    Inventario
                  </span>
                  <p className="py-1 px-2 text-lg font-bold text-black">UG</p>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <ActiveLink
                    text="Productos"
                    href="/"
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800"
                  />
                  <ActiveLink
                    text="Categorias"
                    href="/categorias"
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800"
                  />
                  <ActiveLink
                    text="Gestionar productos"
                    href="/gestionar"
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800"
                  />
                  {/*{user && (
                    <ActiveLink
                      text="Gestionar productos"
                      href="/gestionar"
                      className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800"
                    />
                  )}*/}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <>
                      <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        {user.name}
                      </p>

                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />

                      <Link
                        href="/auth"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        onClick={logout}
                      >
                        Cerrar sesión
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Ingresar
                      </Link>

                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />

                      <Link
                        href="/auth/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://tailwindui.com/img/flags/flag-united-states.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">USD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
