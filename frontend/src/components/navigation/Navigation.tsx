import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ABOUT, HOME, LOGIN, REGISTER } from "@/constants/routeConstants";
import { SITE_NAME } from "@/constants/constants";
// import { Button } from "../common/buttons/Button";
import { Box, Button, Container, Flex, Header, Navbar } from "@mantine/core";
import { LinkButton } from "../common/buttons/LinkButton";
import { useLogout } from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext, UserContextType } from "@/context/userContext";
import { Avatar } from "../Avatar";

const menuItems = [
  {
    name: "About",
    href: ABOUT,
  },
];

export const Navigation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = React.useContext(UserContext) as UserContextType;

  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate("nic", {
      onSuccess: () => {
        console.log("logout success");
        queryClient.removeQueries();
        setUser(null);
        router.push(HOME);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Header height={60} p={4}>
      <Container size="xl">
        <Flex
          p={2}
          w="100%"
          mx="auto"
          align="center"
          justify="space-between"
          sx={{ textTransform: "uppercase" }}
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
              {!user ? (
                <>
                  <li className="mr-4">
                    <LinkButton
                      url={REGISTER}
                      color="secondary"
                      className="md:py-2 md:px-4"
                    >
                      Register
                    </LinkButton>
                  </li>
                  <li>
                    <LinkButton
                      url={LOGIN}
                      color="primary"
                      className="md:py-2 md:px-4"
                    >
                      Login
                    </LinkButton>
                  </li>
                </>
              ) : (
                <>
                  <Avatar
                    picUrl={
                      user.pictureUrl || "https://via.placeholder.com/40.png"
                    }
                  />

                  <li>
                    <Button onClick={handleLogout}>Logout</Button>
                  </li>
                </>
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
                {!user ? (
                  <>
                    <li className="mb-4">
                      <LinkButton
                        url={REGISTER}
                        color="secondary"
                        className="md:py-2 md:px-4"
                      >
                        Register
                      </LinkButton>
                    </li>
                    <li>
                      <LinkButton
                        url={LOGIN}
                        color="primary"
                        className="md:py-2 md:px-4"
                      >
                        Login
                      </LinkButton>
                    </li>
                  </>
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
          )}
        </Flex>
      </Container>
    </Header>
  );
};
