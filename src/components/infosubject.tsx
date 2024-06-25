import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  Stack,
  Heading,
  StackDivider,
} from "@chakra-ui/react";

function InfoTeacher({
  TeacherName,
  discription,
}: {
  TeacherName: string;
  discription: string;
}) {

  const [lines, setLines] = React.useState(8);
  const readMore = () => {
    setLines(100);
  };
  return (
    <>
      <Card
        m={{
          base: "1rem",
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
        }}
      >
        <CardHeader>
          <Heading size="lg">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            {/* <Box> */}
            <Heading size="md">Description</Heading>
            <Text pt="2" fontSize="sm" noOfLines={lines}>
              {discription}
            </Text>
            <div style={{display:"flex", flexDirection:"row-reverse"}}>
              <Text onClick={readMore}>Read more</Text>
            </div>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
