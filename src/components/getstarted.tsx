import React from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

function Navnew() {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        Let's Explore 🚀
      </MenuButton>
      <MenuList>
        <Link href={"/skillclass"}>
          <MenuItem>Skill classes near me 🤹🏻</MenuItem>
        </Link>
        <Link href={"/profile"}>
          <MenuItem>My account</MenuItem>
        </Link>
        <MenuDivider />
        <Link href={"/onlineplatforms"}>
          <MenuItem>online platforms 🛜</MenuItem>
        </Link>
        <Link href={"/school"}>
          <MenuItem>Schools near me 🏫</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

export default Navnew;
