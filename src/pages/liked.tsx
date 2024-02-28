import React from "react";
import Card from "../components/card";
import Link from "next/link";

const cards = [
  {
    name: "Shree Swami",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
  },
  {
    name: "Shree Swami nararyan ",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
  },
  {
    name: "Shree Swami Nararyan Gurukul",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
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
