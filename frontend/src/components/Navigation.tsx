import React, { useState } from "react";
import Link from "next/link";
import { ABOUT, HOME, LOGIN, REGISTER } from "@/constants/routeConstants";
import { SITE_NAME } from "@/constants/constants";
import { Button } from "./common/buttons/Button";
import { LinkButton } from "./common/buttons/LinkButton";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  {
    name: "About",
    href: ABOUT,
  },
  { name: "Register", href: REGISTER },
];

export const Navigation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate, isLoading, isError, error } = useLogout();

  const handleLogout = () => {
    mutate("nic", {
      onSuccess: () => {
        console.log("logout success");
        queryClient.removeQueries();
        router.push(HOME);
      },
    });
  };

  return (
    <nav
      className="
    bg-white
    drop-shadow-md
    uppercase
    font-primary
    "
    >
      <div
        className="
      container mx-auto
      flex
      w-full
      max-w-screen-xl
      flex-wrap
      items-center 
      justify-between 
      py-4  
      px-4
      text-lg
      text-gray-500
      lg:h-16
      lg:py-0
      lg:px-28
      "
      >
        <Link href={HOME} className="text-2xl">
          {SITE_NAME}
        </Link>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block h-8 w-8 cursor-pointer lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <div className="hidden w-full lg:flex lg:w-auto lg:items-center ">
          <ul
            className="
              flex 
              justify-between
              pt-0
              text-gray-500"
          >
            {menuItems.map((item) => {
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 hover:text-[#B83F93] md:py-2 md:px-4 text-2xl"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            {false ? (
              <li>
                <LinkButton
                  url={LOGIN}
                  color="primary"
                  className="md:py-2 md:px-4"
                >
                  Login
                </LinkButton>
              </li>
            ) : (
              <li>
                <Button
                  color="secondary"
                  className="md:py-2 md:px-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
        {isMenuOpen && (
          <div className={`w-full transition delay-300 ease-in-out`}>
            <ul
              className="
          pt-4 text-2xl 
          text-gray-500"
            >
              {menuItems.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 hover:text-[#B83F93] hover:underline lg:py-4 lg:px-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
