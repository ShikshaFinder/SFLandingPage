import {
 Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Admissionform from "../../../../components/admissionformlink";
import Videoo from "../../../../components/video";
import Standard from "../../../../components/Standard";
import InfoTeacher from "../../../../components/InfoTeacher";
import Chart from "../../../../components/Chart"

import Cardd from "../../../../components/card";

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
          <Standard />
        </Stack>{" "}
      </Link>
      <InfoTeacher
        TeacherName="Chintansir"
        Experience={"12 years"}
        AboutTeacher={"He is a good teacher"}
        discription={"He is a good teacher"}
      />
      <Chart extra={9} quality={8} management={7} facilities={8} />
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
