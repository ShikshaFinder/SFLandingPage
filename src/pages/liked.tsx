import React from "react";
import Card from "../components/card";
import Nouser from "@/components/Nouser";


const cards = [
  {
    name: "Vigyasa",
    imgsrc: "https://www.vigyasa.live/_next/image?url=%2Fsfv1.png&w=256&q=75",
    rating: "5.0",
    link: "https://www.vigyasa.live/",
  },
  {
    name: " Mariya Institute",
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
        <Card
          key={index}
          name={name}
          imgsrc={imgsrc}
          rating={rating}
          link={link}
        />
      ))}
    </>
  );
}

export default likedinstitute;
