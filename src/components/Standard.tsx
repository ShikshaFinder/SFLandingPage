import { Button } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";


function Standard({ name,Standard,schoolname}:{name:string,Standard:string,schoolname?:any}) {
  

  return (
    <>
      <Link href={`${schoolname}/${Standard}`}>
        <Button colorScheme="teal" variant="solid">
          {name}
        </Button>
      </Link>
    </>
  );
}

export default Standard;
