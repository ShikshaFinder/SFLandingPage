import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
// import Aboutus from "./components/aboutus";

import Link from "next/link";
// Here we have used react-icons package for the icons
import { FaBell } from "react-icons/fa";

import {
  BsFillPaletteFill,
  BsHousesFill,
  BsPerson,
  BsHospitalFill,
} from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import Card from "./components/card";

export default function Index() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify={{ base: "space-between", md: "flex-end" }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="shikshafinder"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box
          as="main"
          p={14}
          minH="25rem"
          bg={useColorModeValue("auto", "gray.800")}
        >
          <Stack
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            h="100%"
          ></Stack>
          {/* insert */}
          {/* <Hero />
          <Aboutus /> */}
          <Card /> <Card /> <Card /> <Card /> <Card /> <Card /> <Card />{" "}
          <Card />
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }: BoxProps) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue("white", "gray.800")}
    borderColor={useColorModeValue("inherit", "gray.700")}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Icon as={RiFlashlightFill} h={8} w={8} />
      <Text
        fontSize="2xl"
        ml="2"
        color={useColorModeValue("brand.500", "white")}
        fontWeight="semibold"
      >
        Shiksha Finder
      </Text>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="md"
      color="gray.600"
      aria-label="Main Navigation"
    >
      {" "}
      <Link href={"./School"}>
        <NavItem icon={BsHospitalFill}>Schools</NavItem>
      </Link>
      <Link href={"./coaching"}>
        <NavItem icon={BsHousesFill}>Coaching Classes</NavItem>
      </Link>
      <Link href={"./skillclass"}>
        <NavItem icon={BsFillPaletteFill}>Skill Classes</NavItem>
      </Link>
      <Link href={"./parent"}>
        <NavItem icon={BsPerson}>Content For Parents</NavItem>
      </Link>
    </Flex>
  </Box>
);

const NavItem = (props: any) => {
  const color = useColorModeValue("gray.600", "gray.300");

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};
