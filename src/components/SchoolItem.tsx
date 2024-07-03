import React from "react";
import { Card, Image, CardBody, CardFooter } from "@chakra-ui/react";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

export interface School {
  schoolName: string;
  diseCode: string;
  address: string;
  ward: string;
  district: string;
  board: string;
  type: string;
  medium: string;
  location: string;
}

export interface SchoolData {
  data: School[];
}

interface Props {
  school: School;
}

const SchoolItem: React.FC<Props> = ({ school }) => {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://plus.unsplash.com/premium_photo-1671070290623-d6f76bdbb3db?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="School image"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{school.schoolName}</Heading>
            <Text>Address: {school.address}</Text>
            <Text color="blue.600">
              Board: {school.board}
            </Text>
            <Text color="blue.600" >
              Board: {school.board}
            </Text>
            <Text color="blue.600" >
              Type: {school.type}
            </Text>
            <Text color="blue.600" >
              Medium: {school.medium}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <a href={school.location} target="_blank" rel="noopener noreferrer">
              <Button variant="solid" colorScheme="blue">
                View Location
              </Button>
            </a>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default SchoolItem;
