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
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Admissionform from "../../../../components/admissionformlink";
import Videoo from "../../../../components/video";
import Subject from "../../../../components/subject";
import InfoTeacher from "../../../../components/InfoTeacher";

import Cardd from "../../../../components/card";
import { MdOpenInBrowser } from "react-icons/md";

import Link from "next/link";
import React from "react";

function IntroSchool() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/");

  const lastSegment = pathSegments[pathSegments.length - 2];

  return (
    <>
      <Videoo src="https://www.youtube.com/embed/pGeHsxjQJXw?si=vqQYrO90D7FzrvqN" />
      <br />{" "}
      <Link href={`../${lastSegment}/schoolname/subject`}>
        <Stack spacing={4} direction="row" align="center">
          {" "}
          <Subject
            subject1="10"
            subject2="11"
            subject3="12"
            subject4="8"
          />
        </Stack>{" "}
      </Link>
      <InfoTeacher
        TeacherName="Chintansir"
        Experience={"12 years"}
        AboutTeacher={"He is a good teacher"}
        discription={"He is a good teacher"}
      />
      <Stack direction="row">
        <Link href={`../school/2/schoolname`}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>

        <Link href={`../school/2/schoolname`}>
          {" "}
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
      </Stack>
      <Admissionform name="Shree Swami" phoneNumber={7984140706} />
    </>
  );
}

export default IntroSchool;
