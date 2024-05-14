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
    name: "Mariya Institute",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1715018846231_mariyainstitute.png&h=300",
    rating: "5",
    link: "https://shikshafinder.com/coaching/1b9d55be-d1ac-4ffa-bf04-fb17ce07834e",
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
