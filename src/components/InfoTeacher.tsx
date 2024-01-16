import React from 'react'
import { Card, CardHeader, CardBody, Text, Box, Stack, Heading, StackDivider, Button } from "@chakra-ui/react"

function InfoTeacher({TeacherName, Experience, AboutTeacher,discription}: {TeacherName: string, Experience: string, AboutTeacher: string,discription:string}) {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {Experience}
              </Heading>
              <Text pt="2" fontSize="sm">
                {AboutTeacher}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               About Teacher + Extra curricular Activitities
              </Heading>
              <Text pt="2" fontSize="sm">
              {discription}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher