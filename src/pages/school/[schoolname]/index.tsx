export const runtime = "experimental-edge";
import { Box, Stack } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/InfoTeacher";
import Standard from "../../../components/Standard";
import Chart from "../../../components/Chart";
import React, { useEffect, useState } from "react";
import ShareButton from "../../../components/shareButton";
import Image from "../../../components/image";
import { Alert, AlertIcon } from "@chakra-ui/react";
import supabase from "../../../../supabase";
import EmbedVR from "@/components/EmbedVR";

interface UserData {
  schoolname: string;
  website: string;
  locationlink: string;
  location: string;
  discription: string;
  mobile1: string;
  user_id: string;
  img: string;
  videolink: string;
  exam: string;
  medium: string;
}

interface StandardData {
  Standard: string;
  subject: string;
}

interface VoteData {
  extracurricular: number;
  qualityofeducation: number;
  management: number;
  facilityprovided: number;
  view: number;
}

interface AdData {
  name: string;
  District: string;
  redirecturl: string;
  img: string;
}

interface IntroSchoolProps {
  userData: UserData[];
  useStandard: StandardData[];
  useVote: VoteData[];
  ad: AdData[];
  schoolname: string;
}

function IntroSchool({ userData, useStandard, useVote, ad, schoolname }: IntroSchoolProps) {
  const [useView, setUseView] = useState<{ view: number | null }[] | null>(null);
  const [votes, setVotes] = useState<VoteData[]>([]);

  async function getVotes() {
    try {
      // Fetch vote data
      const { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("user_id", schoolname);

      if (error) throw error;
      if (data) {
        const transformedData = data.map((item) => ({
          extracurricular: item.extracurricular ?? 0,
          qualityofeducation: item.qualityofeducation ?? 0,
          management: item.management ?? 0,
          facilityprovided: item.facilityprovided ?? 0,
          view: item.view ?? 0,
        }));
        setVotes(transformedData);
      }

      // Fetch ads
      const { data: adData, error: adError } = await supabase
        .from("marketingDetails")
        .select("*")
        .range(0, 2);

      if (adError) throw adError;
    } catch (error) {
      console.error("Error fetching votes or ads:", error);
    }
  }

  async function updateView() {
    try {
      if (typeof schoolname === "string") {
        const { data, error } = await supabase
          .from("viewschool")
          .select("view")
          .eq("user_id", schoolname);

        if (error) throw error;
        setUseView(data);

        if (data && data[0]?.view != null) {
          const newViewValue = data[0].view + 1;
          const { error: updateError } = await supabase
            .from("viewschool")
            .update({ view: newViewValue })
            .eq("user_id", schoolname);

          if (updateError) throw updateError;
        }
      } else {
        console.error("schoolname is not a string");
      }
    } catch (error) {
      console.error("Caught Error while updating view:", error);
    }
  }

  useEffect(() => {
    updateView();
  }, []);

  return (
    <>
      <Box
        p={{ md: "1rem", lg: "1rem", xl: "1rem" }}
        m={{ md: "1rem", lg: "1rem", xl: "1rem" }}
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
            useStandard.map((standardItem, index) => (
              <Standard
                key={index}
                name={standardItem.Standard}
                Standard={standardItem.Standard}
                schoolname={schoolname}
                Subject={standardItem.subject}
              />
            ))}
        </Stack>
        <br />
        {userData && userData[0]?.videolink ? (
          <Videoo src={userData[0].videolink} />
        ) : (
          <Image src={userData[0]?.img || ""} />
        )}
        <br />
        <ShareButton link={userData[0]?.website || ""} />
        <br />
        <InfoTeacher
          TeacherName={userData[0]?.schoolname || ""}
          locationlink={userData[0]?.locationlink || ""}
          location={userData[0]?.location || ""}
          discription={
            userData[0]?.discription ||
            "The Data is on its way, Thank you for your patience"
          }
          exam={userData[0]?.exam || "exams not mentioned by the institutes"}
          medium={userData[0]?.medium || "medium not mentioned"}
        />
        <br />
        {useVote && useVote[0] ? (
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
        <EmbedVR />
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          direction={"row"}
        >
          {ad &&
            ad.map((marketingDetails, index) => (
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
          name={userData[0]?.user_id || ""}
          phoneNumber={userData[0]?.mobile1 ? Number(userData[0].mobile1) : 0}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps(context: { query: { schoolname: any; }; }) {
  const { schoolname } = context.query;

  let userData = null;
  let useStandard = null;

  try {
    if (typeof schoolname === "string") {
      // Fetch school data
      const { data: schoolData, error: schoolError } = await supabase
        .from("School")
        .select(
          "schoolname, website, locationlink, location, discription, mobile1, user_id,img,videolink,exam,medium"
        )
        .eq("user_id", schoolname);

      if (schoolError) throw schoolError;
      userData = schoolData;

      // Fetch standard data
      const { data: standardData, error: standardError } = await supabase
        .from("schoolDemo")
        .select("Standard,subject")
        .eq("user_id", schoolname);

      if (standardError) throw standardError;
      useStandard = standardData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      userData,
      useStandard,
      schoolname,
    },
  };
}

export default IntroSchool;
