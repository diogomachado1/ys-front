import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import LinkNext from "next/link";
import { useAuth } from "../../contexts/auth";

function NavBar() {
  const auth = useAuth();
  return (
    <Flex background="gray.700" h="65px" alignItems="center">
      <LinkNext href="/streams">
        <Link
          color="#f0f0f0"
          mx="2"
          display="flex"
          textDecoration="none"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Image src="/logo.svg" alt="Logo" w="30px" mx="4" mb="-1" />
          <Flex alignItems="baseline">
            <Heading fontWeight="800" color="#f0f0f0">
              Your
            </Heading>
            <Heading fontWeight="400" color="#f0f0f0">
              Stream
            </Heading>
          </Flex>
        </Link>
      </LinkNext>
      {auth.isAuthenticated ? (
        <Menu m="2" ml="auto">
          <MenuButton
            colorScheme="green"
            m="2"
            ml="auto"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar
              border="2px solid #fff"
              size="sm"
              name={auth.user.name}
              src={auth.user.imageUrl}
            />
          </MenuButton>
          <MenuList>
            <Link as={LinkNext} href="/profile" color="#f0f0f0">
              <MenuItem>My Profile</MenuItem>
            </Link>
            <Link as={LinkNext} href="/live" color="#f0f0f0">
              <MenuItem>My Live</MenuItem>
            </Link>
            <MenuItem colorScheme="red" onClick={() => auth.logout()}>
              <Text color="red.500">Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex m="2" ml="auto">
          <Link as={LinkNext} href="/login" color="#f0f0f0">
            <Button colorScheme="green">Sign In</Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}

export default NavBar;
