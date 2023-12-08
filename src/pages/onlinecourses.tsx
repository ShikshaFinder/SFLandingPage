import React from 'react'
import Card from "../components/card"
import Bannerad from "../components/bannerad";
import Link from "next/link"

function onlinecourses() {
  return (
    <>
      <Bannerad />

        <Link href={"/introschool"}>
          <Bannerad />
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
    </>
  );
}

export default onlinecourses