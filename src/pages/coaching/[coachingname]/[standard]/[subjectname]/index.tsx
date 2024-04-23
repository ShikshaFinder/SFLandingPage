import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../../../components/admissionformlink";
import Card from "../../../../../components/card";
import Videoo from "../../../../../components/video";
import { useRouter } from "next/router";
import supabase from "../../../../../../supabase";
import { useEffect } from "react";
import React from "react";
// import Standard from "@/components/Standard";
import InfoSubject from "../../../../../components/infosubject";
import ShareButton from "../../../../../components/shareButton";
import Subject from "@/components/subject";

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
  const { subjectname, standard, coachingname } = router.query;

  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useStandard1, setStandard1] = React.useState<any[] | null>(null);

  async function getStandard1() {
    try {
      if (typeof subjectname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("subject,Standard")
          .match({
            Standard: standard,
            user_id: coachingname,
          });

        setStandard1(data);
        console.log("standarrrrrrrrrd", data);

        if (error) throw error;
      } else {
        console.log("No coachingname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);

      //   router.push("/formstudent");
    }
  }

  useEffect(() => {
    getStandard1();
  }, [subjectname]);

  async function getStandard() {
    try {
      if (typeof subjectname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("*")
          .match({
            Standard: standard,
            user_id: coachingname,
            subject: subjectname,
          });

        setStandard(data);
        console.log("standarrrrrrrrrd", data);

        if (error) throw error;
      } else {
        console.log("No coachingname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);

      //   router.push("/formstudent");
    }
  }

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
        {useStandard1 &&
          useStandard1.map(
            (
              standardItem: {
                Standard: string;
                coachingname: any;
                subject: string;
              },
              index: number
            ) => (
              <>
                <Subject
                  key={index}
                  name={standardItem.subject}
                  Standard={standardItem.Standard}
                  schoolname={coachingname}
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
      <ShareButton link="https://shikshafinder.com/" />
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
