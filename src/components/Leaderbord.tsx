import React from 'react'
import {
  Card,
  CardBody,
  Text,
  Stack,
  Avatar,
  Divider,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";


function Leaderbord({name,name1,name2,name3,number}:{name?:string,number:any,name1?:string,name2?:string,name3?:string}) {
  return (
    <>
      <Card>
        <CardBody>
          <Stack direction="row" spacing={"8"}>
            <Avatar name={name} />
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {name}
            </Text>
            <Text
              display="flex"
              fontSize="xl"
              alignItems={"center"}
              fontWeight="bold"
            >
              {number}{" "}
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter  px="4">
          Leaderbord
        </AbsoluteCenter>
      </Box>
      <Card>
        <CardBody>
          <Stack direction="row" spacing={"8"}>
            <Avatar name={name1} />
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {name1}
            </Text>
            <Text
              display="flex"
              fontSize="xl"
              alignItems={"center"}
              fontWeight="bold"
              color="yellow.500"
            >
              1st
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack direction="row" spacing={"8"}>
            <Avatar name={name2} />
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {name2}
            </Text>
            <Text
              display="flex"
              fontSize="xl"
              alignItems={"center"}
              fontWeight="bold"
              color="silver"
            >
              2nd
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack direction="row" spacing={"8"}>
            <Avatar name={name3} />
            <Text
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
            >
              {name3}
            </Text>
            <Text
              display="flex"
              fontSize="xl"
              alignItems={"center"}
              fontWeight="bold"
              color="green"
            >
             3rd
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default Leaderbord