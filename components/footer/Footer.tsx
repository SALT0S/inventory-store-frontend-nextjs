import Link from "next/link";
import { FooterNav, socialMedia } from "../../constants";

export const Footer = () => {
  return (
    <footer className=" bg-black dark:bg-zinc-900">
      <div className="container mx-auto grid gap-10 px-4 py-9 text-center md:grid-cols-1 lg:grid-cols-2 lg:text-left">
        <div>
          <div className="flex place-content-center text-white lg:place-content-start">
            <p className="bg-black py-1 px-2 text-lg font-bold text-white dark:text-white">
              LOGO
            </p>
          </div>
          <div className="my-5 flex place-content-center gap-8 lg:place-content-start">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon
                  className="h-8 w-8 text-white "
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <p className="mx-auto w-5/6 text-zinc-300 lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            corrupti cumque ratione quaerat dolor eum!
          </p>
        </div>

        <div className="grid gap-4 text-gray-200 sm:grid-cols-2 md:grid-cols-4">
          {FooterNav.map((link, index) => (
            <ul key={index}>
              <li>
                <div className="my-3 font-bold text-white">{link.title}</div>
              </li>
              {link.Links.map((links, index) => (
                <li key={index} className="my-3">
                  <Link href={links.href} prefetch={false} passHref>
                    <a className="text-zinc-300 hover:text-white hover:underline">
                      {links.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 py-4 dark:bg-black">
        <p className="text-center text-white ">
          &copy; {new Date().getFullYear()} NEXTJS - TEMPLATE.
        </p>
      </div>
    </footer>
  );
};
