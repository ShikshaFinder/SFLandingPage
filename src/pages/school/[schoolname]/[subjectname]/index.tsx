import {
  AspectRatio,
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Stack,
  Heading,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import Cardd from "../../../../components/card";
import Admissionform from "../../../../components/admissionformlink";
import Videoo from "../../../../components/video";
import Subject from "../../../../components/subject";
import InfoTeacher from "../../../../components/InfoTeacher";
import Link from "next/link";
import React from "react";

function IntroSchool() {
  return (
    <>
      <br />
      <Videoo src="https://www.youtube.com/embed/pGeHsxjQJXw?si=vqQYrO90D7FzrvqN" />
      <br />
      <Subject subject1="10" subject2="11" subject3="12" subject4="8" />
      <br />
      <InfoTeacher
        TeacherName="Chintansir"
        Experience={"12 years"}
        AboutTeacher={"He is a good teacher"}
        discription={"He is a good teacher"}
      />

      <Stack direction="row">
        <Link href={"../school/schoolname"}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
      </Stack>
      <Admissionform name="Shree Swami" phoneNumber={1234567890} />
    </>
  );
}

export default IntroSchool;
