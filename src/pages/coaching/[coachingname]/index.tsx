import { Stack,Box } from "@chakra-ui/react";
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

  const { coachingname } = router.query;
  const { user } = useAuthContext();
  if (!user.email) {
    return <Nouser />;
  }
  const [useStandard, setStandard] = React.useState<any[] | null>(null);

  async function getStandard() {
    try {
      if (typeof coachingname === "string") {
        let { data, error } = await supabase
          .from("schoolDemo")
          .select("Standard,subject")
          .eq("user_id", coachingname);

        setStandard(data);

        // if (error) throw error;
      } else {
        console.log("No schoolname found");
      }
    } catch (error) {
      console.log("Caught Error:", error);
      alert(error);

    }
  }
  useEffect(() => {
    getStandard();
  }, [coachingname]);

  const [userData, setUserData] = useState<any[] | null>(null);

  async function getSchool() {
    try {
      if (typeof coachingname === "string") {
        let { data, error } = await supabase
          .from("coaching")
          .select("videolink,website,coachingname,location,locationlink,discription,view,mobile")
          .eq("user_id", coachingname);

        if (error) throw error;

        setUserData(data);

        // Check if 'view' is not null
        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          // console.log("newViewValue", newViewValue);
          const newViewValue = data[0].view + 1;

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("coaching")
            .update({ view: newViewValue })
            .eq("user_id", coachingname);

          console.log("view incremented");
          console.log("newViewValue skjdbabs", newViewValue);

          console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      } else {
        console.log("coachingname is not a string:", coachingname);
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [coachingname]);

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
                    schoolname={coachingname}
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
          TeacherName={userData && userData[0] ? userData[0].coachingname : ""}
          location={userData && userData[0] ? userData[0].location : ""}
          locationlink={userData && userData[0] ? userData[0].locationlink : ""}
          discription={userData && userData[0] ? userData[0].discription : ""}
        />

        <Chart extra={9} quality={8} management={7} facilities={8} />
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
          phoneNumber={userData && userData[0] ? userData[0].mobile : ""}
        />
      </Box>
    </>
  );
}

export default IntroSchool;
