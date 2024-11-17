export const runtime = "edge";
import { Stack, Box } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/InfoTeacher";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import ShareButton from "../../../components/shareButton";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Image from "../../../components/image";
import supabase from "../../../../supabase";
import React, { useEffect, useState } from "react";

const IntroSchool = ({
  userData,
  useStandard,
  useVote,
  ad,
  coachingname,
}: any) => {
  const [useView, setUseView] = useState<any[] | null>(null);

  async function updateView() {
    try {
      if (typeof coachingname === "string") {
        let { data, error } = await supabase
          .from("viewcoaching")
          .select("view")
          .eq("user_id", coachingname);

        setUseView(data);
        if (error) throw error;

        console.log("view", data);

        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          console.log("newViewValue", useView);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewcoaching")
            .update({ view: newViewValue })
            .eq("user_id", coachingname);

          console.log("view incremented bdvkb");
          console.log("updateError", updateError);

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
  }, []);

  return (
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
                subject: string;
              },
              index: number
            ) => (
              <Standard
                key={index}
                name={standardItem.Standard}
                Standard={standardItem.Standard}
                schoolname={coachingname}
                Subject={standardItem.subject}
              />
            )
          )}
      </Stack>

      <br />
      {userData && userData[0]?.videolink ? (
        <Videoo src={userData[0]?.videolink} />
      ) : (
        <Image src={userData[0]?.img} />
      )}
      <br />
      <ShareButton link={userData[0]?.website} />
      <br />
      <InfoTeacher
        TeacherName={userData[0]?.coachingname}
        location={userData[0]?.location}
        locationlink={userData[0]?.locationlink}
        discription={
          userData[0]?.discription ||
          "The Data is on its way, Thank you for your patience"
        }
        exam={userData[0]?.medium}
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
          This institute has not participated in the shiksha star contest yet.
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
          ad.map((marketingDetails: any, index: number) => (
            <Card
              key={index}
              name={marketingDetails.name}
              rating={marketingDetails.District}
              link={marketingDetails.redirecturl}
              imgsrc={
                marketingDetails.img
                  ? `//wsrv.nl/?url=${marketingDetails.img}&h=300`
                  : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop"
              }
            />
          ))}
      </Stack>

      <Admissionform
        name={userData[0]?.user_id}
        phoneNumber={userData[0]?.mobile}
      />
    </Box>
  );
};

// This function runs on the server before rendering the page
export async function getServerSideProps(context: any) {
  const { coachingname } = context.query;

  // Fetch data from Supabase (server-side)
  let userData = null;
  let useStandard = null;
  let useVote = null;
  let ad = null;

  try {
    if (typeof coachingname === "string") {
      // Fetch coaching data
      const { data: coachingData } = await supabase
        .from("coaching")
        .select(
          "videolink,website,coachingname,location,locationlink,discription,mobile,user_id,img,medium"
        )
        .eq("user_id", coachingname);

      userData = coachingData;

      // Fetch standard data
      const { data: standardData } = await supabase
        .from("schoolDemo")
        .select("Standard,subject")
        .eq("user_id", coachingname);

      useStandard = standardData;

      // Fetch votes
      const { data: voteData } = await supabase
        .from("votes")
        .select("*")
        .eq("user_id", coachingname);

      useVote = voteData;

      // Fetch ads
      const { data: adData } = await supabase
        .from("marketingDetails")
        .select("*")
        .range(0, 2);

      ad = adData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Pass the data to the component via props
  return {
    props: {
      userData,
      useStandard,
      useVote,
      ad,
      coachingname,
    },
  };
}

export default IntroSchool;
