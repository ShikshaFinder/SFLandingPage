import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../../../components/admissionformlink";
import Card from "../../../../../components/card";
import Videoo from "../../../../../components/video";
import { useRouter } from "next/router";
import supabase from "../../../../../../supabase";
import { useState, useEffect } from "react";
import React from "react";
// import Standard from "@/components/Standard";
import InfoSubject from "../../../../../components/infosubject";
import Standard from "@/components/subject";

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


  useEffect(() => {
    getStandard();
  }, [subjectname]);

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        align="center"
        overflowX="auto"
        whiteSpace="nowrap"
      >
        {useStandard &&
          useStandard.map(
            (
              standardItem: {
                Standard: string;
                schoolname: any;
                subject: string;
              },
              index: number
            ) => (
              <>
                <Standard
                  key={index}
                  name={standardItem.Standard}
                  Standard={standardItem.Standard}
                  schoolname={schoolname}
                  Subject={standardItem.subject}
                />
              </>
            )
          )}
      </Stack>
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
