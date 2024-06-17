import { Box, Stack } from "@chakra-ui/react";
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
import Image from "../../../components/image";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Nouser from "../../../components/Nouser";
import { useAuthContext } from "@/context";
import { set } from "react-hook-form";



// import { useAuthContext } from "@/context";

const cards = [
  {
    name: "Vigyasa",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1714766849103_vigysalogo.png&h=300",
    rating: "5.0",
    link: "https://www.vigyasa.live/",
  },
  {
    name: "Computer technology foundation",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1716878654154_New_CTF_Logo%20(1).png&h=300",
    rating: "5",
    link: "https://shikshafinder.com/skillclass/coding/e81f95a8-00e2-4141-ac6c-7be3af2ed470",
  },
];
function IntroSchool() {
  const router = useRouter();
  const { schoolname } = router.query;
  const { user } = useAuthContext();
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
            "schoolname, website, locationlink, location, discription, mobile1, user_id,img,videolink,exam,medium"
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

   if (!user.email ) {
     return <Nouser />;
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
        {userData && userData[0] && userData[0].videolink ? (
          <Videoo src={userData && userData[0] ? userData[0].videolink : ""} />
        ) : (
          <Image src={userData && userData[0] ? userData[0].img : ""} />
        )}

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
          exam={
            userData && userData[0]
              ? userData[0].exam
              : "exams not mentioned by the institutes"
          }
          medium={
            userData && userData[0]
              ? userData[0].medium
              : "exams not mentioned by the institutes"
          }
        />
        <br />
        {useVote && useVote[0]?.extracurricular != 0 ? (
          <Chart
            extra={useVote[0]?.extracurricular}
            quality={useVote[0]?.qualityofeducation}
            management={useVote[0]?.management}
            facilities={useVote[0]?.facilityprovided}
            view={useVote[0]?.view}
          />
        ) : (
          <Alert status="info">
            <AlertIcon />
            This institute has not participated in shiksha star contest yet
          </Alert>
        )}
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          direction={"row"}
        >
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
