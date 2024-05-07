import { Stack, Box } from "@chakra-ui/react";
import Admissionform from "../../../../../../components/admissionformlink";
import Card from "../../../../../../components/card";
import Videoo from "../../../../../../components/video";
import { useRouter } from "next/router";
import supabase from "../../../../../../../supabase";
import { useEffect } from "react";
import React from "react";
import InfoSubject from "../../../../../../components/infosubject";
import ShareButton from "../../../../../../components/shareButton";
import Subject from "@/components/subject";

const cards = [
  {
    name: "Vigyasa",
    imgsrc: "https://www.vigyasa.live/_next/image?url=%2Fsfv1.png&w=256&q=75",
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
  const { subjectname, standard, skillclass } = router.query;

  const [useStandard, setStandard] = React.useState<any[] | null>(null);
  const [useStandard1, setStandard1] = React.useState<any[] | null>(null);
  const [useView, setUseView] = React.useState<any[] | null>(null);

  async function getStandard1() {
    try {
      if (typeof subjectname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("subject,Standard")
          .match({
            Standard: standard,
            user_id: skillclass,
          });

        setStandard1(data);

        if (error) throw error;
      } else {
        console.log("No skillname found");
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
          .select("*")
          .match({
            Standard: standard,
            user_id: skillclass,
            subject: subjectname,
          });

        setStandard(data);

        if (error) throw error;
      } else {
        console.log("No skillname found");
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
      if (typeof skillclass === "string") {
        let { data, error } = await supabase
          .from("viewskill")
          .select("demolecturesView")
          .eq("user_id", skillclass);

        setUseView(data);
        if (error) throw error;

        if (data && data[0].demolecturesView !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].demolecturesView + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("viewskill")
            .update({ demolecturesView: newViewValue })
            .eq("user_id", skillclass);
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
                  skillclass: any;
                  subject: string;
                },
                index: number
              ) => (
                <>
                  <Subject
                    key={index}
                    name={standardItem.subject}
                    Standard={standardItem.Standard}
                    schoolname={skillclass}
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
      </Box>
    </>
  );
}

export default IntroSchool;
