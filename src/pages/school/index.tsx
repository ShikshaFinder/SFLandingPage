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

  async function getSchools() {
    if (state !== null) {
      try {
        // Fetch the student data first to ensure it's available
        let studentData = await supabase
          .from("Student")
          .select("*")
          .eq("user_id", user.id);

        if (studentData.error || studentData.data.length === 0) {
          // Handle error or no data found for the user
          console.error("Error fetching student data or no data found.");
          return;
        }

        // Extract the district from the student data
        const district = studentData.data[0].District;

        // Fetch schools in the same state and district as the student
        let { data: schoolsData, error: schoolsError } = await supabase
          .from("School")
          .select("*")
          .eq("State", state)
         

        if (schoolsError) {
          // Handle error fetching schools data
          console.error("Error fetching schools data:", schoolsError.message);
          return;
        }

        console.log(schoolsData);
        // Now schoolsData contains the schools in the same state and district as the student
      } catch (error) {
        console.error("Error:",console.error);
      }
    }
  }

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
