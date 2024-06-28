import { Stack, Box } from "@chakra-ui/react";
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
import { useState } from "react";
import { useAuthContext } from "@/context";

function IntroSchool() {
  const router = useRouter();
  const { subjectname, standard, schoolname } = router.query;
  const { user } = useAuthContext();
  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useStandard1, setStandard1] = React.useState<any[] | null>(null);
  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [ad, setAd] = useState<any[] | null>(null);

   

  async function getStandard1() {
    try {
      if (typeof subjectname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("subject,Standard")
          .match({
            Standard: standard,
            user_id: schoolname,
          });

        setStandard1(data);

        if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
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
          .select("Teachername,discription,videolink,user_id")
          .match({
            Standard: standard,
            user_id: schoolname,
            subject: subjectname,
          });

        setStandard(data);

        if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getStandard();
  }, [subjectname]);

  async function updateView() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("viewschool")
          .select("demolecturesView")
          .eq("user_id", schoolname);

        setUseView(data);
        if (error) throw error;

        // console.log("view", data);

        if (data && data[0].demolecturesView !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].demolecturesView + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewschool")
            .update({ demolecturesView: newViewValue })
            .eq("user_id", schoolname);

          console.log("view incremented in demo lecture side");
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
    updateView();
  }, [subjectname]);

  
  async function customizedAd() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("marketingDetails")
          .select("*")
          .range(0, 2);

        setAd(data);
        console.log("ad", data);
        if (error) throw error;
      } else {
        console.log("No coaching ad found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    customizedAd();
  }, [schoolname]);

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
          {useStandard1 &&
            useStandard1.map(
              (
                standardItem: {
                  Standard: string;
                  schoolname: any;
                  subject: string;
                },
                index: number
              ) => (
                <>
                  <Subject
                    key={index}
                    name={standardItem.subject}
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
        <ShareButton link="https://shikshafinder.com/" />
        <InfoSubject
          TeacherName={
            useStandard && useStandard[0] ? useStandard[0].Teachername : ""
          }
          discription={
            useStandard && useStandard[0]
              ? useStandard[0].discription
              : "The Data is on its way ,Thank you for your patience"
          }
        />

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
          name={useStandard && useStandard[0] ? useStandard[0].user_id : ""}
          phoneNumber={useStandard && useStandard[0] ? useStandard[0].mobile : "" }
        />
      </Box>
    </>
  );
}

export default IntroSchool;
