import Card from "../../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../../components/bannerad";
import Layoutt from "../../Layout";
import supabase from "../../../../supabase";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { Grid,Stack,Button } from "@chakra-ui/react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Nouser from "@/components/Nouser";
import { useUser } from "@/store";

export default function Skillclass() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const router = useRouter();
  const { skillname } = router.query;
  const userStore = useUser((state) => state.user);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset

  async function getskill(offset: number) {
    try {
      let { data, error } = await supabase
        .from("skillclass")
        .select("skillclassname, ratingofskillclass, img, user_id")
        .match({ State: userStore.State, city: userStore.city })
        .range(offset, offset + 3);

      if (error) throw error;
      setUserData((prevData) =>
        prevData ? [...prevData, ...(data || [])] : data || []
      ); // Append new data
      // console.log(data);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    if (userStore && userStore.State) {
      getskill(dataOffset);
    }
  }, [userStore, dataOffset]); // Update effect dependencies

  const handleLoadMore = () => {
    setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
  };

  if (!user.email) {
    return <Nouser />;
  }

  return (
    <>
      <Layoutt>
        <Bannerad />
        <br />
        {userData === null ? (
          <Box>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <h1>Top Skill classes in {userStore.city} </h1>
        )}

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          {userData &&
            userData.map(
              (
                skillclass: {
                  skillclassname: string;
                  ratingofskillclass: number;
                  link: string;
                  img: string;
                  user_id: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={skillclass.skillclassname}
                  rating={skillclass.ratingofskillclass}
                  link={`/skillclass/${skillname}/${skillclass.user_id}`}
                  imgsrc={
                    skillclass.img
                      ? ` //wsrv.nl/?url=${skillclass.img}&h=300`
                      : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Grid>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {" "}
          <Button onClick={handleLoadMore}>Load More</Button> // Add onClick
          handler
        </Stack>
      </Layoutt>
    </>
  );
}
