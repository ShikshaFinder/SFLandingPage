import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../../components/admissionformlink";
import Card from "../../../../components/card";
import Videoo from "../../../../components/video";
import InfoTeacher from "../../../../components/InfoTeacher";
import Chart from "../../../../components/Chart";
import React from "react";
import { useRouter } from "next/router";
import supabase from "../../../../../supabase";
import { useEffect, useState } from "react";

const cards = [
  {
    name: "Shree Swami",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/skillclass/typeofclass/nameofCoaching",
  },
  {
    name: "Shree Swami nararyan ",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
  }
];

function IntroSchool() {
  const router = useRouter();
  const { skillclass } = router.query;
  // const { user } = useAuthContext();
  console.log(skillclass);

    



  const [userData, setUserData] = useState<any[] | null>(null);
  const [View, setView] = useState<number | null>(null);

  async function getSchool() {
    try {
      if (typeof skillclass === "string") {
        let { data, error } = await supabase
          .from("skillclass")
          .select("*")
          .eq("user_id", skillclass);

        if (error) throw error;

        setUserData(data);
        console.log("userData", userData);

        // Check if 'view' is not null
        if (data && data[0].view !== null) {
          // Increment the 'view' column value
            const newViewValue = data[0].view + 1;
            console.log("newViewValue", newViewValue);
            setView(newViewValue);
            console.log("view incremented", View);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("School")
            .update({ view: newViewValue })
            .eq("skillname", skillclass);
          console.log("view incremented");
          console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      } else {
        setView(1);
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [skillclass]);

  return (
    <>
     
      <br />
      <Videoo src={userData && userData[0] ? userData[0].videolink : ""} />
      <br />
      <InfoTeacher
        TeacherName={userData && userData[0] ? userData[0].skillclassname : ""}
        location={userData && userData[0] ? userData[0].location : ""}
        locationlink={userData && userData[0] ? userData[0].locationlink : ""}
        discription={userData && userData[0] ? userData[0].discription : ""}
      />

      <Chart extra={9} quality={8} management={7} facilities={8} />
      <Stack direction={"row"}>
        {cards.map(({ name, imgsrc, rating, link }, index) => (
          <Card
            key={index}
            name={name}
            imgsrc={imgsrc}
            rating={rating}
            link={link}
          />
        ))}
      </Stack>
      <Admissionform
        name={userData && userData[0] ? userData[0].user_id : ""}
        phoneNumber={userData && userData[0] ? userData[0].skillclassname : ""}
      />
    </>
  );
}

export default IntroSchool;
