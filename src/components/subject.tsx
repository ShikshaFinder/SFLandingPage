import React from 'react'
import { Button, Stack } from "@chakra-ui/react"

function subject({subject1,link}: {subject1?: string,link?:string}) {
  return (
    <>
        <Button colorScheme="teal" size="xs">
          {subject1}
        </Button>
      

     
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