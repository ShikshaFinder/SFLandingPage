import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../components/admissionformlink";
import Card from "../../../components/card";
import Videoo from "../../../components/video";
import InfoTeacher from "../../../components/InfoTeacher";
import Subject from "../../../components/subject";
import Chart from "../../../components/Chart";
import React, { use } from "react";
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
    name: "Shree Swami nararyan ",
    imgsrc:
      "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: "3.4",
    link: "/coaching/1/nameofCoaching",
  },
];

function IntroSchool() {
  const router = useRouter();
  const { schoolname } = router.query;
  // const { user } = useAuthContext();
  console.log(schoolname);

  const [userData, setUserData] = useState<any[] | null>(null);
  const [View, setView] = useState<number | null>(null);

  async function getSchool() {
    try {
      if (typeof schoolname === "string") {
        let { data, error } = await supabase
          .from("School")
          .select("*")
          .eq("schoolname", schoolname);

        if (error) throw error;

        setUserData(data);
        console.log("userData", userData);

        // Check if 'view' is not null
        if (data && data[0].view !== null) {
          // Increment the 'view' column value
            const newViewValue = data[0].view + 1;
            console.log("newViewValue", newViewValue);
            setView(newViewValue);
            console.log("view incremented", View);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("School")
            .update({ view: newViewValue })
            .eq("schoolname", schoolname);
          console.log("view incremented");
          console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      } else {
        setView(1);
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [schoolname]);

  return (
    <>
      <Subject
        subject1="hi"
        subject2="hindi"
        subject3="Social Science"
        subject4="Science"
      />
      <br />
      <Videoo src="https://www.youtube.com/embed/pGeHsxjQJXw?si=vqQYrO90D7FzrvqN" />
      <br />
      <ShareButton link={userData && userData[0] ? userData[0].website : ""} />
      <br />
      <InfoTeacher
        TeacherName={userData && userData[0] ? userData[0].schoolname : ""}
        // Experience={"12 years"}
        locationlink="https://goo.gl/maps/"
        location={userData && userData[0] ? userData[0].location : ""}
        AboutTeacher={userData && userData[0] ? userData[0].location : ""}
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
        name={userData && userData[0] ? userData[0].schoolname : ""}
        phoneNumber={userData && userData[0] ? userData[0].mobile1 : ""}
      />
    </>
  );
}

export default IntroSchool;
