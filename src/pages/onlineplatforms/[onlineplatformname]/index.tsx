import { Stack, Box } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/infosubject";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import React, { use } from "react";
import { useRouter } from "next/router";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
import ShareButton from "../../../components/shareButton";
import Image from "../../../components/image";
import { Alert, AlertIcon } from "@chakra-ui/react";  

const cards = [
  {
    name: "Vigyasa",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1714766849103_vigysalogo.png&h=300",
    rating: "5.0",
    link: "https://www.vigyasa.live/",
  },
  {
    name: " Mariya Institute",
    imgsrc:
      "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1715018846231_mariyainstitute.png&h=300",
    rating: "5",
    link: "https://shikshafinder.com/coaching/1b9d55be-d1ac-4ffa-bf04-fb17ce07834e",
  },
];
function IntroSchool() {
  const router = useRouter();
  const { onlineplatformname } = router.query;

  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [userData, setUserData] = useState<any[] | null>(null);
  const [useVote, setVote] = React.useState<any[] | null>(null);

  async function getStandard() {
    try {
      if (typeof onlineplatformname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("Standard,subject")
          .eq("user_id", onlineplatformname);

        setStandard(data);

        // if (error) throw error;
      } else {
        console.log("No onlineplatformname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

async function getVote() {
    try {
      if (typeof onlineplatformname === "string") {
        let { data, error } = await supabase
          .from("votes")
          .select("*")
          .eq("user_id", onlineplatformname);

        setVote(data);
        if (error) throw error;
      } else {
        console.log("No onlineplatformname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }


  async function getSchool() {
    try {
      if (typeof onlineplatformname === "string") {
        let { data, error } = await supabase
          .from("onlineform")
          .select("*")
          .eq("user_id", onlineplatformname);

        if (error) throw error;

        setUserData(data);
      } else {
        console.log("No onlineplatformname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }
  async function updateView() {
    try {
      if (typeof onlineplatformname === "string") {
        let { data, error } = await supabase
          .from("viewonline")
          .select("view")
          .eq("user_id", onlineplatformname);

        setUseView(data);
        if (error) throw error;

        console.log("view", data);

        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewonline")
            .update({ view: newViewValue })
            .eq("user_id", onlineplatformname);

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
    getSchool();
  }, [onlineplatformname]);

  useEffect(() => {
    getStandard();
  }, [onlineplatformname]);

  useEffect(() => {
    getVote();
  }, [onlineplatformname]);

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
                  onlineplatformname: any;
                  subject: string;
                },
                index: number
              ) => (
                <>
                  <Standard
                    key={index}
                    name={standardItem.Standard}
                    Standard={standardItem.Standard}
                    schoolname={onlineplatformname}
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
          TeacherName={userData && userData[0] ? userData[0].coachingname : ""}
          // Experience={"12 years"}

          discription={userData && userData[0] ? userData[0].discription : ""}
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
      </Box>
    </>
  );
}

export default IntroSchool;
