'use client'
// import LogoSquare from "@components/LogoSquare";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
// import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {

  const menu = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Room",
      path: "/room",
    },
    {
      title: "Lobby",
      path: "/lobby",
    },
    {
      title: "ItsAMatch",
      path: "/itsamatch",
    },
  ];

  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 lg:px-6 fixed top-0 bg-black/70 backdrop-blur-sm z-50">
        <div className="block flex-none md:hidden">
          {/*<HamburgerMenu menu={menu} />*/}
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="mr-2 flex flex-row w-full items-center justify-center md:w-auto lg:mr-6 divide-x"
            >
              {/*<LogoSquare className='w-5 h-5 relative p-2'/>*/}
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block p-2">
                {/* {process.env.SITE_NAME} */}
                GoTilo
              </div>
            </Link>
            {/* {menu.length!=0 && (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </div>
          <div className="flex justify-end md:w-1/3">
            <ConnectKitButton/>
          </div>
        </div>
      </nav>
    </>
  );
}
