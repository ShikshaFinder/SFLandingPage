import {

  Stack

} from "@chakra-ui/react";
import Admissionform from "../../../../components/admissionformlink";
import Cardd from "../../../../components/card";
import Videoo from "../../../../components/video";
import InfoTeacher from "../../../../components/InfoTeacher";
import Subject from "../../../../components/subject";
import Link from "next/link";
import React from "react";
function IntroSchool() {
  return (
    <>
    <Subject subject1={"maths"}  subject2="hindi" subject3="Social Science" subject4="Science"/>
    <br />
      <Videoo src="https://www.youtube.com/embed/pGeHsxjQJXw?si=vqQYrO90D7FzrvqN" />
      <br />
      <InfoTeacher
        TeacherName="Chintansir"
        Experience={"12 years"}
        AboutTeacher={"He is a good teacher"}
        discription={"He is a good teacher"}
      />

      <Stack direction="row">
        <Link href={"../school/1/schoolname"}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>
        <Link href={"../school/1/schoolname"}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
      </Stack>
      <Admissionform name="shree swami narayan" phoneNumber={7984140706} />
    </>
  );
}

export default IntroSchool;
