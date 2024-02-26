import Card from "../../components/card";
import React from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
 
export default function skillclass() {
  const [userData, setUserData] = useState<any>();
  const router = useRouter();
  const { user } = useAuthContext();
 const [city, setCity] = useState<string | null>("");
 const [state, setState] = useState<string | null>("");
 const [medium, setMedium] = useState<string | null>("");
 const [standard, setStandard] = useState<string | null>("");
 const [board, setBoard] = useState<string | null>("");

  
  async function getStudent() {
    try {
      let { data, error } = await supabase
        .from("Student")
        .select("*")
        .eq("user_id", user.id);

      if (data) {
        setCity(data[0].District);
        setState(data[0].State);
        setStandard(data[0].Standard);
        setBoard(data[0].Board);
      }
    } catch (error) {
      router.push("/formstudent");
    }
  }


  useEffect(() => {
    getStudent();
  }, []);

  

async function getSchools() {
  if (state !== null) {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("*")
        .eq("State", state);

      console.log(data);
      console.log(error);
      // Now data contains the schools in the same state as the student
    } catch (error) {
      console.error(error);
    }
  }
}
  console.log(userData);
  useEffect(() => {
    getSchools();
  }, []);

  return (
    <>
      <Layoutt>
        <Bannerad />
        {cards.map(({ name, imgsrc, rating, link }, index) => (
          <Card
            key={index}
            name={name}
            imgsrc={imgsrc}
            rating={rating}
            link={link}
          />
        ))}
      </Layoutt>
    </>
  );
}
