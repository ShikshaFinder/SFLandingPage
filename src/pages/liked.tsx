import React from "react";
import Card from "../components/card";
import { Stack } from "@chakra-ui/react";


const cards = [
  {
    name: "Vigyasa",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1714766849103_vigysalogo.png&h=300",
    rating: "5.0",
    link: "https://www.vigyasa.live/",
  },
  {
    name: "Computer Technology Foundation",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1716878654154_New_CTF_Logo%20(1).png&h=300",
    rating: "5",
    link: "https://shikshafinder.com/skillclass/coding/e81f95a8-00e2-4141-ac6c-7be3af2ed470",
  },
];

function likedinstitute() {
  return (
    <>
      {cards.map(({ name, imgsrc, rating, link }, index) => (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Card
            key={index}
            name={name}
            imgsrc={imgsrc}
            rating={rating}
            link={link}
          />
        </Stack>
      ))}
    </>
  );
}

export default likedinstitute;
