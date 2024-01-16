import React from 'react'
import { Button, Stack } from "@chakra-ui/react"

function subject({subject1,subject2,subject3,subject4}: {subject1?: string,subject2?:string,subject3?:string,subject4?:string}) {
  return (
    <>
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          {subject1}
        </Button>
        <Button colorScheme="teal" size="xs">
          {subject2}  </Button>
        <Button colorScheme="teal" size="xs">
          {subject3} </Button>
        <Button colorScheme="teal" size="xs">
          {subject4} </Button>

     
      </Stack>{" "}
    </>
  );
}

export default subject


// import { Button } from "@chakra-ui/react";

// const SchoolSubjects = ({ subjects }: { subjects: string[] }) => {
//   return (
//     <>
//       {subjects.map((subject, index) => (
//         <Button key={index} colorScheme="teal" size="xs">
//           {subject}
//         </Button>
//       ))}
//     </>
//   );
// };