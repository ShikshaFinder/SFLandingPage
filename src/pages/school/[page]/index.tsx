import React from "react";
import { useRouter } from "next/router";
import Card from "../../../components/card";
import Layout from "./Layout";
import Link from "next/link";
function Pagenumber() {
  const router = useRouter();

  return (
    <>
      <Layout>
        {" "}
        <Link href={"/school/2/schoolname"}>
          <Card
            name="Shree Swami"
            rating="3.4"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </Link>
      </Layout>
    </>
  );
}

export default Pagenumber;
