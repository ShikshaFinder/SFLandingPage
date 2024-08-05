import { Stack, Box } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/InfoTeacher";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import React, { use } from "react";
import { useRouter } from "next/router";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
import ShareButton from "../../../components/shareButton";
import { useAuthContext } from "@/context";
import Nouser from "@/components/Nouser";
import Image from "../../../components/image";
import { Alert, AlertIcon } from "@chakra-ui/react";

// const cards = [
//   {
//     name: "Vigyasa",
//     imgsrc:
//       "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1714766849103_vigysalogo.png&h=300",
//     rating: "5.0",
//     link: "https://www.vigyasa.live/",
//   },
//   {
//     name: " Computer technology foundation",
//     imgsrc:
//       "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1716878654154_New_CTF_Logo%20(1).png&h=300",
//     rating: "5",
//     link: "https://shikshafinder.com/skillclass/coding/e81f95a8-00e2-4141-ac6c-7be3af2ed470",
//   },
// ];
function IntroSchool() {
  const router = useRouter();

  const { examsname } = router.query;
  const { user } = useAuthContext();

  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useVote, setVote] = React.useState<any[] | null>(null);
  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [userData, setUserData] = useState<any[] | null>(null);
  const [ad, setAd] = useState<any[] | null>(null);
  async function getVote() {
    try {
      if (typeof examsname === "string") {
        let { data, error } = await supabase
          .from("votes")
          .select("*")
          .eq("user_id", examsname);

        setVote(data);
        if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }
  async function customizedAd() {
    try {
      if (typeof examsname === "string") {
        let { data, error } = await supabase
          .from("marketingDetails")
          .select("*")
          .range(0, 2);

        setAd(data);
        console.log("ad", data);
        if (error) throw error;
      } else {
        console.log("No exams ad found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function getStandard() {
    try {
      if (typeof examsname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("Standard,subject")
          .eq("user_id", examsname);

        setStandard(data);

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
      if (typeof examsname === "string") {
        let { data, error } = await supabase
          .from("exams")
          .select(
            "videolink,website,examsname,location,locationlink,discription,mobile,user_id,img,medium"
          )
          .eq("user_id", examsname);

        if (error) throw error;

        setUserData(data);
      } else {
        console.log("examsname is not a string:", examsname);
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function updateView() {
    try {
      if (typeof examsname === "string") {
        let { data, error } = await supabase
          .from("viewexams")
          .select("view")
          .eq("user_id", examsname);

        setUseView(data);
        if (error) throw error;

        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewexams")
            .update({ view: newViewValue })
            .eq("user_id", examsname);

          console.log("view incremented in exams");
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
    getSchool();
  }, [examsname]);

  useEffect(() => {
    customizedAd();
  }, [examsname]);

  useEffect(() => {
    getStandard();
  }, [examsname]);

  useEffect(() => {
    getVote();
  }, [examsname]);

  useEffect(() => {
    updateView();
  }, []);

  return (
    <>
      <Box
        p={{
          md: "2rem",
          lg: "2rem",
          xl: "2rem",
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
                    schoolname={examsname}
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
          TeacherName={userData && userData[0] ? userData[0].examsname : ""}
          location={userData && userData[0] ? userData[0].location : ""}
          locationlink={userData && userData[0] ? userData[0].locationlink : ""}
          discription={
            userData && userData[0]
              ? userData[0].discription
              : "The Data is on its way ,Thank you for your patience"
          }
          exam={userData && userData[0] ? userData[0].medium : ""}
        />

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
          {ad &&
            ad.map(
              (
                marketingDetails: {
                  name: string;
                  District: string;
                  redirecturl: string;
                  img: string;
                  user_id: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={marketingDetails.name}
                  rating={marketingDetails.District}
                  link={marketingDetails.redirecturl}
                  imgsrc={
                    marketingDetails.img
                      ? ` //wsrv.nl/?url=${marketingDetails.img}&h=300`
                      : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Stack>

        <Admissionform
          name={userData && userData[0] ? userData[0].user_id : ""}
          phoneNumber={userData && userData[0] ? userData[0].mobile : ""}
        />
      </Box>
    </>
  );
}

export default IntroSchool;
