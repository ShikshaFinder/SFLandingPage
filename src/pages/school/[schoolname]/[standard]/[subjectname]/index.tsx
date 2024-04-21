import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../../../components/admissionformlink";
import Card from "../../../../../components/card";
import Videoo from "../../../../../components/video";
import { useRouter } from "next/router";
import Subject from "../../../../../components/subject";
import supabase from "../../../../../../supabase";
import { useState, useEffect } from "react";
import React from "react";
import subject from "../../../../../components/subject";
// import Standard from "@/components/Standard";
import InfoSubject from "../../../../../components/infosubject";

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
  },
];

function IntroSchool() {
  const router = useRouter();
  const { subjectname, standard, schoolname } = router.query;
  const [userData, setUserData] = useState<any[] | null>(null);
  // const { user } = useAuthContext();
  console.log("subjectname", subjectname);
  console.log("Standard", standard);
  console.log("school_id", schoolname);

  const [useStandard, setStandard] = React.useState<any[] | null>(null);

  async function getStandard() {
    try {
      if (typeof subjectname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("*")
          .match({
            subject: subjectname,
            Standard: standard,
            user_id: schoolname,
          }).select();

        setStandard(data);
       

        if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);

    //   router.push("/formstudent");
    }
  }
   console.log("userData", useStandard);
   console.log("userData", useStandard);


  // async function getSchool() {
  //   try {
  //     if (typeof user_id === "string") {
  //       let { data, error } = await supabase
  //         .from("schoolDemo")
  //         .select("*")
  //         .eq("user_id", user_id);

  //       if (error) throw error;

  //       setUserData(data);
  //       console.log("userStandard", data);
  //       // console.log("view", data && data[0].view);
  //       // Check if 'view' is not null
  //       if (data && data[0].view !== null) {
  //         // Increment the 'view' column value
  //         const newViewValue = data[0].view + 1;
  //         // console.log("newViewValue", newViewValue);

  //         // Update the 'view' column with the new value
  //         const { error: updateError } = await supabase
  //           .from("schoolDemo")
  //           .update({ view: newViewValue })
  //           .eq("schoolname", schoolname);

  //         // console.log("view incremented");
  //         // console.log("updateError", updateError);

  //         if (updateError) {
  //           throw updateError;
  //         }
  //       }
  //     } else {
  //       console.log("No schoolname found");
  //     }
  //   } catch (error) {
  //     console.log("Caught Error:", error);
  //   }
  // }

  // useEffect(() => {
  //   getSchool();
  // }, [schoolname]);
  useEffect(() => {
    getStandard();
  }, [subjectname]);

  return (
    <>
      <Subject
        subject1="maths"
        subject2="hindi"
        subject3="Social Science"
        subject4="Science"
      />
      <br />
      <Videoo
        src={useStandard && useStandard[0] ? useStandard[0].videolink : ""}
      />
      <br />
      <InfoSubject
        TeacherName={
          useStandard && useStandard[0] ? useStandard[0].Teachername : ""
        }
        discription={
          useStandard && useStandard[0] ? useStandard[0].discription : ""
        }
      />

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
        name={useStandard && useStandard[0] ? useStandard[0].user_id : ""}
        phoneNumber={7984140706}
      />
    </>
  );
}

export default IntroSchool;
