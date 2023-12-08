import React from "react";
import Skillcard from "../components/skillcard";
import { Grid } from "@chakra-ui/react";

function skillclass() {
  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={1}
      >
        <Skillcard
          skillname="Dance"
          icon="https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Skillcard
          skillname="Singing"
          icon="https://images.pexels.com/photos/7086738/pexels-photo-7086738.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <Skillcard
          skillname="Business"
          icon="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />{" "}
        <Skillcard
          skillname="Self Diffence"
          icon="https://images.pexels.com/photos/8038021/pexels-photo-8038021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />{" "}
        <Skillcard
          skillname="Sports"
          icon="https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Skillcard
          skillname="Photography"
          icon="https://images.pexels.com/photos/752525/pexels-photo-752525.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <Skillcard
          skillname="Motivation"
          icon="https://images.pexels.com/photos/673018/pexels-photo-673018.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <Skillcard
          skillname="Designing"
          icon="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        {/* Add more Skillcard components here */}
      </Grid>
    </>
  );
}

export default skillclass;
