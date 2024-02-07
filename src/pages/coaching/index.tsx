import Card from "../../components/card";
import React from "react";
import Link from "next/link";
import Bannerad from "../../components/bannerad";
import Layout from "./[page]/Layout";
import Layoutt from "../Layout";

export default function skillclass() {
  return (
    <>
<Layoutt>
      <Layout>
        <Bannerad />
        <Link href={`../coaching/1/Coachingname`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../coaching/1/schoolname`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../coaching/1/schoolname`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
      </Layout>
      </Layoutt>
    </>
  );
}
