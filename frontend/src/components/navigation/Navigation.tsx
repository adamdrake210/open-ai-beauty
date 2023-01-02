import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ABOUT, HOME, LOGIN, REGISTER } from "@/constants/routeConstants";
import { SITE_NAME } from "@/constants/constants";
import {
  Box,
  Burger,
  Button,
  Container,
  Flex,
  Header,
  Menu,
  Text,
} from "@mantine/core";
import { useLogout } from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext, UserContextType } from "@/context/userContext";
import { Avatar } from "../Avatar";
import { useMediaQuery } from "@mantine/hooks";

const menuItems = [
  {
    name: "About",
    href: ABOUT,
  },
];

export const Navigation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isSmDown = useMediaQuery("(max-width: 800px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const title = isMenuOpen ? "Close navigation" : "Open navigation";
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
          <Link href={HOME}>
            <Text
              sx={{ textTransform: "uppercase", fontSize: "1.5rem" }}
              mt={8}
            >
              {SITE_NAME}
            </Text>
          </Link>

          {/* This is the menu for desktop */}
          <Box hidden={isSmDown}>
            <Flex align="center" justify="center">
              {menuItems.map((item) => {
                return (
                  <Link href={item.href} key={item.name}>
                    <Text
                      mr={16}
                      mt={8}
                      sx={{
                        textTransform: "uppercase",
                        fontSize: "1.5rem",
                      }}
                    >
                      {item.name}
                    </Text>
                  </Link>
                );
              })}
              {!user ? (
                <>
                  <Link href={REGISTER}>
                    <Button color="grape" size="md" mr={4}>
                      Register
                    </Button>
                  </Link>

                  <Link href={LOGIN}>
                    <Button color="indigo" size="md">
                      Login
                    </Button>
                  </Link>
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
            </Flex>
          </Box>

          {/* This is menu for mobile */}
          {isSmDown && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                {/* Hambirger for mobile Menu */}
                <Burger
                  color="gray"
                  opened={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  title={title}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>

                {menuItems.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Menu.Item
                        sx={{
                          textTransform: "uppercase",
                          fontSize: "1.2rem",
                          fontWeight: 100,
                        }}
                      >
                        {item.name}
                      </Menu.Item>
                    </Link>
                  );
                })}
                <Menu.Divider />

                {!user ? (
                  <Flex direction="column">
                    <Link href={REGISTER}>
                      <Button color="grape" size="md" mb={4} w={150}>
                        Register
                      </Button>
                    </Link>

                    <Link href={LOGIN}>
                      <Button color="indigo" size="md" w={150}>
                        Login
                      </Button>
                    </Link>
                  </Flex>
                ) : (
                  <Button color="indigo" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
      </Container>
    </Header>
  );
};