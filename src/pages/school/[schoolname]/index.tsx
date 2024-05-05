import { Box, Flex, Stack } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/InfoTeacher";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import React from "react";
import { useRouter } from "next/router";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
import ShareButton from "../../../components/shareButton";
// import { useAuthContext } from "@/context";

const cards = [
  {
    name: "Shree Swami",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/skillclass/typeofclass/nameofCoaching",
  },
  {
    name: "Shree ",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
  },
];

function IntroSchool() {
  const router = useRouter();
  const { schoolname } = router.query;

  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [userData, setUserData] = useState<any[] | null>(null);
  const [useVote, setVote] = React.useState<any[] | null>(null);

  async function getStandard() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("Standard,subject")
          .eq("user_id", schoolname);

        setStandard(data);

        // if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function getVote() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("votes")
          .select(
            "qualityofeducation,facilityprovided,management,extracurricular,view"
          )
          .eq("user_id", schoolname);

        setVote(data);

        // if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function getSchool() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("School")
          .select(
            "schoolname, videolink, website, locationlink, location, discription, mobile1, user_id"
          )
          .eq("user_id", schoolname);

        if (error) throw error;

        setUserData(data);
        // console.log("view", data && data[0].view);
        // Check if 'view' is not null
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

 

 

  async function updateView() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("viewschool")
          .select("view")
          .eq("user_id", schoolname);

        setUseView(data);
        if (error) throw error;

        console.log("view", data);

        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewschool")
            .update({ view: newViewValue })
            .eq("user_id", schoolname);

          console.log("view incremented bdvkb");
          // console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      } else {
        console.log("string error");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

   useEffect(() => {
     getStandard();
   }, [schoolname]);

    useEffect(() => {
      getSchool();
    }, [schoolname]);

    useEffect(() => {
      getVote();
    }, [schoolname]);

  useEffect(() => {
    updateView();
  }, []);

  return (
    <>
      <Box
        p={{
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
        }}
        m={{
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
        }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
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
        <Videoo src={userData && userData[0] ? userData[0].videolink : ""} />
        <br />
        <ShareButton
          link={userData && userData[0] ? userData[0].website : ""}
        />
        <br />
        <InfoTeacher
          TeacherName={userData && userData[0] ? userData[0].schoolname : ""}
          locationlink={userData && userData[0] ? userData[0].locationlink : ""}
          location={userData && userData[0] ? userData[0].location : ""}
          discription={userData && userData[0] ? userData[0].discription : ""}
        />
        <br />
        <Chart
          extra={useVote && useVote[0]?.extracurricular}
          quality={useVote && useVote[0]?.qualityofeducation}
          management={useVote && useVote[0]?.management}
          facilities= {useVote && useVote[0]?.facilityprovided}
          view={useVote && useVote[0]?.view}
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
          name={userData && userData[0] ? userData[0].user_id : ""}
          phoneNumber={userData && userData[0] ? userData[0].mobile1 : ""}
        />
      </Box>{" "}
    </>
  );
}

export default IntroSchool;
