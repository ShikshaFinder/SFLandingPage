//
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import React from "react";

export default function SchoolTable() {
  // Example data for the table
  const schools = [
    {
      name: "Green Valley High School",
      fees: "50,000/year",
      course: "Science, Arts",
      subject: "Math, Physics, Chemistry",
      review: "5/10",
      admissionCriteria: "90% in Grade 10",
    },
    {
      name: "Sunrise Academy",
      fees: "30,000/year",
      course: "Commerce, Science",
      subject: "Economics, Biology, English",
      review: "4.2/10",
      admissionCriteria: "80% in Grade 10",
    },
    {
      name: "Horizon Public School",
      fees: "40,000/year",
      course: "Science",
      subject: "Physics, Chemistry, Biology",
      review: "7/10",
      admissionCriteria: "85% in Grade 10",
    },
  ];

  return (
    <ChakraProvider>
      <Box p={5} overflowX="auto">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>
                School Name
              </Th>
              <Th>Fees</Th>
              <Th>Course</Th>
              <Th>Subject</Th>
              <Th>Review</Th>
              <Th>Admission Criteria</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schools.map((school, index) => (
              <Tr key={index}>
                <Td>{school.name}</Td>
                <Td>{school.fees}</Td>
                <Td>{school.course}</Td>
                <Td>{school.subject}</Td>
                <Td>{school.review}</Td>
                <Td>{school.admissionCriteria}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
}
