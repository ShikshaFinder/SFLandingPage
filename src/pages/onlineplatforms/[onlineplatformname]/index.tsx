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
import Nouser from "@/components/Nouser";
import { useAuthContext } from "@/context";

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
  const { onlineplatformname } = router.query;
  const { user } = useAuthContext();
  
  if (!user.email) {
    return <Nouser />;
  }

  const [userData, setUserData] = useState<any[] | null>(null);

  async function getSchool() {
    try {
      if (typeof onlineplatformname === "string") {
        let { data, error } = await supabase
          .from("onlineform")
          .select("*")
          .eq("coachingname", onlineplatformname);

        if (error) throw error;
        console.log(data);

        setUserData(data);
        console.log("userData", data && data[0] ? data[0].coachingname : "");

        // Check if 'view' is not null
        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("onlineform")
            .update({ view: newViewValue })
            .eq("onlineplatform", onlineplatformname);
          console.log("view incremented");

          console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      } else {
        console.log("onlineplatform is not a string:", onlineplatformname);
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [onlineplatformname]);

  return (
    <>
      <Subject
        subject1="maths"
        subject2="hindi"
        subject3="Social Science"
        subject4="Science"
      />
      <br />
      <Videoo src={userData && userData[0] ? userData[0].videolink : ""} />
      <br />
      <ShareButton link={userData && userData[0] ? userData[0].website : ""} />
      <br />
      <InfoTeacher
        TeacherName={userData && userData[0] ? userData[0].coachingname : ""}
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
        name={userData && userData[0] ? userData[0].coachingname : ""}
        phoneNumber={userData && userData[0] ? userData[0].mobile : ""}
      />
    </>
  );
}

export default IntroSchool;
