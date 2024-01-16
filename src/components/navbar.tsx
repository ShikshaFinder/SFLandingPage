"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaSchool,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaPaintBrush,
  FaGlobe,
} from "react-icons/fa";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { useAuthContext } from "@/context";


type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>;
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};


export default function Navbar() {
  const isMobileNav = useBreakpointValue({ base: true, md: false });
  const { user } = useAuthContext() as { user: UserType };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        ></Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link href={"/"}>ShikshaFinder</Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user && user.email ? (
            <Button
              as={Link}
              href={"/profile"}
              passHref
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
            >
              Profile
            </Button>
          ) : (
            <Button
              as={Link}
              href={"/login"}
              passHref
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
            >
              Sign In
            </Button>
          )}
          <Button
            as={Link}
            href={"/signup"}
            passHref
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue"}
            _hover={{
              bg: "blue.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
      <Box>{isMobileNav ? <MobileNav /> : null}</Box>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as={Link}
                href={navItem.href ?? "../school"}
                passHref
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as={Link}
      href={href}
      passHref
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
const handleClick = (iconName: string) => {
  setSelectedIcon(iconName);
};
const boxColor = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg={boxColor}
        zIndex={10}
        borderTopWidth="1px"
        borderColor="gray"
      >
        <Stack direction={"row"} spacing={85}>
          <Link href={"/school"}>
            <FaSchool
              size={20}
              color={selectedIcon === "school" ? "blue" : "initial"}
              onClick={() => handleClick("school")}
            />
          </Link>
          <Link href={"coaching"}>
            <FaChalkboardTeacher
              size={20}
              color={selectedIcon === "coaching" ? "blue" : "initial"}
              onClick={() => handleClick("coaching")}
            />
          </Link>
          <Link href={"onlineplatforms"}>
            <FaGlobe
              size={20}
              color={selectedIcon === "online" ? "blue" : "initial"}
              onClick={() => handleClick("online")}
            />
          </Link>
          <Link href={"/skillclass"}>
            <FaPaintBrush
              size={20}
              color={selectedIcon === "skill" ? "blue" : "initial"}
              onClick={() => handleClick("skill")}
            />
          </Link>
        </Stack>
      </Box>
    </>
  );
};


interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "School & Coaching Classes",
    children: [
      {
        label: "Schools",
        subLabel: "Choose the right school For the best future of yours",
        href: "../school",
      },
      {
        label: "Coaching classes",
        subLabel: "Let's get Started!",
        href: "../coaching",
      },
    ],
  },
  {
    label: "Skill classes & Online Platforms",
    href: "../skillclass",
    children: [
      {
        label: "Skill Classes",
        subLabel: "Learn what you Love",
        href: "../skillclass",
      },
      {
        label: "Online Platform",
        subLabel: "Find Out The  Best!",
        href: "../onlineplatforms",
      },
    ],
  },
  {
    label: "aboutus",
    href: "./aboutus",
  },
  {
    label: "profile",
    href: "/profile",
  },
];
