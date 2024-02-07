import Card from "../../components/card";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import supabase from "../../../supabase";
import Bannerad from "../../components/bannerad";
import Layout from "./[page]/Layout";
import Layoutt from "../Layout";

export default function skillclass() {
  const [coverImages, setCoverImages] = useState<any[]>([]);
  const { user } = useAuthContext() ;


  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("uploads")
      .list(user.id + "/");

    if (data) {
      setCoverImages(data);
      console.log(coverImages);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
    <Layoutt>
      <Layout>
        <Bannerad />
        <Link href={`../onlineplatforms/1/onlineplatforms`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../onlineplatforms/1/onlineplatforms`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../onlineplatforms/1/onlineplatforms`}>
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
