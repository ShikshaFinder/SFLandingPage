import { Button } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

function Standard({
  name,
  Standard,
  schoolname,
  Subject,
}: {
  name: any;
  Standard: any;
  schoolname?: any;
  Subject: any;
}) {
  return (
    <>
      <Link href={`/school/${schoolname}/${Standard}/${Subject}`}>
        <Button colorScheme="teal" variant="solid">
          {name}
        </Button>
      </Link>
    </>
  );
}

export default Standard;
