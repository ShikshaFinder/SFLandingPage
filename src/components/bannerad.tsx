"use client";

import React, { Fragment } from "react";
import { Box, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useAuthContext } from "@/context";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useUser } from "@/store";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import supabase from "../../supabase";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const Toast = useToast();

  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // These are the images used in the slide

  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);

  const userStore = useUser((state) => state.user);
  // console.log("userstore", userStore);

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("marketingDetails")
        .select("img,redirecturl")
        .range(0, 3);

      setUserData(data);
      //  console.log(data);
      if (error) throw error;
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    if (userStore && userStore.State) {
      getSchool();
    }
  }, [userStore]);

  const cards = [
    {
      img: userData && userData[0]?.img,
      link: userData && userData[0]?.redirecturl,
    },
    {
      img: userData && userData[1]?.img,
      link: userData && userData[1]?.redirecturl,
    },
    {
      img: userData && userData[2]?.img,
      link: userData && userData[2]?.redirecturl,
    },
  ];

  console.log(cards);
  return (
    <Box
      position={"relative"}
      height={"225px"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://web.archive.org/web/20230601084819/https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://web.archive.org/web/20230601084819/https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}

      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map(({ img, link }, index) => (
          
            <a href={link || "#"} key={index}>
              <Box
                height={"6xl"}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`//wsrv.nl/?url=${img}&h=300&flip`}
              />
            </a>
          // </div>
        ))}
      </Slider>
    </Box>
  );
}
