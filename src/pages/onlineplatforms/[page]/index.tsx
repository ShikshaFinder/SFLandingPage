import Card from "../../../components/card";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import supabase from "../../../../supabase";
import Bannerad from "../../../components/bannerad";
import Layout from "../[page]/Layout";
import { useRouter } from "next/router";
import Layoutt from "../../Layout";

type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};
export default function skillclass() {
  const [coverImages, setCoverImages] = useState<any[]>([]);
  const { user } = useAuthContext() as { user: UserType };
  const router = useRouter();
  const pathSegments = router.asPath.split("/");

  const lastSegment = pathSegments[pathSegments.length - 1];

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
        <Link href={`../onlineplatforms/${lastSegment}/schoolname`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../onlineplatforms/${lastSegment}/schoolname`}>
          {" "}
          <Card
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>{" "}
        <Link href={`../onlineplatforms/${lastSegment}/schoolname`}>
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
