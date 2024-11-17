export const runtime = "edge";
import { Stack, Box } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/infosubject";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import React from "react";
import ShareButton from "../../../components/shareButton";
import Image from "../../../components/image";
import { Alert, AlertIcon } from "@chakra-ui/react";
import supabase from "../../../../supabase";
import { useEffect, useState } from "react";
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

function IntroSchool({
  useStandard,
  userData,
  useVote,
  ad,
  onlineplatformname,
}: any) {
  const [useView, setUseView] = useState<any[] | null>(null);

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
    updateView();
  }, []);
  return (
    <>
      <Box
        p="2rem"
        m="1rem"
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
            useStandard.map((standardItem: any, index: number) => (
              <Standard
                key={index}
                name={standardItem.Standard}
                Standard={standardItem.Standard}
                schoolname={userData[0]?.user_id}
                Subject={standardItem.subject}
              />
            ))}
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
          TeacherName={userData[0]?.coachingname || ""}
          discription={
            userData[0]?.discription ||
            "The Data is on its way, Thank you for your patience"
          }
        />
        {useVote && useVote[0]?.extracurricular !== 0 ? (
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
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} direction="row">
          {ad &&
            ad.map((marketingDetails: any, index: number) => (
              <Card
                key={index}
                name={marketingDetails.name}
                rating={marketingDetails.District}
                link={marketingDetails.redirecturl}
                imgsrc={`//wsrv.nl/?url=${marketingDetails.img}&h=300`}
              />
            ))}
        </Stack>
        <Admissionform
          name={userData[0]?.user_id}
          phoneNumber={userData[0]?.mobile}
        />
      </Box>
    </>
  );
}

// Fetch data server-side
export async function getServerSideProps(context: any) {
  const { onlineplatformname } = context.query;

  const [schoolData, standardData, voteData, adData] = await Promise.all([
    supabase.from("onlineform").select("*").eq("user_id", onlineplatformname),
    supabase
      .from("schoolDemo")
      .select("Standard,subject")
      .eq("user_id", onlineplatformname),
    supabase.from("votes").select("*").eq("user_id", onlineplatformname),
    supabase.from("marketingDetails").select("*").range(0, 2),
  ]);

  return {
    props: {
      useStandard: standardData.data || null,
      userData: schoolData.data || null,
      useVote: voteData.data || null,
      ad: adData.data || null,
      onlineplatformname,
    },
  };
}

export default IntroSchool;
