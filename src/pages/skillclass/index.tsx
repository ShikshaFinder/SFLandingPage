import React from "react";
import Skillcard from "../../components/skillcard";
import { Grid } from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../Layout";
function skillclass() {
  return (
    <>
      <Layout>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          <Link href={"../skillclass/dance"}>
            {" "}
            <Skillcard
              skillname="Dance"
              icon="https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Link>
          <Link href={"../skillclass/Singing"}>
            {" "}
            <Skillcard
              skillname="Singing"
              icon="https://images.pexels.com/photos/7086738/pexels-photo-7086738.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </Link>
          <Link href={"../skillclass/Business"}>
            {" "}
            <Skillcard
              skillname="Business"
              icon="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />{" "}
          </Link>
          <Link href={"../skillclass/Self-Diffence"}>
            {" "}
            <Skillcard
              skillname="self defence"
              icon="https://images.pexels.com/photos/8038021/pexels-photo-8038021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />{" "}
          </Link>
          <Link href={"../skillclass/Sports"}>
            {" "}
            <Skillcard
              skillname="Sports"
              icon="https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Link>
          <Link href={"../skillclass/Photography"}>
            {" "}
            <Skillcard
              skillname="Photography"
              icon="https://images.pexels.com/photos/752525/pexels-photo-752525.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </Link>
          <Link href={"../skillclass/art"}>
            {" "}
            <Skillcard
              skillname="Art"
              icon="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Link>
          <Link href={"../skillclass/Designing"}>
            <Skillcard
              skillname="Designing"
              icon="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Link>
          <Link href={"../skillclass/coding"}>
            <Skillcard
              skillname="Coding"
              icon="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Link>{" "}
          <Link href={"../skillclass/Other"}>
            <Skillcard
              skillname="Others"
              icon="https://images.pexels.com/photos/3771055/pexels-photo-3771055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Link>{" "}
          {/* Add more Skillcard components here */}
        </Grid>
      </Layout>
    </>
  );
}

export default skillclass;
