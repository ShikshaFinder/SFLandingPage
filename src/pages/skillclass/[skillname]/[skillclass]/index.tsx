import { Stack } from "@chakra-ui/react";
import Admissionform from "../../../../components/admissionformlink";
import Card from "../../../../components/card";
import Videoo from "../../../../components/video";
import InfoTeacher from "../../../../components/InfoTeacher";
import Subject from "../../../../components/subject";
import Chart from "../../../../components/Chart";
import React from "react";

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
  }
];

function IntroSchool() {
  const name="gb2pHa47T-g";
  return (
    <>
      <Subject
        subject1="maths"
        subject2="hindi"
        subject3="Social Science"
        subject4="Science"
      />
      <br />
      <Videoo src={`https://www.youtube.com/embed/${name}` }/>
      <br />
      {/* <InfoTeacher
        TeacherName={userData && userData[0] ? userData[0].schoolname : ""}
        location={userData && userData[0] ? userData[0].location : ""}
        locationlink={userData && userData[0] ? userData[0].locationlink : ""}
        discription={userData && userData[0] ? userData[0].discription : ""}
      /> */}

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
      <Admissionform name="shree swami narayan" phoneNumber={7984140706} />
    </>
  );
}

export default IntroSchool;
