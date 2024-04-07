import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  Text,
  Stack,
  Avatar,
  AbsoluteCenter,
} from "@chakra-ui/react";

function LeaderbordName({ name,number,position }: { name?: string,number:number,position:number }) {
  return (
    <>
      <Card>
        <CardBody>
          <Stack direction="row" spacing={"8"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Avatar name={name} />&nbsp;&nbsp;  
              <Text
                // display="flex"
                // alignItems="center"
                // justifyContent="center"
                fontWeight="bold"
              >
                {name}
              </Text>
            </Box>
            <Text
              // display="flex"
              // alignItems="center"
              // justifyContent="space-between"

              fontWeight="bold"
            >
              {position}
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <br />
    </>
  );
}

export default LeaderbordName;
