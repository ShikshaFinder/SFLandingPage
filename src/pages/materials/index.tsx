import React from "react";
import Cs from "../../components/Cs";
import { Grid } from "@chakra-ui/react";

function index() {
  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={1}
      >
        {" "}
        <Cs St="5th" /> <Cs St="6th" /> <Cs St="7th" /> <Cs St="8th" />{" "}
        <Cs St="9th" /> <Cs St="10th" /> <Cs St="11 Science" />{" "}
        <Cs St="12 Science " /> <Cs St="11th Commerce " />{" "}
        <Cs St="12th Commerce " />{" "}
      </Grid>
    </>
  );
}

export default index;
