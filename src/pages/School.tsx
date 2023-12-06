import Card from "../components/card";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import supabase from "../../supabase";

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
    <div>
      <Link href={"/introschool"}>
        <Card /> <Card /> <Card /> <Card /> <Card /> <Card /> <Card />
      </Link>
    </div>
  );
}
