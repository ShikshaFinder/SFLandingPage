import React, { Fragment } from "react";
import { Box, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useAuthContext } from "@/context";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useUser } from "@/store";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import supabase from "../../supabase";
import Card from "./card";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Carousel() {


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  
  

  // These are the images used in the slide

  const [userData, setUserData] = useState<any[] | null>(null);

  const userStore = useUser((state) => state.user);
  // console.log("userstore", userStore);

  async function getAd() {
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
      getAd();
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
    {
      img: userData && userData[3]?.img,
      link: userData && userData[3]?.redirecturl,
    },
    {
      img: userData && userData[4]?.img,
      link: userData && userData[4]?.redirecturl,
    },
    {
      img: userData && userData[5]?.img,
      link: userData && userData[5]?.redirecturl,
    },
    {
      img: userData && userData[6]?.img,
      link: userData && userData[6]?.redirecturl,
    },
  ];

  console.log(cards);
  return (
    <>
      <div style={{ width: "80%", marginInline: "auto" }}>
        {" "}
        <Slider {...settings}>
          {cards.map(({ img, link }, index) => (
            <Fragment key={index}>
              {" "}
              <Card imgsrc={img} link={link} />
            </Fragment>
          ))}
          {/* Add more Card components here */}
        </Slider>
      </div>
    </>
  );
}
